/**
 * Voting Service for On-Chain Governance
 * Handles actual blockchain voting transactions
 */

import { ethers } from 'ethers';
import { proposalMapping } from './proposalMapping';

// Uniswap Governor Bravo ABI (minimal for voting functions)
const GOVERNANCE_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"internalType": "uint8", "name": "support", "type": "uint8"}
    ],
    "name": "castVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"internalType": "uint8", "name": "support", "type": "uint8"},
      {"internalType": "string", "name": "reason", "type": "string"}
    ],
    "name": "castVoteWithReason",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"internalType": "address", "name": "account", "type": "address"}
    ],
    "name": "hasVoted",
    "outputs": [
      {"internalType": "bool", "name": "", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "proposalId", "type": "uint256"}
    ],
    "name": "state",
    "outputs": [
      {"internalType": "uint8", "name": "", "type": "uint8"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Vote support values (Uniswap Governor Bravo standard)
export const VOTE_SUPPORT = {
  AGAINST: 0,
  FOR: 1,
  ABSTAIN: 2
} as const;

export type VoteSupport = typeof VOTE_SUPPORT[keyof typeof VOTE_SUPPORT];

// Proposal states
export const PROPOSAL_STATE = {
  PENDING: 0,
  ACTIVE: 1,
  CANCELED: 2,
  DEFEATED: 3,
  SUCCEEDED: 4,
  QUEUED: 5,
  EXPIRED: 6,
  EXECUTED: 7
} as const;

export interface VoteTransaction {
  proposalId: string;
  support: VoteSupport;
  reason?: string;
  txHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  error?: string;
}

export interface VoteResult {
  success: boolean;
  txHash?: string;
  error?: string;
  message: string;
}

class VotingService {
  private contract: ethers.Contract | null = null;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  // Uniswap Governor Bravo contract address
  private readonly CONTRACT_ADDRESS = '0x408ED6354d4973f66138C91495F2f2FCbd8724C3';

  constructor() {
    this.initializeContract();
  }

  private async initializeContract() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.contract = new ethers.Contract(
        this.CONTRACT_ADDRESS,
        GOVERNANCE_ABI,
        this.provider
      );
    }
  }

  async connectWallet(): Promise<boolean> {
    try {
      if (!this.provider) {
        await this.initializeContract();
      }

      if (!this.provider) {
        throw new Error('MetaMask not detected');
      }

      // Request account access
      await this.provider.send('eth_requestAccounts', []);
      
      // Get signer
      this.signer = await this.provider.getSigner();
      
      // Update contract with signer for transactions
      this.contract = new ethers.Contract(
        this.CONTRACT_ADDRESS,
        GOVERNANCE_ABI,
        this.signer
      );

      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return false;
    }
  }

  async checkProposalState(proposalId: string): Promise<number> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      // Map internal proposal ID to actual Uniswap governance proposal ID
      const mappedProposalId = proposalMapping.mapProposalId(proposalId);
      console.log(`Mapping proposal ${proposalId} to ${mappedProposalId}`);
      
      // Convert proposal ID to BigInt for the contract call
      const proposalIdBigInt = BigInt(mappedProposalId);
      const state = await this.contract.state(proposalIdBigInt);
      return Number(state);
    } catch (error: any) {
      console.error('Failed to check proposal state:', error);
      
      // If the proposal doesn't exist, return a state that indicates it's not active
      if (error.code === 'BAD_DATA' || error.message?.includes('could not decode result data')) {
        console.warn(`Proposal ${proposalId} (mapped to ${proposalMapping.mapProposalId(proposalId)}) may not exist or contract call failed`);
        return 6; // EXPIRED state - indicates proposal is not active
      }
      
      throw error;
    }
  }

  async hasVoted(proposalId: string, address: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      // Map internal proposal ID to actual Uniswap governance proposal ID
      const mappedProposalId = proposalMapping.mapProposalId(proposalId);
      
      // Convert proposal ID to BigInt for the contract call
      const proposalIdBigInt = BigInt(mappedProposalId);
      const voted = await this.contract.hasVoted(proposalIdBigInt, address);
      return voted;
    } catch (error: any) {
      console.error('Failed to check if address has voted:', error);
      
      // If the proposal doesn't exist, assume they haven't voted
      if (error.code === 'BAD_DATA' || error.message?.includes('could not decode result data')) {
        console.warn(`Proposal ${proposalId} (mapped to ${proposalMapping.mapProposalId(proposalId)}) may not exist, assuming not voted`);
        return false;
      }
      
      throw error;
    }
  }

  async castVote(
    proposalId: string, 
    support: number, 
    reason?: string
  ): Promise<VoteResult> {
    if (!this.contract || !this.signer) {
      return {
        success: false,
        error: 'Wallet not connected',
        message: 'Please connect your wallet to vote'
      };
    }

    try {
      // Check if proposal is active
      const state = await this.checkProposalState(proposalId);
      if (state !== PROPOSAL_STATE.ACTIVE) {
        const stateMessages : Record<number, string> = {
          [PROPOSAL_STATE.PENDING]: 'Proposal is pending',
          [PROPOSAL_STATE.CANCELED]: 'Proposal has been canceled',
          [PROPOSAL_STATE.DEFEATED]: 'Proposal has been defeated',
          [PROPOSAL_STATE.SUCCEEDED]: 'Proposal has already succeeded',
          [PROPOSAL_STATE.QUEUED]: 'Proposal is queued for execution',
          [PROPOSAL_STATE.EXPIRED]: 'Proposal has expired',
          [PROPOSAL_STATE.EXECUTED]: 'Proposal has been executed'
        };
        
        return {
          success: false,
          error: 'Proposal not active',
          message: stateMessages[state] || 'This proposal is not currently active for voting'
        };
      }

      // Check if user has already voted
      const userAddress = await this.signer.getAddress();
      const alreadyVoted = await this.hasVoted(proposalId, userAddress);
      if (alreadyVoted) {
        return {
          success: false,
          error: 'Already voted',
          message: 'You have already voted on this proposal'
        };
      }

      // Map internal proposal ID to actual Uniswap governance proposal ID
      const mappedProposalId = proposalMapping.mapProposalId(proposalId);
      
      // Convert proposal ID to BigInt for the contract call
      const proposalIdBigInt = BigInt(mappedProposalId);

      // Estimate gas
      let gasEstimate: bigint;
      try {
        if (reason && reason.trim()) {
          gasEstimate = await this.contract.castVoteWithReason.estimateGas(
            proposalIdBigInt,
            support,
            reason.trim()
          );
        } else {
          gasEstimate = await this.contract.castVote.estimateGas(
            proposalIdBigInt,
            support
          );
        }
      } catch (gasError) {
        console.error('Gas estimation failed:', gasError);
        return {
          success: false,
          error: 'Gas estimation failed',
          message: 'Unable to estimate gas. The proposal may not be active or you may have already voted.'
        };
      }

      // Add 20% buffer to gas estimate
      const gasLimit = gasEstimate * 120n / 100n;

      // Execute the vote
      let tx: ethers.ContractTransactionResponse;
      if (reason && reason.trim()) {
        tx = await this.contract.castVoteWithReason(
          proposalIdBigInt,
          support,
          reason.trim(),
          { gasLimit }
        );
      } else {
        tx = await this.contract.castVote(
          proposalIdBigInt,
          support,
          { gasLimit }
        );
      }

      return {
        success: true,
        txHash: tx.hash,
        message: 'Vote submitted successfully! Transaction is being processed.'
      };

    } catch (error: any) {
      console.error('Vote failed:', error);
      
      let errorMessage = 'Vote failed';
      if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transaction was rejected by user';
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = 'Insufficient funds for gas fees';
      } else if (error.message?.includes('execution reverted')) {
        errorMessage = 'Transaction failed. You may have already voted or the proposal is not active.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    }
  }

  async waitForTransaction(txHash: string): Promise<VoteResult> {
    if (!this.provider) {
      return {
        success: false,
        error: 'Provider not available',
        message: 'Unable to wait for transaction'
      };
    }

    try {
      const receipt = await this.provider.waitForTransaction(txHash);
      
      if (receipt?.status === 1) {
        return {
          success: true,
          txHash,
          message: 'Vote confirmed on-chain!'
        };
      } else {
        return {
          success: false,
          txHash,
          error: 'Transaction failed',
          message: 'Transaction was reverted'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        txHash,
        error: error.message || 'Transaction failed',
        message: 'Failed to confirm transaction'
      };
    }
  }

  async validateProposal(proposalId: string): Promise<{ exists: boolean; state?: number; error?: string; mappedId?: string }> {
    if (!this.contract) {
      return { exists: false, error: 'Contract not initialized' };
    }

    try {
      // Map internal proposal ID to actual Uniswap governance proposal ID
      const mappedProposalId = proposalMapping.mapProposalId(proposalId);
      const proposalIdBigInt = BigInt(mappedProposalId);
      const state = await this.contract.state(proposalIdBigInt);
      return { exists: true, state: Number(state), mappedId: mappedProposalId };
    } catch (error: any) {
      if (error.code === 'BAD_DATA' || error.message?.includes('could not decode result data')) {
        return { exists: false, error: 'Proposal does not exist', mappedId: proposalMapping.mapProposalId(proposalId) };
      }
      return { exists: false, error: error.message, mappedId: proposalMapping.mapProposalId(proposalId) };
    }
  }

  getContractAddress(): string {
    return this.CONTRACT_ADDRESS;
  }

  isConnected(): boolean {
    return this.signer !== null;
  }
}

// Export singleton instance
export const votingService = new VotingService();
export default votingService;
