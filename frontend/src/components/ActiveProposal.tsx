import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import VotingModal from './VotingModal'
import { VOTE_SUPPORT } from '../services/votingService'

interface Proposal {
  id: string
  title: string
  description: string
  subgraph: string
  forVotes: number
  againstVotes: number
  abstainVotes: number
  totalVotes: number
  endTime: string
  status: 'active' | 'passed' | 'failed'
}

interface ActiveProposalProps {
  proposal: Proposal
}

export const ActiveProposal = ({ proposal }: ActiveProposalProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      )
    }
  }, [])

  const forPercentage = (proposal.forVotes / proposal.totalVotes) * 100
  const againstPercentage = (proposal.againstVotes / proposal.totalVotes) * 100
  const abstainPercentage = (proposal.abstainVotes / proposal.totalVotes) * 100

  const handleVote = (voteType: 'for' | 'against' | 'abstain') => {
    const voteSupportMap = {
      'for': VOTE_SUPPORT.FOR,
      'against': VOTE_SUPPORT.AGAINST,
      'abstain': VOTE_SUPPORT.ABSTAIN
    };

    setVotingModal({
      isOpen: true,
      proposalId: proposal.id,
      proposalTitle: proposal.title,
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
      voteType: 0
    });
  }

  return (
    <div ref={cardRef} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Active Proposal</h3>
          <p className="text-gray-300 text-sm">Most recent subgraph proposal</p>
        </div>
        <div className="bg-eth-green text-eth-dark px-3 py-1 rounded-full text-xs font-semibold">
          {proposal.status.toUpperCase()}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-bold text-white mb-2">{proposal.title}</h4>
        <p className="text-gray-300 text-sm mb-3">{proposal.description}</p>
        <div className="flex items-center space-x-2">
          <span className="text-eth-green text-sm font-medium">{proposal.subgraph}</span>
          <span className="text-gray-400 text-xs">•</span>
          <span className="text-gray-400 text-xs">Ends {proposal.endTime}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* For Votes */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-green-400">For</span>
            <span className="text-white">{proposal.forVotes} ({forPercentage.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${forPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Against Votes */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-400">Against</span>
            <span className="text-white">{proposal.againstVotes} ({againstPercentage.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${againstPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Abstain Votes */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Abstain</span>
            <span className="text-white">{proposal.abstainVotes} ({abstainPercentage.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gray-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${abstainPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button 
          onClick={() => handleVote('for')}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Vote For
        </button>
        <button 
          onClick={() => handleVote('against')}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Vote Against
        </button>
        <button 
          onClick={() => handleVote('abstain')}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Abstain
        </button>
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
