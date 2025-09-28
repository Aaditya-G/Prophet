/**
 * Debug utility for testing Uniswap governance contract
 */

import { votingService } from '../services/votingService';

// Known Uniswap governance proposal IDs (these are real examples)
const KNOWN_PROPOSAL_IDS = [
  '1', '2', '3', '4', '5', '10', '20', '30', '40', '50',
  '60', '70', '80', '90', '100', '110', '120', '130', '140', '150'
];

export const debugVotingService = async () => {
  console.log('🔍 Debugging Voting Service...');
  console.log('📋 Contract Address:', votingService.getContractAddress());
  
  try {
    // Test wallet connection
    console.log('🔗 Testing wallet connection...');
    const connected = await votingService.connectWallet();
    
    if (!connected) {
      console.log('❌ Wallet connection failed');
      return;
    }
    
    console.log('✅ Wallet connected successfully');
    
    // Test contract connection by checking known proposal IDs
    console.log('🔍 Testing contract connection with known proposal IDs...');
    
    for (const proposalId of KNOWN_PROPOSAL_IDS.slice(0, 5)) { // Test first 5
      try {
        console.log(`📊 Checking proposal ${proposalId}...`);
        const validation = await votingService.validateProposal(proposalId);
        
        if (validation.exists) {
          console.log(`✅ Proposal ${proposalId} exists! State: ${validation.state}`);
          
          // If we found an active proposal, test voting checks
          if (validation.state === 1) { // ACTIVE
            console.log(`🎯 Found active proposal ${proposalId}! Testing vote checks...`);
            
            try {
              const userAddress = '0x0000000000000000000000000000000000000000'; // Mock address
              const hasVoted = await votingService.hasVoted(proposalId, userAddress);
              console.log(`📝 Has voted check for ${proposalId}: ${hasVoted}`);
            } catch (error) {
              console.log(`⚠️  Vote check failed for ${proposalId}:`, error);
            }
          }
        } else {
          console.log(`❌ Proposal ${proposalId} does not exist`);
        }
      } catch (error) {
        console.log(`⚠️  Error checking proposal ${proposalId}:`, error);
      }
    }
    
    console.log('🎉 Debug complete!');
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
};

// Export for browser console
if (typeof window !== 'undefined') {
  (window as any).debugVotingService = debugVotingService;
}

export default debugVotingService;


