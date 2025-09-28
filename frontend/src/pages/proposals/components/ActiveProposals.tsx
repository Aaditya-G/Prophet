import { useState } from 'react'
import { useProposals } from '../../../hooks/useProposals'
import { convertBackendToActiveProposal, getAIAnalysisForProposal, calculateVotePercentages } from '../../../utils/proposalUtils'
import { MarkdownRenderer } from '../../../components/MarkdownRenderer'
import VotingModal from '../../../components/VotingModal'
import { VOTE_SUPPORT } from '../../../services/votingService'
import type { VoteType, BackendProposal } from '../types'
import type { AIAnalysisData } from '../../../services/api'

interface ActiveProposalsProps {
  searchTerm: string
  onShowAIAnalysis?: (proposal: BackendProposal, aiAnalysis?: AIAnalysisData) => void
  isAnalysisMode?: boolean
}

export const ActiveProposals = ({ searchTerm, onShowAIAnalysis, isAnalysisMode }: ActiveProposalsProps) => {
  const [votedProposals, setVotedProposals] = useState<Set<string>>(new Set())
  const [votingModal, setVotingModal] = useState<{
    isOpen: boolean;
    proposalId: string;
    proposalTitle: string;
    voteType: number;
  }>({
    isOpen: false,
    proposalId: '',
    proposalTitle: '',
    voteType: 0
  })
  const { activeProposal, aiAnalysis, loading, error } = useProposals(10)

  // Convert backend proposal to frontend format and filter by search term
  const filteredProposals = activeProposal 
    ? [convertBackendToActiveProposal(activeProposal)].filter(proposal =>
        proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.subgraph.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'defi':
        return 'bg-green-500'
      case 'nft':
        return 'bg-purple-500'
      case 'dao':
        return 'bg-blue-500'
      case 'gaming':
        return 'bg-pink-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleVote = (proposalId: string, voteType: VoteType) => {
    // Map frontend vote types to contract vote support values
    const voteSupportMap = {
      'for': VOTE_SUPPORT.FOR,
      'against': VOTE_SUPPORT.AGAINST,
      'abstain': VOTE_SUPPORT.ABSTAIN
    };

    const proposal = filteredProposals.find(p => p.id === proposalId);
    if (!proposal) return;

    setVotingModal({
      isOpen: true,
      proposalId,
      proposalTitle: proposal.title,
      voteType: voteSupportMap[voteType]
    });
  }

  const handleVoteSuccess = (txHash: string) => {
    setVotedProposals(prev => new Set([...prev, votingModal.proposalId]));
    console.log(`Vote successful! TX: ${txHash}`);
  }

  const closeVotingModal = () => {
    setVotingModal({
      isOpen: false,
      proposalId: '',
      proposalTitle: '',
      voteType: 0
    });
  }

  const handleShowAIAnalysis = (proposal: any) => {
    const proposalAIAnalysis = getAIAnalysisForProposal(proposal.id, aiAnalysis)
    if (activeProposal && activeProposal.id === proposal.id) {
      onShowAIAnalysis?.(activeProposal, proposalAIAnalysis)
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c77dff]"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading proposals: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#c77dff] text-[#10002b] rounded-xl font-semibold hover:bg-[#9d4edd] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.5)', backgroundColor: 'transparent' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 20V10M12 20V4M20 20v-7" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Active Proposals</h2>
        </div>
        <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
          {filteredProposals.length} LIVE
        </div>
      </div>
      
      <p className="text-gray-300 mb-6">
        Currently active proposals that are open for voting. Participate in governance decisions.
      </p>

      <div className="space-y-6">
        {filteredProposals.map((proposal) => (
          <div 
            key={proposal.id}
            className="rounded-2xl p-6 proposal-card"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(proposal.category)} text-white`}>
                    {proposal.category}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="text-sm text-gray-300">
                    <MarkdownRenderer content={proposal.description} maxLength={150} />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold truncate max-w-[120px]" style={{ backgroundColor: '#c77dff', color: '#10002b' }}>
                    {proposal.subgraph}
                  </span>
                  <span className="text-gray-600 text-xs">/</span>
                  <span className="text-gray-400 text-xs">Created on {proposal.endTime}</span>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'rgba(199, 125, 255, 0.2)', color: '#c77dff' }}>
                {proposal.status.toUpperCase()}
              </div>
            </div>

            {/* Voting Progress Bars */}
            <div className="space-y-3 mb-4">
              {(() => {
                const percentages = calculateVotePercentages(proposal.forVotes, proposal.againstVotes, proposal.abstainVotes, proposal.totalVotes)
                return (
                  <>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-400 font-medium">For</span>
                        <span className="text-white font-semibold">{(proposal.forVotes || 0).toLocaleString()} votes ({percentages.for}%)</span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentages.for}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-400 font-medium">Against</span>
                        <span className="text-white font-semibold">{(proposal.againstVotes || 0).toLocaleString()} votes ({percentages.against}%)</span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <div 
                          className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentages.against}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400 font-medium">Abstain</span>
                        <span className="text-white font-semibold">{(proposal.abstainVotes || 0).toLocaleString()} votes ({percentages.abstain}%)</span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <div 
                          className="bg-gray-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentages.abstain}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => handleVote(proposal.id, 'for')}
                disabled={votedProposals.has(proposal.id)}
                className="flex-1 bg-emerald-600/80 hover:bg-emerald-700/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                {isAnalysisMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  votedProposals.has(proposal.id) ? 'Voted' : 'Vote For'
                )}
              </button>
              <button 
                onClick={() => handleVote(proposal.id, 'against')}
                disabled={votedProposals.has(proposal.id)}
                className="flex-1 bg-rose-600/80 hover:bg-rose-700/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                {isAnalysisMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  votedProposals.has(proposal.id) ? 'Voted' : 'Vote Against'
                )}
              </button>
              <button 
                onClick={() => handleVote(proposal.id, 'abstain')}
                disabled={votedProposals.has(proposal.id)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-2 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                {isAnalysisMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                ) : (
                  votedProposals.has(proposal.id) ? 'Voted' : 'Abstain'
                )}
              </button>
              <button 
                onClick={() => handleShowAIAnalysis(proposal)}
                className="flex-[1.5] ai-analysis-button text-white py-2 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {!isAnalysisMode && <span>Show AI Analysis</span>}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No active proposals found matching your search.</p>
        </div>
      )}

      {/* Voting Modal */}
      <VotingModal
        isOpen={votingModal.isOpen}
        onClose={closeVotingModal}
        proposalId={votingModal.proposalId}
        proposalTitle={votingModal.proposalTitle}
        voteType={votingModal.voteType}
        onVoteSuccess={handleVoteSuccess}
      />
    </div>
  )
}
