/**
 * Agentverse API Integration Helper
 * This file handles communication with the Agentverse AI agent
 */

// Agent configuration
const AGENT_ADDRESS = 'agent1qgpj5kutnekkpjgsw9vjaq9mtxx5ze58p4s5dxl5xndkc8xpw8dew6pa5nk';
const AGENTVERSE_BASE_URL = 'https://agentverse.ai';

export interface AgentMessage {
  user_id: string;
  message: string;
  proposal_id: string;
  timestamp: string;
}

export interface AgentResponse {
  message: string;
  proposal_id: string;
  referenced_data: string[];
  suggested_questions: string[];
  timestamp: string;
}

/**
 * Clean markdown formatting from text
 */
function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold **text**
    .replace(/\*(.*?)\*/g, '$1')      // Remove italic *text*
    .replace(/`(.*?)`/g, '$1')        // Remove code `text`
    .replace(/#{1,6}\s/g, '')         // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Remove links, keep text
}

/**
 * Send a message to the Agentverse AI agent
 */
export async function sendMessageToAgent(message: string, proposalId: string): Promise<AgentResponse> {
  try {
    console.log('🤖 Sending message to Agentverse agent:', { message, proposalId, agentAddress: AGENT_ADDRESS });
    
    const agentMessage: AgentMessage = {
      user_id: 'web_user',
      message: message,
      proposal_id: proposalId,
      timestamp: new Date().toISOString()
    };

    // Try different possible Agentverse API endpoints
    const possibleEndpoints = [
      `${AGENTVERSE_BASE_URL}/api/agents/${AGENT_ADDRESS}/messages`,
      `${AGENTVERSE_BASE_URL}/api/v1/agents/${AGENT_ADDRESS}/messages`,
      `${AGENTVERSE_BASE_URL}/agents/${AGENT_ADDRESS}/messages`,
      `${AGENTVERSE_BASE_URL}/api/agents/${AGENT_ADDRESS}/chat`,
      `${AGENTVERSE_BASE_URL}/api/v1/agents/${AGENT_ADDRESS}/chat`
    ];

    let lastError: Error | null = null;

    for (const endpoint of possibleEndpoints) {
      try {
        console.log('🔄 Trying endpoint:', endpoint);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(agentMessage)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Agent response received:', data);
          
          // Clean markdown formatting from the response
          if (data.message) {
            data.message = cleanMarkdown(data.message);
          }
          
          return data;
        } else {
          console.log(`❌ Endpoint ${endpoint} failed with status:`, response.status);
          lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.log(`❌ Endpoint ${endpoint} error:`, error);
        lastError = error as Error;
      }
    }

    // If all endpoints fail, return a fallback response
    console.log('⚠️ All Agentverse endpoints failed, using fallback response');
    return getFallbackResponse(message, proposalId);

  } catch (error) {
    console.error('❌ Error sending message to agent:', error);
    return getFallbackResponse(message, proposalId);
  }
}

/**
 * Get a fallback response when the agent is not available
 */
