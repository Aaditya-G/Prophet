import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useProposals } from '../../hooks/useProposals'
import { StaggeredMenu } from '../../components/StaggeredMenu'
import Silk from '../../components/Silk'
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from '../../components/StaggeredMenu'
import { ActiveProposals } from './components/ActiveProposals'
import { AllProposals } from './components/AllProposals'
import { AIAnalysis } from './components/AIAnalysis'
import { analysisAPI } from '../../services/analysisApi'
import type { Proposal } from '../../services/api' // Use the main Proposal type
import type { AnalysisResult } from '../../services/analysisApi'

interface ProposalsPageProps {
  onSectionChange?: (section: string) => void
}

export const ProposalsPage = ({ onSectionChange }: ProposalsPageProps) => {
  const proposalsRef = useRef<HTMLDivElement>(null)
  const { allProposals, activeProposal, loading, isError } = useProposals()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null) // Changed to Proposal type
  
  const [constitution, setConstitution] = useState('Be fair and unbiased.')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  
  const [isAnalysisMode, setIsAnalysisMode] = useState(false)

  const menuItems: StaggeredMenuItem[] = [
    { label: 'Home', ariaLabel: 'Go to Home page', link: '#home', onClick: () => { onSectionChange?.('home') } },
    { label: 'Proposals', ariaLabel: 'View all Proposals', link: '#proposals', onClick: () => { onSectionChange?.('proposals') } },
    { label: 'FAQ', ariaLabel: 'View FAQ', link: '#faq', onClick: () => { onSectionChange?.('faq') } },
    { label: 'Markets', ariaLabel: 'View Markets', link: '#markets', onClick: () => { onSectionChange?.('markets') } },
    { label: 'Profile', ariaLabel: 'View Profile', link: '#profile', onClick: () => { onSectionChange?.('profile') } }
  ]

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'Discord', link: 'https://discord.com' },
    { label: 'GitHub', link: 'https://github.com' }
  ]

  const handleShowAIAnalysis = (proposal: Proposal) => { // Changed to Proposal type
    setSelectedProposal(proposal)
    setAnalysisResult(null)
    
    const tl = gsap.timeline()
    tl.to(proposalsRef.current, {
      duration: 0.3,
      ease: "power2.out",
      scale: 0.98,
      onComplete: () => setIsAnalysisMode(true)
    })
    tl.to(proposalsRef.current, { duration: 0.3, ease: "power2.out", scale: 1 })
  }

  const handleCloseAnalysis = () => {
    const tl = gsap.timeline()
    tl.to(proposalsRef.current, {
      duration: 0.3,
      ease: "power2.out",
      scale: 0.98,
      onComplete: () => {
        setIsAnalysisMode(false)
        setSelectedProposal(null)
        setAnalysisResult(null)
      }
    })
    tl.to(proposalsRef.current, { duration: 0.3, ease: "power2.out", scale: 1 })
  }
  
  const handleTriggerAnalysis = async () => {
    if (!selectedProposal) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analysisAPI.analyzeProposal({
        proposal_id: selectedProposal.id,
        constitution: constitution,
      });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Failed to get AI analysis:', error);
      setAnalysisResult({ error: (error as Error).message });
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (proposalsRef.current) {
      gsap.fromTo(proposalsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }
  }, [])

  return (
    <div ref={proposalsRef} className="min-h-screen relative overflow-x-hidden morph-container" style={{ backgroundColor: '#10002b' }}>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <Silk
          speed={1.8}
          scale={0.3}
          color="#5a189a"
          noiseIntensity={0.1}
          rotation={0}
        />
        <div
          style={{
            position: 'absolute',
            width: '60vw',
            height: '60vw',
            left: '-10vw',
            top: '-10vw',
            background: 'radial-gradient(closest-side, rgba(199,125,255,0.25), rgba(199,125,255,0) 70%)',
            filter: 'blur(80px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '55vw',
            height: '55vw',
            right: '-5vw',
            bottom: '-10vw',
            background: 'radial-gradient(closest-side, rgba(199,125,255,0.20), rgba(199,125,255,0) 70%)',
            filter: 'blur(90px)'
          }}
        />
      </div>
       <StaggeredMenu
        position="left"
        colors={['#10002b', '#c77dff']}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#c77dff"
        openMenuButtonColor="#c77dff"
        accentColor="#c77dff"
        changeMenuColorOnOpen={false}
      />
      
      <div className="px-6 py-4 relative z-20">
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none w-64"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(199, 125, 255, 0.2)'
                }}
              />
              <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.5)', backgroundColor: 'transparent' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12V7z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 3v4h4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white">Proposals</h1>
              </div>
              <p className="text-gray-300 text-lg">
                View and manage all subgraph proposals. Track active voting and review historical decisions.
              </p>
            </div>
            
            <div className={`grid-transition ${isAnalysisMode ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'block'}`}>
              <div className={`transition-all duration-600 ease-in-out ${isAnalysisMode ? 'lg:col-span-1' : 'w-full'}`} style={{ transform: 'translateX(0)', opacity: 1 }}>
                <div className="mb-8">
                  <ActiveProposals 
                    searchTerm={searchTerm} 
                    onShowAIAnalysis={handleShowAIAnalysis}
                    isAnalysisMode={isAnalysisMode}
                    activeProposal={activeProposal}
                    loading={loading}
                    isError={isError}
                  />
                </div>
                {!isAnalysisMode && (
                  <div>
                    <AllProposals 
                      searchTerm={searchTerm} 
                      allProposals={allProposals}
                      loading={loading}
                      isError={isError}
                    />
                  </div>
                )}
              </div>

              {isAnalysisMode && selectedProposal && (
                <div className="lg:col-span-1 ai-panel-enter">
                  <AIAnalysis 
                    proposal={selectedProposal} 
                    onClose={handleCloseAnalysis}
                    constitution={constitution}
                    onConstitutionChange={setConstitution}
                    onAnalyze={handleTriggerAnalysis}
                    isAnalyzing={isAnalyzing}
                    analysisResult={analysisResult}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}