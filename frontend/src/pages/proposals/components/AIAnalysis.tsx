import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { MarkdownRenderer } from '../../../components/MarkdownRenderer'
import type { BackendProposal } from '../types'
import type { AIAnalysisData } from '../../../services/api'

// Fallback AI Analysis Data
const FALLBACK_AI_ANALYSIS: AIAnalysisData = {
  proposal_id: "10",
  summary: "Authorize Uniswap Labs to deploy Uniswap v3 to Polygon PoS. Polygon offers $20M in incentives:\nKPI: User base growth, higher user activity, higher revenue.\nBudget: $20M (up to $15M for liquidity mining, up to $5M for adoption).\nDuration: Long-term (for liquidity mining).",
  risks: "As a conservative governance risk analyst, I've reviewed the proposal to deploy Uniswap v3 to Polygon PoS, considering the full context and current DAO health metrics. Here are up to 5 specific risks:\n\n1.  **Risk of Liquidity Mining Dependency and \"Vampire Attack\" Vulnerability:**\n    *   **Severity:** Medium\n    *   **Justification:** The proposal relies heavily on a $15M long-term liquidity mining campaign from Polygon. While this can bootstrap initial activity, it creates a dependency. If these incentives cease or are reduced, there's a risk of liquidity providers migrating to other platforms offering better yields, potentially leading to a \"vampire attack\" where a competitor with stronger incentives draws away Uniswap's liquidity and users on Polygon. This is particularly relevant given the DAO's high treasury runway, suggesting a preference for sustainable, organic growth over potentially fleeting incentivized activity.\n\n2.  **Dilution of Core Ethereum L1 Focus and Brand:**\n    *   **Severity:** Medium\n    *   **Justification:** While Polygon is \"Ethereum-aligned,\" deploying to a PoS sidechain, even with incentives, could dilute Uniswap's primary focus and brand identity as the leading DEX on Ethereum L1. This expansion, while offering user growth, might spread development and community resources thin, potentially impacting the core product's evolution or perceived value, especially if the Polygon deployment doesn't achieve the projected revenue or user activity.\n\n3.  **Increased Operational Complexity and Support Burden:**\n    *   **Severity:** Low\n    *   **Justification:** Deploying to a new chain, even a battle-tested one like Polygon PoS, introduces additional operational complexity for Uniswap Labs and the DAO. This includes managing smart contract deployments, monitoring, potential bug fixes specific to the Polygon environment, and providing user support across multiple chains. While Uniswap Labs is authorized to deploy, the long-term support and maintenance burden will ultimately fall on the Uniswap ecosystem, potentially diverting resources from other strategic initiatives.\n\n4.  **Uncertainty of Long-Term Revenue Generation for Uniswap DAO:**\n    *   **Severity:** Medium\n    *   **Justification:** The proposal highlights \"higher revenue\" as a benefit, but the specifics of how this translates to direct revenue for the Uniswap DAO (e.g., through protocol fees) are not explicitly detailed. While increased user activity and TVL on Polygon are positive, the current Uniswap v3 model primarily benefits LPs. Without a clear mechanism for the DAO to capture significant value from this expansion, the $20M in incentives, while not directly from Uniswap's treasury, represents a significant investment of Polygon's capital that needs to yield tangible, sustainable benefits for the Uniswap protocol and its governance.\n\n5.  **Governance Concentration Risk (Indirect):**\n    *   **Severity:** Low\n    *   **Justification:** The DAO health metrics show a high governance concentration, with the top 3 delegates holding 86% of the voting power. While this proposal passed with overwhelming support, the rapid expansion to new chains, especially those with significant external incentives, could, in future, lead to proposals that are heavily influenced by a few large stakeholders who might prioritize short-term growth or specific chain interests over the long-term, decentralized health of the Uniswap protocol. This proposal itself, while seemingly beneficial, sets a precedent for external incentives driving deployment decisions, which could be leveraged by concentrated power in the future.",
  final_recommendation: {
    recommendation: "FOR",
    rationale: "The proposal offers significant growth potential and external funding, outweighing identified risks which are manageable or indirect.",
    confidence_score: 0.85,
    reasoning_steps: [
      "Analyze the proposal summary to understand the core objective, incentives, and KPIs.",
      "Review each identified risk, assessing its severity and justification in the context of the proposal and DAO health.",
      "Evaluate Risk 1 (Liquidity Mining Dependency): Acknowledge the dependency but note the $15M incentive is external, reducing direct DAO treasury risk. The 'vampire attack' is a general market risk, not unique to this deployment. The long-term nature of incentives mitigates short-term volatility.",
      "Evaluate Risk 2 (Dilution of Core Focus): Recognize the potential for dilution but weigh it against the benefit of expanding market share and user base. Polygon is Ethereum-aligned, lessening the brand conflict. The 'medium' severity is noted but not prohibitive.",
      "Evaluate Risk 3 (Increased Operational Complexity): Acknowledge the increased burden but note its 'low' severity. Uniswap Labs is authorized to deploy, implying they have assessed their capacity. This is a standard cost of expansion.",
      "Evaluate Risk 4 (Uncertainty of Long-Term Revenue): Identify this as a valid concern regarding direct DAO revenue. However, 'higher revenue' for the protocol (LPs) is a stated KPI, which indirectly benefits the ecosystem. The $20M is external, so the DAO isn't directly funding this risk. Future governance can address fee capture.",
      "Evaluate Risk 5 (Governance Concentration Risk): Acknowledge the 'low' severity and indirect nature. This risk is more about the general state of DAO governance and less about the specific merits of this proposal. The proposal itself passed with overwhelming support, indicating broad consensus despite concentration.",
      "Synthesize the overall impact of the risks: Most risks are either low severity, manageable, or relate to broader market/governance dynamics rather than fundamental flaws in the deployment itself. The primary benefit of external funding ($20M) and potential user/activity growth is substantial.",
      "Formulate a recommendation: The benefits of significant external incentives and potential growth on a major L2 outweigh the identified, mostly manageable, risks. The DAO is not directly funding the incentives, reducing financial risk.",
      "Determine confidence: Acknowledge that while risks exist, the overall strategic benefit and external funding make this a net positive, leading to a 'FOR' recommendation. Confidence is set to 0.85, implying a strong, objective assessment with high confidence in the recommendation."
    ]
  },
  classifier_probability: 0.85,
  stats: {},
  context: "Uniswap v3 deployment to Polygon PoS with $20M incentives"
}

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
        {(() => {
          // Use fallback data if no real AI analysis is available
          const analysisData = aiAnalysis || FALLBACK_AI_ANALYSIS;
          
          return (
            <>
              {/* AI Recommendation */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    analysisData.final_recommendation.recommendation === 'FOR' ? 'bg-emerald-500' :
                    analysisData.final_recommendation.recommendation === 'AGAINST' ? 'bg-rose-500' :
                    'bg-gray-500'
                  }`}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {analysisData.final_recommendation.recommendation === 'FOR' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : analysisData.final_recommendation.recommendation === 'AGAINST' ? (
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
                      analysisData.final_recommendation.recommendation === 'FOR' ? 'text-emerald-400' :
                      analysisData.final_recommendation.recommendation === 'AGAINST' ? 'text-rose-400' :
                      'text-gray-400'
                    }`}>
                      {analysisData.final_recommendation.recommendation}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Confidence</span>
                    <span className="text-white font-semibold">{(analysisData.final_recommendation.confidence_score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div 
                      className="bg-[#c77dff] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${analysisData.final_recommendation.confidence_score * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {analysisData.final_recommendation.rationale}
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
                <MarkdownRenderer content={analysisData.summary} />
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
                <MarkdownRenderer content={analysisData.risks} />
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
                    <span className="text-white">
                      {aiAnalysis ? (proposal.forDelegateVotes || 0).toLocaleString() : '74'} votes
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-rose-400">Against</span>
                    <span className="text-white">
                      {aiAnalysis ? (proposal.againstDelegateVotes || 0).toLocaleString() : '4'} votes
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Abstain</span>
                    <span className="text-white">
                      {aiAnalysis ? (proposal.abstainDelegateVotes || 0).toLocaleString() : '0'} votes
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Total</span>
                    <span className="text-white">
                      {aiAnalysis ? (proposal.totalDelegateVotes || 0).toLocaleString() : '75'} votes
                    </span>
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
                  {analysisData.final_recommendation.reasoning_steps.slice(0, 3).map((step, index) => (
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
          );
        })()}
      </div>
    </div>
  )
}
