import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useWallet } from '../../hooks/useWallet'
import { useProposals } from '../../hooks/useProposals'
import { StaggeredMenu } from '../../components/StaggeredMenu'
import Silk from '../../components/Silk'
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from '../../components/StaggeredMenu'
import { ActiveProposals } from './components/ActiveProposals'
import { AllProposals } from './components/AllProposals'
import { AIAnalysis } from './components/AIAnalysis'
import type { BackendProposal } from './types'
import type { AIAnalysisData } from '../../services/api'

interface ProposalsPageProps {
  onSectionChange?: (section: string) => void
}

export const ProposalsPage = ({ onSectionChange }: ProposalsPageProps) => {
  const proposalsRef = useRef<HTMLDivElement>(null)
  const { address, formatAddress, disconnectWallet } = useWallet()
  const { refreshData } = useProposals(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProposal, setSelectedProposal] = useState<BackendProposal | null>(null)
  const [selectedAIAnalysis, setSelectedAIAnalysis] = useState<AIAnalysisData | undefined>(undefined)
  const [isAnalysisMode, setIsAnalysisMode] = useState(false)

  // Menu items for StaggeredMenu
  const menuItems: StaggeredMenuItem[] = [
    { label: 'Home', ariaLabel: 'Go to Home page', link: '#home', onClick: () => { console.log('Home clicked'); onSectionChange?.('home') } },
    { label: 'Proposals', ariaLabel: 'View all Proposals', link: '#proposals', onClick: () => { console.log('Proposals clicked'); onSectionChange?.('proposals') } },
    { label: 'FAQ', ariaLabel: 'View FAQ', link: '#faq', onClick: () => { console.log('FAQ clicked'); onSectionChange?.('faq') } },
    { label: 'Markets', ariaLabel: 'View Markets', link: '#markets', onClick: () => { console.log('Markets clicked'); onSectionChange?.('markets') } },
    { label: 'Profile', ariaLabel: 'View Profile', link: '#profile', onClick: () => { console.log('Profile clicked'); onSectionChange?.('profile') } }
  ]

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'Discord', link: 'https://discord.com' },
    { label: 'GitHub', link: 'https://github.com' }
  ]

  const handleShowAIAnalysis = (proposal: BackendProposal, aiAnalysis?: AIAnalysisData) => {
    setSelectedProposal(proposal)
    setSelectedAIAnalysis(aiAnalysis)
    
    // Create morphing animation timeline
    const tl = gsap.timeline()
    
    // Animate the main container to prepare for split layout
    tl.to(proposalsRef.current, {
      duration: 0.3,
      ease: "power2.out",
      scale: 0.98,
      onComplete: () => {
        setIsAnalysisMode(true)
      }
    })
    
    // Animate back to normal scale after layout change
    tl.to(proposalsRef.current, {
      duration: 0.3,
      ease: "power2.out",
      scale: 1
    })
  }

  const handleCloseAnalysis = () => {
    // Create closing animation timeline
    const tl = gsap.timeline()
    
    // Animate the main container
    tl.to(proposalsRef.current, {
      duration: 0.3,
      ease: "power2.out",
      scale: 0.98,
      onComplete: () => {
        setIsAnalysisMode(false)
        setSelectedProposal(null)
        setSelectedAIAnalysis(undefined)
      }
    })
    
    // Animate back to normal scale
    tl.to(proposalsRef.current, {
      duration: 0.3,
      ease: "power2.out",
      scale: 1
    })
  }

  const handleRefreshAIAnalysis = async () => {
    try {
      await refreshData()
    } catch (error) {
      console.error('Failed to refresh AI analysis:', error)
    }
  }

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

      {/* Soft glow background accents (purple theme) */
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

        }{/* StaggeredMenu */}
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

      {/* Main Content */}
      <div className="px-6 py-4 relative z-20">
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
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

            {/* Wallet Address */}
            {address && (
              <div className="flex items-center space-x-3">
                <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#c77dff', color: '#10002b' }}>
                  {formatAddress(address)}
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            )}
            
            {/* Disconnect Button */}
            <button
              onClick={disconnectWallet}
              className="px-4 py-2 rounded-xl font-semibold transition-colors duration-200"
              style={{ backgroundColor: '#ef4444', color: 'white' }}
            >
              Disconnect
            </button>
            
            {/* Refresh Data Button */}
            <button
              onClick={handleRefreshAIAnalysis}
              className="px-4 py-2 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2"
              style={{ backgroundColor: '#c77dff', color: '#10002b' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Page Header */}
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

            {/* Split Layout Container */}
            <div 
              className={`grid-transition ${
                isAnalysisMode 
                  ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' 
                  : 'block'
              }`}
            >
              
              {/* Left Side - Active Proposals */}
              <div 
                className={`transition-all duration-600 ease-in-out ${
                  isAnalysisMode ? 'lg:col-span-1' : 'w-full'
                }`}
                style={{
                  transform: isAnalysisMode ? 'translateX(0)' : 'translateX(0)',
                  opacity: 1
                }}
              >
                <div className="mb-8">
                  <ActiveProposals 
                    searchTerm={searchTerm} 
                    onShowAIAnalysis={handleShowAIAnalysis}
                    isAnalysisMode={isAnalysisMode}
                  />
                </div>

                {/* All Proposals Section - Only show when not in analysis mode */}
                {!isAnalysisMode && (
                  <div>
                    <AllProposals searchTerm={searchTerm} />
                  </div>
                )}
              </div>

              {/* Right Side - AI Analysis */}
              {isAnalysisMode && selectedProposal && (
                <div className="lg:col-span-1 ai-panel-enter">
                  <AIAnalysis 
                    proposal={selectedProposal} 
                    aiAnalysis={selectedAIAnalysis}
                    onClose={handleCloseAnalysis}
                    onRefresh={handleRefreshAIAnalysis}
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
