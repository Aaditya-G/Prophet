import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface Proposer {
  id: string;
  delegated_votes_raw: number | null;
  number_votes: number | null;
  token_holders_represented_amount: number | null;
}

export interface Vote {
  id: string;
  weight: number | null;
  choice: string | null;
  reason: string | null;
}

export interface Proposal {
  id: string;
  description: string;
  creation_time: string | null;
  quorum_votes: number | null;
  //
  proposer: Proposer;
  state: string;
  votes: Vote[];
  // Backend field names
  abstain_delegate_votes?: number | null;
  against_delegate_votes?: number | null;
  for_delegate_votes?: number | null;
  total_delegate_votes?: number | null;
}

export interface AIRecommendation {
  recommendation: string;
  rationale: string;
  confidence_score: number;
  reasoning_steps: string[];
}

export interface AIAnalysisData {
  proposal_id: string;
  summary: string;
  risks: string;
  final_recommendation: AIRecommendation;
  classifier_probability: number;
  stats: Record<string, unknown>;
  context: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  total_count?: number;
  subgraph_id?: string;
  last_updated?: string;
  error?: string;
}

class ProposalAPI {

  async getAllProposals(): Promise<Proposal[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/proposals`, { timeout: 300000 }); // 5 minutes
      console.log('All proposals response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all proposals:', error);
      throw error;
    }
  }

  async getProposalById(id: string): Promise<Proposal> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/proposals/${id}`, { timeout: 300000 }); // 5 minutes
      console.log(`Proposal ${id} response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching proposal ${id}:`, error);
      throw error;
    }
  }

  async getAIAnalysis(): Promise<APIResponse<{ results: AIAnalysisData[] }>> {
    const response = await axios.get(`${API_BASE_URL}/api/ai-analysis`);
    return response.data;
  }

  async refreshData(): Promise<APIResponse<unknown>> {
    const response = await axios.post(`${API_BASE_URL}/api/refresh`);
    return response.data;
  }

  async getStatus(): Promise<APIResponse<unknown>> {
    const response = await axios.get(`${API_BASE_URL}/api/status`);
    return response.data;
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/proposals`, { timeout: 300000 }); // 5 minutes
      console.log('Backend connection test successful:', response.status);
      return true;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  }
}

export const proposalAPI = new ProposalAPI();
