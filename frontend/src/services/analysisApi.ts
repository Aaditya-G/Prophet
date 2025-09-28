// services/analysisAPI.ts

import axios from 'axios';

const ANALYSIS_API_BASE_URL = 'http://127.0.0.1:5001';

/**
 * Interface for the data sent to the /analyze_proposal endpoint.
 */
export interface AnalyzeProposalPayload {
  proposal_id: string;
  constitution?: string;
}

/**
 * A placeholder for the expected response from the analysis endpoint.
 * You can replace `any` with a more specific type if you know the structure.
 */
export interface AnalysisResult {
  [key: string]: any;
}

class AnalysisAPI {
  /**
   * Sends a proposal to the analysis endpoint.
   * @param payload - The proposal ID and constitution text.
   * @returns The analysis result from the backend.
   */
  async analyzeProposal(payload: AnalyzeProposalPayload): Promise<AnalysisResult> {
    try {
      console.log(`Sending proposal ${payload.proposal_id} for analysis...`);
      const response = await axios.post(
        `${ANALYSIS_API_BASE_URL}/analyze_proposal`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 300000, // 5-minute timeout
        }
      );
      
      console.log('Proposal analysis response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error analyzing proposal ${payload.proposal_id}:`, error);
      // You can handle the error more gracefully, e.g., by returning a structured error object
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to analyze proposal: ${error.response?.data?.error || error.message}`);
      }
      throw new Error('An unknown error occurred during proposal analysis.');
    }
  }
}

export const analysisAPI = new AnalysisAPI();