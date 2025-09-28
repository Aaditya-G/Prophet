// Legacy types for backward compatibility
export interface LegacyProposal {
  id: string
  title: string
  description: string
  subgraph: string
  status: 'active' | 'passed' | 'failed'
  category: string
  votes: number
  endTime: string
}

export interface ActiveProposal extends LegacyProposal {
  forVotes: number
  againstVotes: number
  abstainVotes: number
  totalVotes: number
}

// New backend API types
export interface BackendProposer {
  id: string;
  delegatedVotesRaw: number;
  numberVotes: number;
  tokenHoldersRepresentedAmount: number;
}

export interface BackendVote {
  id: string;
  weight: number;
  choice: string;
  reason: string;
}

export interface BackendProposal {
  id: string;
  description: string;
  proposer: BackendProposer;
  state: string;
  creationTime: number;
  votes: BackendVote[];
  abstainDelegateVotes: number;
  againstDelegateVotes: number;
  forDelegateVotes: number;
  quorumVotes: number;
  totalDelegateVotes: number;
}

export interface AIRecommendation {
  recommendation: string;
  rationale: string;
  confidence_score: number;
  reasoning_steps: string[];
}

export type ProposalStatus = 'active' | 'passed' | 'failed'
export type ProposalCategory = 'DeFi' | 'NFT' | 'DAO' | 'Gaming' | 'Infrastructure'
export type VoteType = 'for' | 'against' | 'abstain'
export type SortOption = 'newest' | 'oldest' | 'votes'
export type FilterOption = 'all' | 'active' | 'passed' | 'failed'
