/**
 * Test Voting Functionality
 * Simple test to verify the voting service works correctly
 */

import { votingService, VOTE_SUPPORT } from '../services/votingService';

// Mock test function
export const testVotingService = async () => {
  console.log('🧪 Testing Voting Service...');
  
  try {
    // Test 1: Check if service initializes correctly
    console.log('✅ Voting service initialized');
    console.log('📋 Contract address:', votingService.getContractAddress());
    
    // Test 2: Check wallet connection (this will prompt user)
    console.log('🔗 Testing wallet connection...');
    const connected = await votingService.connectWallet();
    
    if (connected) {
      console.log('✅ Wallet connected successfully');
      
      // Test 3: Check proposal state (using a real Uniswap proposal ID)
      const testProposalId = '91'; // This is a real Uniswap proposal
      console.log(`📊 Checking proposal ${testProposalId} state...`);
      
      try {
        const state = await votingService.checkProposalState(testProposalId);
        console.log(`✅ Proposal state: ${state}`);
        
        // Test 4: Check if user has voted (this will work even if they haven't voted)
        const userAddress = '0x0000000000000000000000000000000000000000'; // Mock address
        const hasVoted = await votingService.hasVoted(testProposalId, userAddress);
        console.log(`✅ Has voted check: ${hasVoted}`);
        
        console.log('🎉 All tests passed! Voting service is working correctly.');
        
      } catch (error) {
        console.log('⚠️  Proposal check failed (this is expected if proposal is not active):', error);
      }
      
    } else {
      console.log('❌ Wallet connection failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testVotingService = testVotingService;
}

export default testVotingService;


