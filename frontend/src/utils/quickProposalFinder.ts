/**
 * Quick Uniswap Proposal ID Finder
 * Finds actual valid Uniswap governance proposal IDs
 */

import { votingService } from '../services/votingService';

// Common Uniswap governance proposal IDs that are likely to exist
const COMMON_PROPOSAL_IDS = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
  '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
  '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
  '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
  '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
  '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
  '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'
];

export const findValidProposalIds = async (): Promise<{
  validIds: string[];
  activeIds: string[];
  summary: string;
}> => {
  console.log('🔍 Searching for valid Uniswap governance proposal IDs...');
  
  const validIds: string[] = [];
  const activeIds: string[] = [];
  
  // Test proposals in batches
  const batchSize = 5;
  for (let i = 0; i < COMMON_PROPOSAL_IDS.length; i += batchSize) {
    const batch = COMMON_PROPOSAL_IDS.slice(i, i + batchSize);
    
    const promises = batch.map(async (id) => {
      try {
        const validation = await votingService.validateProposal(id);
        if (validation.exists) {
          validIds.push(id);
          if (validation.state === 1) { // ACTIVE
            activeIds.push(id);
            console.log(`🎯 ACTIVE PROPOSAL FOUND: ${id}`);
          } else {
            console.log(`✅ Valid proposal: ${id} (state: ${validation.state})`);
          }
        } else {
          console.log(`❌ Proposal ${id} does not exist`);
        }
      } catch (error) {
        console.log(`⚠️  Error testing proposal ${id}:`, error);
      }
    });
    
    await Promise.all(promises);
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  const summary = `Found ${validIds.length} valid proposals, ${activeIds.length} active proposals`;
  console.log(`🎉 ${summary}`);
  
  return { validIds, activeIds, summary };
};

export const quickTest = async (): Promise<void> => {
  console.log('🚀 Quick test of common Uniswap governance proposal IDs...');
  
  // Test a smaller set first
  const testIds = ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89'];
  
  for (const id of testIds) {
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
};

export const updateProposalMapping = (internalId: string, externalId: string): void => {
  console.log(`📝 Updating proposal mapping: ${internalId} -> ${externalId}`);
  
  // This would update the mapping service
  // For now, we'll just log it
  console.log(`Add this to proposalMapping.ts:`);
  console.log(`proposalMapping.addMapping('${internalId}', '${externalId}');`);
};

// Export for browser console
if (typeof window !== 'undefined') {
  (window as any).findValidProposalIds = findValidProposalIds;
  (window as any).quickTest = quickTest;
  (window as any).updateProposalMapping = updateProposalMapping;
}

export default { findValidProposalIds, quickTest, updateProposalMapping };
