import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface Subgraph {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'deprecated' | 'passed' | 'failed'
  queries: number
  lastUpdated: string
  category: string
}

interface SubgraphsListProps {
  subgraphs: Subgraph[]
}

export const SubgraphsList = ({ subgraphs }: SubgraphsListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSubgraphs, setFilteredSubgraphs] = useState(subgraphs)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" }
      )
    }
  }, [])

  useEffect(() => {
    const filtered = subgraphs.filter(subgraph =>
      subgraph.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subgraph.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subgraph.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredSubgraphs(filtered)
  }, [searchTerm, subgraphs])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'deprecated': return 'bg-red-500'
      case 'passed': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'defi': return 'bg-blue-500'
      case 'nft': return 'bg-purple-500'
      case 'dao': return 'bg-green-500'
      case 'gaming': return 'bg-pink-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div ref={containerRef} className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Subgraphs</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search subgraphs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-eth-green focus:bg-white/20"
            />
            <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="bg-eth-green text-eth-dark px-4 py-2 rounded-xl text-sm font-semibold hover:bg-eth-green/90 transition-colors">
            Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubgraphs.map((subgraph) => (
          <div
            key={subgraph.id}
            className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/10 hover:border-white/20"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">📊</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm">{subgraph.name}</h4>
                </div>
                <p className="text-gray-400 text-xs line-clamp-2 mb-2">{subgraph.description}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    subgraph.status === 'passed' ? 'bg-green-100 text-green-800' :
                    subgraph.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    subgraph.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {subgraph.status === 'passed' ? 'Passed' :
                     subgraph.status === 'active' ? 'Active' :
                     subgraph.status === 'failed' ? 'Failed' :
                     subgraph.status}
                  </span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-gray-400 text-xs">{subgraph.category}</span>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(subgraph.status)} ml-2`}></div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(subgraph.category)} text-white`}>
                {subgraph.category}
              </span>
              <span className="text-gray-400 text-xs">{subgraph.queries.toLocaleString()} queries</span>
            </div>

            <div className="text-xs text-gray-400 mb-3">
              Last updated: {subgraph.lastUpdated}
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-1.5 px-3 rounded-lg text-xs font-medium transition-colors">
                View
              </button>
              <button className="flex-1 bg-eth-green/20 hover:bg-eth-green/30 text-eth-dark py-1.5 px-3 rounded-lg text-xs font-medium transition-colors">
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
  )
}
