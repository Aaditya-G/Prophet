import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { MarkdownRenderer } from '../../../components/MarkdownRenderer'
import type { BackendProposal } from '../types'
import type { AIAnalysisData } from '../../../services/api'

interface AIAnalysisProps {
  proposal: BackendProposal | null
  aiAnalysis: AIAnalysisData | undefined
  onClose: () => void
  onRefresh?: () => void
}

export const AIAnalysis = ({ proposal, aiAnalysis, onClose, onRefresh }: AIAnalysisProps) => {
  const analysisRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (proposal && analysisRef.current) {
      gsap.fromTo(analysisRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      )
    }
  }, [proposal])

  if (!proposal) return null

  return (
    <div 
      ref={analysisRef}
      className="h-full rounded-3xl p-8 overflow-y-auto layout-transition"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.5)', backgroundColor: 'transparent' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">AI Analysis</h2>
        </div>
        <div className="flex items-center space-x-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              title="Refresh AI Analysis"
            >
              <svg className="w-5 h-5 text-[#c77dff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Proposal Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-3">Proposal #{proposal.id}</h3>
        <div className="mb-4">
          <MarkdownRenderer content={proposal.description} maxLength={300} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#c77dff', color: '#10002b' }}>
            Uniswap Governance
          </span>
          <span className="text-gray-600 text-xs">/</span>
          <span className="text-gray-400 text-xs">{proposal.state}</span>
        </div>
      </div>

      {/* AI Analysis Content */}
      <div className="space-y-6">
        {aiAnalysis ? (
          <>
            {/* AI Recommendation */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  aiAnalysis.final_recommendation.recommendation === 'FOR' ? 'bg-emerald-500' :
                  aiAnalysis.final_recommendation.recommendation === 'AGAINST' ? 'bg-rose-500' :
                  'bg-gray-500'
                }`}>
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {aiAnalysis.final_recommendation.recommendation === 'FOR' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : aiAnalysis.final_recommendation.recommendation === 'AGAINST' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    )}
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">AI Recommendation</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Recommendation</span>
                  <span className={`font-semibold ${
                    aiAnalysis.final_recommendation.recommendation === 'FOR' ? 'text-emerald-400' :
                    aiAnalysis.final_recommendation.recommendation === 'AGAINST' ? 'text-rose-400' :
                    'text-gray-400'
                  }`}>
                    {aiAnalysis.final_recommendation.recommendation}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Confidence</span>
                  <span className="text-white font-semibold">{(aiAnalysis.final_recommendation.confidence_score * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <div 
                    className="bg-[#c77dff] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${aiAnalysis.final_recommendation.confidence_score * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm">
                  {aiAnalysis.final_recommendation.rationale}
                </p>
              </div>
            </div>

            {/* AI Summary */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">AI Summary</h4>
              </div>
              <MarkdownRenderer content={aiAnalysis.summary} />
            </div>

            {/* Risk Assessment */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-500">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">Risk Assessment</h4>
              </div>
              <MarkdownRenderer content={aiAnalysis.risks} />
            </div>

            {/* Voting Stats */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-500">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">Voting Statistics</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-400">For</span>
                  <span className="text-white">{(proposal.forDelegateVotes || 0).toLocaleString()} votes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-rose-400">Against</span>
                  <span className="text-white">{(proposal.againstDelegateVotes || 0).toLocaleString()} votes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Abstain</span>
                  <span className="text-white">{(proposal.abstainDelegateVotes || 0).toLocaleString()} votes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Total</span>
                  <span className="text-white">{(proposal.totalDelegateVotes || 0).toLocaleString()} votes</span>
                </div>
              </div>
            </div>

            {/* Reasoning Steps */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#c77dff]">
                  <svg className="w-3 h-3 text-[#10002b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">AI Reasoning</h4>
              </div>
              <div className="space-y-3">
                {aiAnalysis.final_recommendation.reasoning_steps.slice(0, 3).map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#c77dff] mt-2"></div>
                    <p className="text-gray-300 text-sm">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
            <p className="text-gray-400">AI Analysis not available for this proposal</p>
          </div>
        )}
      </div>
    </div>
  )
}
