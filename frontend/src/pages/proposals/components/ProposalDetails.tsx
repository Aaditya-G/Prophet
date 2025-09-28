import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { MarkdownRenderer } from '../../../components/MarkdownRenderer'
import type { BackendProposal } from '../types'
import type { AIAnalysisData } from '../../../services/api'

interface ProposalDetailsProps {
  proposal: BackendProposal | null
  aiAnalysis?: AIAnalysisData
  onClose: () => void
}

export const ProposalDetails = ({ proposal, aiAnalysis, onClose }: ProposalDetailsProps) => {
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent body scrolling when popup is open
    document.body.style.overflow = 'hidden'
    
    if (proposal && detailsRef.current) {
      gsap.fromTo(detailsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      )
    }

    // Cleanup function to restore body scrolling
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [proposal])

  if (!proposal) return null

  // Debug: Log all proposal fields to see what's available
  console.log('All proposal fields:', Object.keys(proposal));
  console.log('Delegates fields:', {
    delegatesAtStart: proposal.delegatesAtStart,
    delegates_at_start: proposal.delegates_at_start
  });

  const formatVotes = (votes: string | undefined): number => {
    if (!votes || votes === '' || votes === '0') return 0;
    try {
      const num = parseFloat(votes) / 1e18;
      return isNaN(num) ? 0 : Math.round(num);
    } catch (error) {
      console.warn('Error formatting votes:', votes, error);
      return 0;
    }
  };


  const formatDate = (timestamp: number | undefined): string => {
    if (!timestamp || timestamp === 0) return 'N/A';
    try {
      // Handle both seconds and milliseconds timestamps
      const date = timestamp > 1e10 ? new Date(timestamp) : new Date(timestamp * 1000);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.warn('Error formatting date:', timestamp, error);
      return 'Invalid Date';
    }
  };

  const formatAddress = (address: string | undefined): string => {
    if (!address || typeof address !== 'string') return 'N/A';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return createPortal(
    <div 
      ref={detailsRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ 
        backgroundColor: 'rgba(16, 15, 23, 0.98)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Container */}
      <div 
        className="w-[95vw] h-[95vh] max-w-7xl rounded-3xl overflow-hidden"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(197, 255, 74, 0.2)' }}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.5)', backgroundColor: 'transparent' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">Proposal #{proposal.id}</h1>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="h-full overflow-y-auto p-6 pb-12">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Proposal Description */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
                <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                <MarkdownRenderer content={proposal.description} />
              </div>

              {/* Voting Results */}
              <div className="rounded-2xl p-6 pb-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
                <h2 className="text-xl font-bold text-white mb-4">Voting Results</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-emerald-400 font-medium">For</span>
                      <span className="text-white font-semibold">{(proposal.forDelegateVotes || 0).toLocaleString()} votes</span>
                    </div>
                    <div className="w-full rounded-full h-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <div 
                        className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(proposal.totalDelegateVotes || 0) > 0 ? ((proposal.forDelegateVotes || 0) / (proposal.totalDelegateVotes || 1)) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-rose-400 font-medium">Against</span>
                      <span className="text-white font-semibold">{(proposal.againstDelegateVotes || 0).toLocaleString()} votes</span>
                    </div>
                    <div className="w-full rounded-full h-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <div 
                        className="bg-rose-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(proposal.totalDelegateVotes || 0) > 0 ? ((proposal.againstDelegateVotes || 0) / (proposal.totalDelegateVotes || 1)) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400 font-medium">Abstain</span>
                      <span className="text-white font-semibold">{(proposal.abstainDelegateVotes || 0).toLocaleString()} votes</span>
                    </div>
                    <div className="w-full rounded-full h-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <div 
                        className="bg-gray-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(proposal.totalDelegateVotes || 0) > 0 ? ((proposal.abstainDelegateVotes || 0) / (proposal.totalDelegateVotes || 1)) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Proposal Info */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
                <h3 className="text-lg font-bold text-white mb-4">Proposal Info</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Status</span>
                    <div className="text-white font-semibold">{proposal.state}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Subgraph</span>
                    <div className="text-white font-semibold">Uniswap Governance</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Proposer</span>
                    <div className="text-white font-mono text-sm">{formatAddress(proposal.proposer?.id)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Created</span>
                    <div className="text-white">{formatDate(proposal.creationTime)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Total Votes</span>
                    <div className="text-white">{(proposal.totalDelegateVotes || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Quorum Votes</span>
                    <div className="text-white">{(proposal.quorumVotes || 0).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* AI Analysis Summary */}
              {aiAnalysis && (
                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
                  <h3 className="text-lg font-bold text-white mb-4">AI Analysis</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Recommendation</span>
                      <div className={`font-semibold ${
                        aiAnalysis.final_recommendation.recommendation === 'FOR' ? 'text-emerald-400' :
                        aiAnalysis.final_recommendation.recommendation === 'AGAINST' ? 'text-rose-400' :
                        'text-gray-400'
                      }`}>
                        {aiAnalysis.final_recommendation.recommendation}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Confidence</span>
                      <div className="text-white font-semibold">{(aiAnalysis.final_recommendation.confidence_score * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Summary</span>
                      <div className="text-gray-300 text-sm max-h-20 overflow-y-auto">{aiAnalysis.summary.substring(0, 200)}...</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
