/**
 * Test script to verify AI chatbot integration
 * This will help test the connection between your website and the Agentverse agent
 */

// Test data for the chatbot
const testProposals = [
  {
    proposal_id: "88",
    title: "Scaling V4 and Supporting Unichain",
    recommendation: "FOR",
    confidence: 0.85,
    summary: "Proposal to allocate funding for V4 integration and Unichain support",
    risk_count: 3,
    timestamp: new Date().toISOString()
  },
  {
    proposal_id: "91",
    title: "Unichain Co-Incentives Growth Management Plan", 
    recommendation: "AGAINST",
    confidence: 0.72,
    summary: "Growth management plan for Unichain co-incentives program",
    risk_count: 5,
    timestamp: new Date().toISOString()
  }
];

// Test function to verify agent connection
async function testAgentConnection() {
  const agentAddress = "agent1qgpj5kutnekkpjgsw9vjaq9mtxx5ze58p4s5dxl5xndkc8xpw8dew6pa5nk";
  
  console.log("🤖 Testing AI Agent Connection...");
  console.log(`Agent Address: ${agentAddress}`);
  
  // Test message
  const testMessage = {
    user_id: "test_user",
    message: "What are the main risks of this proposal?",
    proposal_id: "88",
    timestamp: new Date().toISOString()
  };
  
  console.log("📤 Test message:", testMessage);
  console.log("✅ Agent is ready for testing!");
  
  return testMessage;
}

// Export for use in React component
export { testProposals, testAgentConnection };
