import type { BackendProposal, LegacyProposal, ActiveProposal } from '../pages/proposals/types';
import type { AIAnalysisData } from '../services/api';

// Utility function to convert wei to readable number
export const formatVotes = (votes: string): number => {
  const num = parseFloat(votes) / 1e18; // Convert from wei
  return Math.round(num);
};

// Utility function to extract title from description
export const extractTitle = (description: string): string => {
  // Try to extract title from markdown header or first line
  const lines = description.split('\n');
  const firstLine = lines[0].trim();
  
  // If it starts with #, remove it
  if (firstLine.startsWith('#')) {
    return firstLine.replace(/^#+\s*/, '').trim();
  }
  
  // Otherwise, take first line and truncate if too long
  return firstLine.length > 60 ? firstLine.substring(0, 60) + '...' : firstLine;
};

// Utility function to determine category from description
export const determineCategory = (description: string): string => {
  const desc = description.toLowerCase();
  
  if (desc.includes('defi') || desc.includes('uniswap') || desc.includes('aave') || desc.includes('compound')) {
    return 'DeFi';
  }
  if (desc.includes('nft') || desc.includes('opensea') || desc.includes('marketplace')) {
    return 'NFT';
  }
  if (desc.includes('dao') || desc.includes('governance') || desc.includes('voting')) {
    return 'DAO';
  }
  if (desc.includes('gaming') || desc.includes('game') || desc.includes('play')) {
    return 'Gaming';
  }
  if (desc.includes('infrastructure') || desc.includes('oracle') || desc.includes('chainlink')) {
    return 'Infrastructure';
  }
  
  return 'DeFi'; // Default category
};

// Convert backend proposal to frontend proposal format
export const convertBackendProposal = (backendProposal: BackendProposal): LegacyProposal => {
  const title = extractTitle(backendProposal.description);
  const category = determineCategory(backendProposal.description);
  
  return {
    id: backendProposal.id,
    title,
    description: backendProposal.description,
    subgraph: 'Uniswap Governance', // Replace subgraph ID with readable name
    status: backendProposal.state.toLowerCase() as 'active' | 'passed' | 'failed',
    category,
    votes: backendProposal.totalDelegateVotes,
    endTime: new Date(backendProposal.creationTime * 1000).toLocaleDateString() // Use creation time directly
  };
};

// Convert backend proposal to active proposal format
export const convertBackendToActiveProposal = (backendProposal: BackendProposal): ActiveProposal => {
  const baseProposal = convertBackendProposal(backendProposal);
  
  // Handle both camelCase and snake_case field names from backend
  const forVotes = backendProposal.forDelegateVotes ?? (backendProposal as any).for_delegate_votes ?? 0;
  const againstVotes = backendProposal.againstDelegateVotes ?? (backendProposal as any).against_delegate_votes ?? 0;
  const abstainVotes = backendProposal.abstainDelegateVotes ?? (backendProposal as any).abstain_delegate_votes ?? 0;
  const totalVotes = backendProposal.totalDelegateVotes ?? 0;
  
  return {
    ...baseProposal,
    forVotes,
    againstVotes,
    abstainVotes,
    totalVotes
  };
};

// Get AI analysis for a specific proposal
export const getAIAnalysisForProposal = (proposalId: string, aiAnalyses: AIAnalysisData[]): AIAnalysisData | undefined => {
  return aiAnalyses.find(analysis => analysis.proposal_id === proposalId);
};

// Calculate vote percentages
export const calculateVotePercentages = (forVotes: number, againstVotes: number, abstainVotes: number, totalVotes: number) => {
  if (totalVotes === 0) return { for: 0, against: 0, abstain: 0 };
  
  return {
    for: Math.round((forVotes / totalVotes) * 100),
    against: Math.round((againstVotes / totalVotes) * 100),
    abstain: Math.round((abstainVotes / totalVotes) * 100)
  };
};