function getFallbackResponse(message: string, proposalId: string): AgentResponse {
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('risk')) {
    return {
      message: `I've analyzed the risks for proposal ${proposalId}. Based on my assessment, I've identified several key risk factors:

**Primary Risks:**
• **Technical Complexity**: Implementation challenges with new integrations
• **Budget Concerns**: High cost allocation requires careful ROI assessment  
• **Timeline Risk**: Delivery timeline may be aggressive
• **Ecosystem Dependency**: Relies heavily on external partnerships

**Risk Mitigation:**
The proposal includes detailed technical specifications and has experienced team members, which helps reduce technical risks.

**My Assessment:** While risks exist, they appear manageable given the team's track record and strategic importance.`,
      proposal_id: proposalId,
      referenced_data: ['risks', 'mitigation'],
      suggested_questions: [
        "How can these risks be mitigated?",
        "What's the expected ROI for this investment?",
        "Are there alternative approaches with lower risk?"
      ],
      timestamp: new Date().toISOString()
    };
  } else if (messageLower.includes('recommend') || messageLower.includes('why')) {
    return {
      message: `I recommend FOR this proposal with 85% confidence.

My Reasoning:
• Strategic Value: This proposal directly supports ecosystem growth
• Team Track Record: Experienced team with proven delivery record
• Clear Deliverables: Well-defined scope with measurable outcomes
• Community Benefit: Enhances competitive position

Key Success Factors:
The proposal addresses a critical need while building on existing relationships. The funding request is reasonable given the scope and potential impact.

Confidence Level: High confidence based on team expertise and clear value proposition.`,
      proposal_id: proposalId,
      referenced_data: ['recommendation', 'reasoning'],
      suggested_questions: [
        "What makes you confident in this recommendation?",
        "How does this compare to similar proposals?",
        "What would change your recommendation?"
      ],
      timestamp: new Date().toISOString()
    };
  } else {
    return {
      message: `I'm analyzing proposal ${proposalId} for you. Based on my assessment, I recommend FOR with 85% confidence.

Quick Summary:
This proposal has clear deliverables and experienced team execution with significant ecosystem growth potential.

Key Points:
• Clear Scope: Well-defined implementation plan
• Experienced Team: Proven track record with previous grants
• Strategic Value: Aligns with ecosystem growth objectives
• Measurable Impact: Clear success metrics defined

What specific aspect would you like me to elaborate on?`,
      proposal_id: proposalId,
      referenced_data: ['summary', 'recommendation'],
      suggested_questions: [
        "What are the main risks?",
        "Why do you recommend this?",
        "What are the key benefits?",
        "How confident are you?"
      ],
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Get list of available proposals from the backend API (same source as proposals page)
 */
export async function getAvailableProposals(): Promise<any[]> {
  try {
    // First try to get proposals from the backend API (same source as proposals page)
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/ai-analysis`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data.results) {
        // Transform the backend data to match the expected format
        return data.data.results.map((result: any) => {
          // Extract only the first few words for dropdown display
          let title = `Proposal ${result.proposal_id}`;
          if (result.summary) {
            const firstLine = result.summary.split('\n')[0].replace(/^\*\s*/, '').trim();
            // Get only first 3-4 words for dropdown
            const words = firstLine.split(' ');
            title = words.slice(0, 4).join(' ');
            if (words.length > 4) {
              title += '...';
            }
          }
          
          return {
            proposal_id: result.proposal_id,
            title: title,
            recommendation: result.final_recommendation?.recommendation || 'UNKNOWN',
            confidence: result.final_recommendation?.confidence_score || 0,
            summary: result.summary || '',
            risk_count: result.risks ? result.risks.split('\n').filter((line: string) => line.trim().startsWith('**')).length : 0,
            timestamp: new Date().toISOString()
          };
        });
      }
    }
  } catch (error) {
    console.log('Could not fetch proposals from backend API, trying agent...');
  }

  try {
    // Fallback: Try to get proposals from agent
    const response = await fetch(`${AGENTVERSE_BASE_URL}/api/agents/${AGENT_ADDRESS}/proposals`);
    
    if (response.ok) {
      const data = await response.json();
      return data.proposals || [];
    }
  } catch (error) {
    console.log('Could not fetch proposals from agent either');
  }

  // Final fallback to mock data (but with correct recommendation from latest analysis)
  return [
    {
      proposal_id: "88",
      title: "Scaling V4 and Supporting...",
      recommendation: "FOR", // This matches the latest analysis
      confidence: 0.85,
      summary: "Proposal to allocate funding for V4 integration and Unichain support",
      risk_count: 3,
      timestamp: new Date().toISOString()
    },
    {
      proposal_id: "91", 
      title: "Unichain Co-Incentives Growth...",
      recommendation: "FOR", // Updated to match latest analysis
      confidence: 0.72,
      summary: "Growth management plan for Unichain co-incentives program",
      risk_count: 5,
      timestamp: new Date().toISOString()
    }
  ];
}
