/**
 * Uniswap Governance Proposal Finder
 * Helps find actual Uniswap governance proposal IDs that exist on-chain
 */

import { votingService } from '../services/votingService';

export class UniswapProposalFinder {
  private static instance: UniswapProposalFinder;

  static getInstance(): UniswapProposalFinder {
    if (!UniswapProposalFinder.instance) {
      UniswapProposalFinder.instance = new UniswapProposalFinder();
    }
    return UniswapProposalFinder.instance;
  }

  /**
   * Finds valid Uniswap governance proposal IDs by testing a range
   */
  async findValidProposalIds(startId: number = 1, endId: number = 200): Promise<{
    validIds: string[];
    activeIds: string[];
    errors: { id: string; error: string }[];
  }> {
    console.log(`🔍 Searching for valid Uniswap governance proposals from ${startId} to ${endId}...`);
    
    const validIds: string[] = [];
    const activeIds: string[] = [];
    const errors: { id: string; error: string }[] = [];

    // Test in batches to avoid overwhelming the RPC
    const batchSize = 10;
    for (let i = startId; i <= endId; i += batchSize) {
      const batch = [];
      for (let j = i; j < Math.min(i + batchSize, endId + 1); j++) {
        batch.push(this.testProposalId(j.toString()));
      }
      
      const results = await Promise.allSettled(batch);
      
      results.forEach((result, index) => {
        const proposalId = (i + index).toString();
        if (result.status === 'fulfilled') {
          const { exists, state } = result.value;
          if (exists) {
            validIds.push(proposalId);
            if (state === 1) { // ACTIVE
              activeIds.push(proposalId);
            }
            console.log(`✅ Proposal ${proposalId} exists (state: ${state})`);
          } else {
            console.log(`❌ Proposal ${proposalId} does not exist`);
          }
        } else {
          errors.push({ id: proposalId, error: result.reason });
          console.log(`⚠️  Error testing proposal ${proposalId}:`, result.reason);
        }
      });
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`🎉 Found ${validIds.length} valid proposals, ${activeIds.length} active proposals`);
    return { validIds, activeIds, errors };
  }

  /**
   * Tests a single proposal ID
   */
  private async testProposalId(proposalId: string): Promise<{ exists: boolean; state?: number }> {
    try {
      const validation = await votingService.validateProposal(proposalId);
      return { exists: validation.exists, state: validation.state };
    } catch (error) {
      throw new Error(`Failed to test proposal ${proposalId}: ${error}`);
    }
  }

  /**
   * Gets a list of recent proposal IDs that are likely to exist
   */
  getRecentProposalIds(): string[] {
    // These are common Uniswap governance proposal IDs
    // You may need to update these based on current governance activity
    return [
      '80', '81', '82', '83', '84', '85', '86', '87', '88', '89',
      '90', '91', '92', '93', '94', '95', '96', '97', '98', '99',
      '100', '101', '102', '103', '104', '105', '106', '107', '108', '109',
      '110', '111', '112', '113', '114', '115', '116', '117', '118', '119',
      '120', '121', '122', '123', '124', '125', '126', '127', '128', '129',
      '130', '131', '132', '133', '134', '135', '136', '137', '138', '139',
      '140', '141', '142', '143', '144', '145', '146', '147', '148', '149',
      '150'
    ];
  }

  /**
   * Quick test of common proposal IDs
   */
  async quickTest(): Promise<void> {
    console.log('🚀 Quick test of common Uniswap governance proposal IDs...');
    
    const commonIds = this.getRecentProposalIds().slice(0, 20); // Test first 20
    
    for (const id of commonIds) {
      try {
        const validation = await votingService.validateProposal(id);
        if (validation.exists) {
          console.log(`✅ Proposal ${id} exists! State: ${validation.state}`);
          if (validation.state === 1) {
            console.log(`🎯 ACTIVE PROPOSAL FOUND: ${id}`);
          }
        } else {
          console.log(`❌ Proposal ${id} does not exist`);
        }
      } catch (error) {
        console.log(`⚠️  Error testing proposal ${id}:`, error);
      }
    }
  }
}

// Export singleton instance
export const proposalFinder = UniswapProposalFinder.getInstance();

// Export for browser console
if (typeof window !== 'undefined') {
  (window as any).proposalFinder = proposalFinder;
  (window as any).findValidProposals = () => proposalFinder.findValidProposalIds();
  (window as any).quickTest = () => proposalFinder.quickTest();
}

export default proposalFinder;

