import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { MarkdownRenderer } from '../../../components/MarkdownRenderer'
import type { BackendProposal } from '../types'
import type { AnalysisResult } from '../../../services/analysisApi'

interface AIAnalysisProps {
  proposal: BackendProposal | null
  onClose: () => void
  onRefresh?: () => void
  // New props for live analysis
  constitution: string
  onConstitutionChange: (value: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
  analysisResult: AnalysisResult | null
}

export const AIAnalysis = ({
  proposal,
  onClose,
  onRefresh,
  constitution,
  onConstitutionChange,
  onAnalyze,
  isAnalyzing,
  analysisResult
}: AIAnalysisProps) => {
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
      {/* Header (no change) */}
      <div className="flex items-center justify-between mb-6">
        {/* ... */}
      </div>

      {/* Proposal Summary (no change) */}
      <div className="mb-8">
        {/* ... */}
      </div>

      {/* --- AI Analysis Interaction Section --- */}
      <div className="space-y-6">
        
        {/* Constitution Input */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
          <label htmlFor="constitution" className="block text-lg font-semibold text-white mb-3">
            Constitution
          </label>
          <textarea
            id="constitution"
            value={constitution}
            onChange={(e) => onConstitutionChange(e.target.value)}
            placeholder="Enter the constitution for the AI to follow..."
            className="w-full h-24 px-4 py-2 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(199, 125, 255, 0.2)'
            }}
            disabled={isAnalyzing}
          />
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="mt-4 w-full px-4 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            style={{ backgroundColor: '#c77dff', color: '#10002b' }}
          >
            {isAnalyzing ? 'Analyzing...' : 'Get AI Analysis'}
          </button>
        </div>

        {/* Results Section */}
        {isAnalyzing && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e0aaff]"></div>
            <span className="ml-3 text-gray-400">Fetching AI analysis...</span>
          </div>
        )}

        {analysisResult && (
          <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(197, 255, 74, 0.1)' }}>
             <h4 className="text-lg font-semibold text-white mb-4">Analysis Result</h4>
             <pre className="text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto">
               {JSON.stringify(analysisResult, null, 2)}
             </pre>
          </div>
        )}
      </div>
    </div>
  )
}