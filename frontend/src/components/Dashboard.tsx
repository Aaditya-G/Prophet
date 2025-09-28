import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useWallet } from '../hooks/useWallet'
import { useProposals } from '../hooks/useProposals'
import { formatVotes as formatVotesFromUtils } from '../utils/proposalUtils'
import { StaggeredMenu } from './StaggeredMenu'
import VotingModal from './VotingModal'
import { VOTE_SUPPORT, type VoteSupport } from '../services/votingService'
import Silk from './Silk'
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu'
import type { Proposal } from '../services/api'
import { mockSubgraphs } from '../const'

interface DashboardProps {
  onSectionChange?: (section: string) => void
}

export const Dashboard = ({ onSectionChange }: DashboardProps) => {
  const dashboardRef = useRef<HTMLDivElement>(null)
  const { address, formatAddress, disconnectWallet } = useWallet()
  const { allProposals, activeProposal, loading, isError } = useProposals()
  const [searchTerm, setSearchTerm] = useState('')
  const [votingModal, setVotingModal] = useState<{
    isOpen: boolean;
    proposalId: string;
    proposalTitle: string;
    voteType: VoteSupport;
  }>({
    isOpen: false,
    proposalId: '',
    proposalTitle: '',
    voteType: VOTE_SUPPORT.AGAINST
  })

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

  useEffect(() => {
    if (dashboardRef.current) {
      gsap.fromTo(dashboardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }
  }, [])

  // Helper functions

  const formatVotes = (votes: string) => {
    return formatVotesFromUtils(votes).toLocaleString()
  }

  const cleanDescription = (description: string) => {
    // Handle undefined or null descriptions
    if (!description || typeof description !== 'string') {
      return 'No description available'
    }
    
    // Remove image markdown and other formatting
    const cleaned = description
      .replace(/\[<img[^>]*\/>.*?\]\([^)]*\)/g, '') // Remove image markdown
      .replace(/\[.*?\]\([^)]*\)/g, '') // Remove other markdown links
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .trim()
    
    return cleaned
  }

  const extractTitle = (description: string) => {
    const cleaned = cleanDescription(description)
    const lines = cleaned.split('\n').filter(line => line.trim().length > 0)
    const title = lines[0] || 'Proposal'
    // Remove # from the beginning if it exists and get first few words
    const cleanTitle = title.replace(/^#+\s*/, '')
    return getFirstWords(cleanTitle, 6) // Show first 6 words
  }

  const extractShortDescription = (description: string) => {
    const cleaned = cleanDescription(description)
    const lines = cleaned.split('\n').filter(line => line.trim().length > 0)
    if (lines.length > 1) {
      return lines[1].substring(0, 100) + (lines[1].length > 100 ? '...' : '')
    }
    return cleaned.substring(0, 100) + (cleaned.length > 100 ? '...' : '')
  }

  const getFirstWords = (text: string, wordCount: number = 3) => {
    const words = text.split(' ').slice(0, wordCount)
    return words.join(' ')
  }

  const getMostRecentActiveProposal = (): Proposal | null => {
    return activeProposal
  }

  const getRecentProposals = (): Proposal[] => {
    if (!allProposals || allProposals.length === 0) return []
    return allProposals
  }

  const getProposalStats = () => {
    const totalProposals = allProposals?.length || 0
    const activeProposalsCount = allProposals?.filter(p => p.state === 'ACTIVE').length || 0
    const votedOnProposals = 0 // Keep as 0 as requested
    
    return { totalProposals, activeProposalsCount, votedOnProposals }
  }

  // Voting handlers
  const handleVote = (proposalId: string, voteType: 'for' | 'against' | 'abstain') => {
    const proposal = getMostRecentActiveProposal();
    if (!proposal) return;

    const voteSupportMap = {
      'for': VOTE_SUPPORT.FOR,
      'against': VOTE_SUPPORT.AGAINST,
      'abstain': VOTE_SUPPORT.ABSTAIN
    };

    setVotingModal({
      isOpen: true,
      proposalId,
      proposalTitle: extractTitle(proposal.description),
      voteType: voteSupportMap[voteType]
    });
  }

  const handleVoteSuccess = (txHash: string) => {
    console.log(`Vote successful! TX: ${txHash}`);
  }

  const closeVotingModal = () => {
    setVotingModal({
      isOpen: false,
      proposalId: '',
      proposalTitle: '',
      voteType: VOTE_SUPPORT.AGAINST
    });
  }

  const filteredSubgraphs = mockSubgraphs.filter(subgraph =>
    subgraph.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subgraph.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subgraph.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div ref={dashboardRef} className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#10002b' }}>

      {/* Soft glow background accents (purple theme) */}
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

      {/* StaggeredMenu */}
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
                placeholder="Enter your search request..."
                className="px-4 py-2 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none w-64"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(197, 255, 74, 0.2)'
                }}
              />
              <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Wallet Address */}
            {address && (
              <div className="flex items-center space-x-3">
                <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#e0aaff', color: '#10002b' }}>
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
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Proposal Section */}
              <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.5)', backgroundColor: 'transparent' }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M4 20V10M12 20V4M20 20v-7" strokeWidth={2} strokeLinecap="round" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Active Proposal</h2>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                    LIVE
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Track the current subgraph proposal progress and voting status in real-time.
                </p>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e0aaff]"></div>
                    <span className="ml-3 text-gray-400">Loading active proposal...</span>
                  </div>
                ) : isError ? (
                  <div className="text-center py-8">
                    <p className="text-red-400 mb-4">Error loading proposal data</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="px-4 py-2 rounded-xl font-semibold transition-colors" 
                      style={{ backgroundColor: '#e0aaff', color: '#10002b' }}
                    >
                      Retry
                    </button>
                  </div>
                ) : getMostRecentActiveProposal() ? (
                  (() => {
                    const proposal = getMostRecentActiveProposal()!
                    // Hardcoded vote counts
                    const forVotes = proposal.for_delegate_votes || 71;
                    const againstVotes = proposal.against_delegate_votes || 4;
                    const abstainVotes = proposal.abstain_delegate_votes || 0;
                    const totalVotes = forVotes + againstVotes + abstainVotes;
                    
                    return (
                      <>
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-white mb-2">{extractTitle(proposal.description)}</h3>
                          <p className="text-gray-300 text-xs mb-3">{extractShortDescription(proposal.description)}</p>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#c77dff', color: '#10002b' }}>
                              Uniswap Gov
                            </span>
                          </div>
                        </div>

                        {/* Voting Progress Bars */}
                        <div className="space-y-4 mb-6">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-green-400 font-medium">For</span>
                              <span className="text-white font-semibold">{forVotes} votes</span>
                            </div>
                            <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                              <div 
                                className="bg-green-500 h-full transition-all duration-500"
                                style={{ width: `${Math.min((forVotes / totalVotes) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-red-400 font-medium">Against</span>
                              <span className="text-white font-semibold">{(againstVotes.toString())} votes</span>
                            </div>
                            <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                              <div 
                                className="bg-red-500 h-full transition-all duration-500"
                                style={{ width: `${Math.min((againstVotes / totalVotes) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-400 font-medium">Abstain</span>
                              <span className="text-white font-semibold">{formatVotes(abstainVotes.toString())} votes</span>
                            </div>
                            <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                              <div 
                                className="bg-gray-500 h-full transition-all duration-500"
                                style={{ width: `${Math.min((abstainVotes / totalVotes) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleVote(proposal.id, 'for')}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
                          >
                            Vote For
                          </button>
                          <button 
                            onClick={() => handleVote(proposal.id, 'against')}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
                          >
                            Vote Against
                          </button>
                          <button 
                            onClick={() => handleVote(proposal.id, 'abstain')}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
                          >
                            Abstain
                          </button>
                        </div>
                      </>
                    )
                  })()
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No active proposals at the moment</p>
                    <p className="text-gray-500 text-sm">Check back later for new proposals</p>
                  </div>
                )}
              </div>

              {/* Recent Proposals Section */}
              <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Recent Proposals</h3>
                  <button 
                    className="font-semibold" 
                    style={{ color: '#e0aaff' }}
                    onClick={() => onSectionChange?.('proposals')}
                  >
                    See all →
                  </button>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#e0aaff]"></div>
                    <span className="ml-3 text-gray-400">Loading proposals...</span>
                  </div>
                ) : isError ? (
                  <div className="text-center py-8">
                    <p className="text-red-400">Error loading proposals</p>
                  </div>
                ) : getRecentProposals().length > 0 ? (
                  <div className="space-y-4">
                    {getRecentProposals().map((proposal) => (
                      <div 
                        key={proposal.id}
                        className="rounded-2xl p-4 transition-colors duration-200 cursor-pointer hover:bg-opacity-10"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                        onClick={() => onSectionChange?.('proposals')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.5)', backgroundColor: 'transparent' }}>
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12V7z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 3v4h4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <h4 className="text-white font-semibold">{extractTitle(proposal.description)}</h4>
                            <span className="text-gray-400 text-sm">{formatVotes(proposal.votes.reduce((acc, vote) => acc + vote.weight!, 0).toString())} votes</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            proposal.state === 'Active' ? 'text-white' :
                            proposal.state === 'Passed' ? 'bg-green-100 text-green-800' :
                            proposal.state === 'Failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`} style={proposal.state === 'Active' ? { backgroundColor: 'rgba(197, 255, 74, 0.2)' } : {}}>
                            {proposal.state}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>Uniswap Gov • {proposal.proposer.id.slice(0, 6)}...{proposal.proposer.id.slice(-4)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No recent proposals found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              {/* Let's Connect Section */}
              <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Let's Connect</h3>
                  <button className="font-semibold text-sm" style={{ color: '#e0aaff' }}>
                    See all
                  </button>
                </div>

                <div className="space-y-4">
                  {activeProposal && activeProposal.proposer ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.35)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                            <span className="text-white font-semibold text-xs">
                              {activeProposal.proposer.id.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-white">Proposer Address</p>
                            <p className="text-gray-400 text-sm font-mono">
                              {activeProposal.proposer.id.slice(0, 6)}...{activeProposal.proposer.id.slice(-4)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#e0aaff', color: '#240046' }}>
                            Active
                          </span>
                          <button className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors" style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent' }}>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M12 5v14M5 12h14" strokeWidth={2} strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {allProposals && allProposals.length > 1 && allProposals[1].proposer ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.35)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                              <span className="text-white font-semibold text-xs">
                                {allProposals[1].proposer.id.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-white">Proposer Address</p>
                              <p className="text-gray-400 text-sm font-mono">
                                {allProposals[1].proposer.id.slice(0, 6)}...{allProposals[1].proposer.id.slice(-4)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#e0aaff', color: '#240046' }}>
                              Recent
                            </span>
                            <button className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors" style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent' }}>
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 5v14M5 12h14" strokeWidth={2} strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-400 text-sm">No active proposal data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Unlock Premium Features */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Unlock Premium Features</h3>
                <p className="text-white/90 text-sm mb-4">
                  Get access to exclusive subgraph analytics and advanced proposal tools.
                </p>
                <button className="bg-white text-purple-600 hover:bg-gray-100 py-2 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2">
                  <span>Upgrade now</span>
                  <span>→</span>
                </button>
              </div>

              {/* Proposal Progress */}
              <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Proposal Progress</h3>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span className="inline-flex items-center justify-center">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="5" width="18" height="16" rx="2" ry="2" strokeWidth={2} />
                        <path d="M16 3v4M8 3v4M3 11h18" strokeWidth={2} strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-sm">{new Date().toLocaleDateString()}</span>
                    <span className="inline-flex items-center justify-center">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#e0aaff]"></div>
                    <span className="ml-3 text-gray-400">Loading stats...</span>
                  </div>
                ) : (
                  (() => {
                    const stats = getProposalStats()
                    const maxValue = Math.max(stats.totalProposals, stats.activeProposalsCount, stats.votedOnProposals)
                    
                    return (
                      <>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">All proposals</span>
                            <span className="text-2xl font-bold text-white">{stats.totalProposals}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Active proposals</span>
                            <span className="text-2xl font-bold text-white">{stats.activeProposalsCount}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Voted on</span>
                            <span className="text-2xl font-bold text-white">{stats.votedOnProposals}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex space-x-1">
                          {Array.from({ length: 20 }, (_, i) => {
                            const threshold = (i + 1) / 20
                            const totalRatio = stats.totalProposals / Math.max(maxValue, 1)
                            const activeRatio = stats.activeProposalsCount / Math.max(maxValue, 1)
                            
                            let color = 'bg-gray-800' // Default gray
                            
                            // Show theme green for active proposals, white for others
                            if (threshold <= activeRatio) {
                              color = 'bg-[#c77dff]' // Theme purple for active proposals
                            } else if (threshold <= totalRatio) {
                              color = 'bg-white' // White for all proposals
                            }
                            
                            return (
                              <div
                                key={i}
                                className={`h-8 w-2 rounded-full ${color}`}
                              ></div>
                            )
                          })}
                        </div>
                      </>
                    )
                  })()
                )}
              </div>
            </div>
          </div>

          {/* Subgraphs Section - Full Width */}
          <div className="mt-6">
            <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Subgraphs</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search subgraphs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(197, 255, 74, 0.2)'
                      }}
                    />
                    <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors" style={{ backgroundColor: '#e0aaff', color: '#240046' }}>
                    Add New
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSubgraphs.map((subgraph) => (
                  <div
                    key={subgraph.id}
                    className="rounded-2xl p-4 transition-all duration-200 cursor-pointer"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.4)' }}>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M3 12h18M3 6h12M3 18h6" strokeWidth={2} strokeLinecap="round" />
                            </svg>
                          </div>
                          <h4 className="text-white font-semibold text-sm">{subgraph.name}</h4>
                        </div>
                        <p className="text-gray-400 text-xs line-clamp-2 mb-2">{subgraph.description}</p>
                        <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        subgraph.status === 'passed' ? 'bg-green-100 text-green-800' :
                        subgraph.status === 'active' ? 'text-white' :
                        subgraph.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`} style={subgraph.status === 'active' ? { backgroundColor: 'rgba(197, 255, 74, 0.2)' } : {}}>
                            {subgraph.status === 'passed' ? 'Passed' :
                             subgraph.status === 'active' ? 'Active' :
                             subgraph.status === 'failed' ? 'Failed' :
                             subgraph.status}
                          </span>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-gray-400 text-xs">{subgraph.category}</span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        subgraph.status === 'active' ? 'bg-green-500' :
                        subgraph.status === 'paused' ? 'bg-yellow-500' :
                        subgraph.status === 'deprecated' ? 'bg-red-500' :
                        'bg-gray-500'
                      } ml-2`}></div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                        subgraph.category.toLowerCase() === 'defi' ? 'bg-green-500' :
                        subgraph.category.toLowerCase() === 'nft' ? 'bg-purple-500' :
                        subgraph.category.toLowerCase() === 'dao' ? 'bg-green-500' :
                        subgraph.category.toLowerCase() === 'gaming' ? 'bg-pink-500' :
                        'bg-gray-500'
                      }`}>
                        {subgraph.category}
                      </span>
                      <span className="text-gray-400 text-xs">{subgraph.queries.toLocaleString()} queries</span>
                    </div>

                    <div className="text-xs text-gray-400 mb-3">
                      Last updated: {subgraph.lastUpdated}
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                        View
                      </button>
                      <button className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors" style={{ backgroundColor: 'rgba(199, 125, 255, 0.2)', color: '#c77dff' }}>
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSubgraphs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No subgraphs found matching your search.</p>
                </div>
              )}
            </div>
          </div>
          </div>
        </main>
      </div>

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