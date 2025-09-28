import { useState, useMemo } from 'react'
import { ProposalDetails } from './ProposalDetails'
import { MarkdownRenderer } from '../../../components/MarkdownRenderer'
import type { SortOption, FilterOption } from '../types'
import type { Proposer, Vote } from '../../../services/api' // Assuming these types are also in api

// Adhering to the provided 'Proposal' type structure under the name 'BackendProposal' as used in this component
export interface BackendProposal {
  id: string;
  description: string;
  creation_time: string | null;
  quorum_votes: number | null;
  proposer: Proposer;
  state: string;
  votes: Vote[];
  abstain_delegate_votes?: number | null;
  against_delegate_votes?: number | null;
  for_delegate_votes?: number | null;
  total_delegate_votes?: number | null;
}

interface AllProposalsProps {
  searchTerm: string
  allProposals: BackendProposal[]
  loading: boolean
  isError: boolean
}

export const AllProposals = ({ searchTerm, allProposals, loading, isError }: AllProposalsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [selectedProposal, setSelectedProposal] = useState<BackendProposal | null>(null)

  const sortedProposals = useMemo(() => {
    if (!allProposals) {
      return []
    }

    // Inlined utility functions to remove dependency on proposalUtils
    const extractTitle = (description: string): string => {
      const lines = description.split('\n');
      const firstLine = lines[0].trim();
      if (firstLine.startsWith('#')) {
        return firstLine.replace(/^#+\s*/, '').trim();
      }
      return firstLine.length > 60 ? firstLine.substring(0, 60) + '...' : firstLine;
    };

    const determineCategory = (description: string): string => {
      const desc = description.toLowerCase();
      if (desc.includes('defi') || desc.includes('uniswap') || desc.includes('aave')) return 'DeFi';
      if (desc.includes('nft') || desc.includes('opensea')) return 'NFT';
      if (desc.includes('dao') || desc.includes('governance')) return 'DAO';
      if (desc.includes('gaming') || desc.includes('game')) return 'Gaming';
      if (desc.includes('infrastructure')) return 'Infrastructure';
      return 'General';
    };

    const processedProposals = allProposals.map(proposal => {
      const creationDate = proposal.creation_time ? new Date(proposal.creation_time) : null;
      return {
        id: proposal.id,
        title: extractTitle(proposal.description),
        description: proposal.description,
        subgraph: 'Uniswap Governance', // Hardcoded as per original util
        status: proposal.state.toLowerCase(),
        category: determineCategory(proposal.description),
        votes: proposal.total_delegate_votes ?? 0,
        endTime: creationDate ? creationDate.toLocaleDateString() : 'N/A',
        creationTimestamp: creationDate ? creationDate.getTime() : 0,
      };
    });

    const filtered = processedProposals.filter(proposal => {
      const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           proposal.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterBy === 'all' || proposal.status.toLowerCase() === filterBy
      
      return matchesSearch && matchesFilter
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes
        case 'oldest':
          return a.creationTimestamp - b.creationTimestamp
        case 'newest':
        default:
          return b.creationTimestamp - a.creationTimestamp
      }
    });
  }, [allProposals, searchTerm, filterBy, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return { backgroundColor: 'rgba(199, 125, 255, 0.2)', color: '#c77dff' }
      case 'passed': return { backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }
      case 'failed': return { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }
      default: return { backgroundColor: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'defi': return 'bg-green-500'
      case 'nft': return 'bg-purple-500'
      case 'dao': return 'bg-blue-500'
      case 'gaming': return 'bg-pink-500'
      case 'infrastructure': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const handleCreateProposal = () => {
    console.log('Create new proposal')
  }

  const handleViewDetails = (proposalId: string) => {
    const backendProposal = allProposals.find(p => p.id === proposalId)
    if (backendProposal) {
      setSelectedProposal(backendProposal)
    }
  }

  const handleCloseDetails = () => {
    setSelectedProposal(null)
  }

  if (loading) {
    return (
      <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c77dff]"></div>
        </div>
      </div>
    )
  }

  if (isError && allProposals.length === 0) {
    return (
      <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading proposals. Displaying fallback data.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(197, 255, 74, 0.2)' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.5)', backgroundColor: 'transparent' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12h18M3 6h12M3 18h6" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">All Proposals</h3>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl text-white text-sm focus:outline-none"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(197, 255, 74, 0.2)'
            }}
          >
            <option value="all" style={{ backgroundColor: '#10002b', color: 'white' }}>All Status</option>
            <option value="active" style={{ backgroundColor: '#10002b', color: 'white' }}>Active</option>
            <option value="passed" style={{ backgroundColor: '#10002b', color: 'white' }}>Passed</option>
            <option value="failed" style={{ backgroundColor: '#10002b', color: 'white' }}>Failed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl text-white text-sm focus:outline-none"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(197, 255, 74, 0.2)'
            }}
          >
            <option value="newest" style={{ backgroundColor: '#10002b', color: 'white' }}>Newest First</option>
            <option value="oldest" style={{ backgroundColor: '#10002b', color: 'white' }}>Oldest First</option>
            <option value="votes" style={{ backgroundColor: '#10002b', color: 'white' }}>Most Votes</option>
          </select>

          <button 
            onClick={handleCreateProposal}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors" 
            style={{ backgroundColor: '#c77dff', color: '#10002b' }}
          >
            Create Proposal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedProposals.map((proposal) => (
          <div 
            key={proposal.id}
            className="rounded-2xl p-4 transition-all duration-200 cursor-pointer hover:scale-105 flex flex-col h-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(197, 255, 74, 0.1)' }}
          >
            <div className="flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-white font-semibold text-sm">{proposal.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(proposal.category)} text-white`}>
                      {proposal.category}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs mb-2 overflow-hidden">
                    <MarkdownRenderer content={proposal.description} maxLength={100} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold truncate max-w-[120px]" style={{ backgroundColor: '#c77dff', color: '#10002b' }}>
                      {proposal.subgraph}
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{proposal.votes.toLocaleString()} votes</span>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-semibold" style={getStatusColor(proposal.status)}>
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <span>{proposal.endTime}</span>
                <div className={`w-2 h-2 rounded-full ${
                  proposal.status === 'active' ? 'bg-green-500' :
                  proposal.status === 'passed' ? 'bg-green-500' :
                  'bg-red-500'
                }`}></div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewDetails(proposal.id)}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors hover:bg-white/20" 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                >
                  View Details
                </button>
                {proposal.status === 'active' && (
                  <button className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors" style={{ backgroundColor: 'rgba(199, 125, 255, 0.2)', color: '#c77dff' }}>
                    Vote
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedProposals.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-400">No proposals found matching your search and filters.</p>
        </div>
      )}

      {selectedProposal && (
        <ProposalDetails
          proposal={selectedProposal}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  )
}