import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface Proposal {
  id: string
  title: string
  subgraph: string
  status: 'active' | 'passed' | 'failed'
  votes: number
  endTime: string
}

interface RecentProposalsProps {
  proposals: Proposal[]
}

export const RecentProposals = ({ proposals }: RecentProposalsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
      )
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500'
      case 'passed': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div ref={containerRef} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Proposals</h3>
        <button className="text-eth-green hover:text-eth-green/80 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal, index) => (
          <div 
            key={proposal.id}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium text-sm">{proposal.title}</h4>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(proposal.status)}`}></div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{proposal.subgraph}</span>
              <span>{proposal.votes} votes</span>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Ends {proposal.endTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
