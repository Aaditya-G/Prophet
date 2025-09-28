/**
 * AI Chatbot Integration for Proposals Page
 * This component integrates with the Agentverse AI agent for proposal discussions
 */

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { sendMessageToAgent, getAvailableProposals } from '../services/agentApi';

interface Proposal {
  id: string;
  title: string;
  description: string;
  state: string;
  recommendation?: string;
  confidence?: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
  referenced_data?: string[];
  suggested_questions?: string[];
}

interface ProposalAnalysis {
  proposal_id: string;
  title: string;
  recommendation: string;
  confidence: number;
  summary: string;
  risk_count: number;
  timestamp: string;
}

const AIProposalChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [availableProposals, setAvailableProposals] = useState<ProposalAnalysis[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProposals, setIsLoadingProposals] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  // Agent configuration
  const AGENT_ENDPOINT = import.meta.env.VITE_AGENT_ENDPOINT || 'https://agentverse.ai';
  const AGENT_ADDRESS = import.meta.env.VITE_AGENT_ADDRESS || 'agent1qgpj5kutnekkpjgsw9vjaq9mtxx5ze58p4s5dxl5xndkc8xpw8dew6pa5nk';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load available proposals when chatbot opens
  useEffect(() => {
    if (isOpen && availableProposals.length === 0) {
      loadAvailableProposals();
    }
  }, [isOpen]);

  // Animation effects
  useEffect(() => {
    if (isOpen && chatbotRef.current) {
      gsap.fromTo(chatbotRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const loadAvailableProposals = async () => {
    setIsLoadingProposals(true);
    try {
      console.log('🔄 Loading proposals from AI agent...');
      const proposals = await getAvailableProposals();
      setAvailableProposals(proposals);
      console.log('✅ Proposals loaded:', proposals);
    } catch (error) {
      console.error('Error loading proposals:', error);
    } finally {
      setIsLoadingProposals(false);
    }
  };

  const handleSendMessageToAgent = async (message: string, proposalId: string) => {
    try {
      console.log('🤖 Sending message to AI agent:', { message, proposalId });
      
      // Call the real agent API
      const response = await sendMessageToAgent(message, proposalId);
      
      console.log('✅ Agent response received:', response);
      return response;

    } catch (error) {
      console.error('Error sending message to agent:', error);
      return {
        message: "Sorry, I'm having trouble connecting to the AI agent. Please try again later.",
        suggested_questions: ["What proposal would you like to discuss?"],
        referenced_data: [],
        proposal_id: proposalId,
        timestamp: new Date().toISOString()
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedProposal || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botResponse = await handleSendMessageToAgent(inputMessage, selectedProposal.id);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: botResponse.message,
        timestamp: botResponse.timestamp,
        referenced_data: botResponse.referenced_data,
        suggested_questions: botResponse.suggested_questions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleProposalSelect = (proposalId: string) => {
    const proposal = availableProposals.find(p => p.proposal_id === proposalId);
    if (proposal) {
      setSelectedProposal({
        id: proposal.proposal_id,
        title: proposal.title,
        description: proposal.summary,
        state: 'ACTIVE',
        recommendation: proposal.recommendation,
        confidence: proposal.confidence
      });
      
      // Clear previous messages when switching proposals
      setMessages([]);
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'bot',
        message: `Hello! I'm ready to discuss **${proposal.title}** with you. I recommend **${proposal.recommendation}** with ${(proposal.confidence * 100).toFixed(1)}% confidence. What would you like to know about this proposal?`,
        timestamp: new Date().toISOString(),
        suggested_questions: [
          "What are the main risks?",
          "Why do you recommend this?",
          "What are the key benefits?"
        ]
      };
      
      setMessages([welcomeMessage]);
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'FOR': return 'bg-green-500 text-white';
      case 'AGAINST': return 'bg-red-500 text-white';
      case 'ABSTAIN': return 'bg-yellow-500 text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (!isOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999999,
          pointerEvents: 'auto',
          transform: 'translateZ(0)', // Force hardware acceleration
          willChange: 'transform' // Optimize for animations
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 flex items-center space-x-2 hover:opacity-90"
          style={{ 
            backgroundColor: '#c77dff', 
            color: '#10002b'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Ask AI About Proposals</span>
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={chatbotRef}
      style={{ 
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '384px',
        height: '600px',
        backgroundColor: 'rgba(16, 15, 23, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: 999999,
        pointerEvents: 'auto',
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'transform' // Optimize for animations
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c77dff', color: '#10002b' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">AI Proposal Advisor</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {!selectedProposal ? (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-gray-300">Select a proposal to discuss:</p>
              {isLoadingProposals ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
                </div>
              ) : (
                <select 
                  onChange={(e) => handleProposalSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-white text-sm focus:outline-none"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(197, 255, 74, 0.2)' }}
                >
                  <option value="" style={{ backgroundColor: '#10002b', color: 'white' }}>Choose an active proposal</option>
                  {availableProposals.map((proposal) => (
                    <option 
                      key={proposal.proposal_id} 
                      value={proposal.proposal_id}
                      style={{ backgroundColor: '#10002b', color: 'white' }}
                    >
                      {proposal.title} - {proposal.recommendation}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-white truncate">{selectedProposal.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRecommendationColor(selectedProposal.recommendation || '')}`}>
                  {selectedProposal.recommendation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Confidence: {((selectedProposal.confidence || 0) * 100).toFixed(1)}%
                </p>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="flex items-center space-x-1 text-xs text-[#c77dff] hover:text-[#9d4edd] transition-colors group"
                >
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Switch</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'text-white'
                    : 'text-gray-100'
                }`}
                style={{
                  backgroundColor: message.type === 'user' 
                    ? '#c77dff' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: message.type === 'user' ? '#10002b' : 'white'
                }}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && (
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c77dff' }}>
                      <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {message.type === 'user' && (
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full flex items-center justify-center bg-white">
                      <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                    
                    {/* Suggested questions */}
                    {message.suggested_questions && message.suggested_questions.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.suggested_questions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="block w-full text-left text-xs underline hover:no-underline transition-all"
                            style={{ color: message.type === 'user' ? '#10002b' : '#c77dff' }}
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c77dff' }}>
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                  <span className="text-sm text-gray-300">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {selectedProposal && (
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about this proposal..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-lg text-white text-sm focus:outline-none placeholder-gray-400"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(197, 255, 74, 0.2)'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-3 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
                style={{ backgroundColor: '#c77dff', color: '#10002b' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIProposalChatbot;