import type { ActiveProposal, Proposal } from './types'

export const mockActiveProposals: ActiveProposal[] = [
  {
    id: '1',
    title: 'Uniswap V3 Subgraph Migration',
    description: 'Proposal to migrate Uniswap V3 subgraph to a new indexing infrastructure for better performance and reliability.',
    subgraph: 'uniswap-v3',
    forVotes: 1250,
    againstVotes: 320,
    abstainVotes: 80,
    totalVotes: 1650,
    endTime: '2 days',
    status: 'active',
    category: 'DeFi',
    votes: 1650
  },
  {
    id: '2',
    title: 'Aave V2 Schema Changes',
    description: 'Update Aave V2 subgraph schema to support new lending pool features and improved query efficiency.',
    subgraph: 'aave-v2',
    forVotes: 890,
    againstVotes: 156,
    abstainVotes: 45,
    totalVotes: 1091,
    endTime: '5 days',
    status: 'active',
    category: 'DeFi',
    votes: 1091
  }
]

export const mockAllProposals: Proposal[] = [
  {
    id: '3',
    title: 'Compound Protocol Updates',
    description: 'Implement new compound protocol features and update subgraph indexing logic.',
    subgraph: 'compound-v2',
    status: 'passed',
    votes: 890,
    endTime: '1 day ago',
    category: 'DeFi'
  },
  {
    id: '4',
    title: 'Curve Finance Integration',
    description: 'Add Curve Finance protocol support to the subgraph ecosystem.',
    subgraph: 'curve-finance',
    status: 'failed',
    votes: 234,
    endTime: '5 days ago',
    category: 'DeFi'
  },
  {
    id: '5',
    title: 'OpenSea NFT Marketplace',
    description: 'Create subgraph for OpenSea NFT marketplace data indexing.',
    subgraph: 'opensea',
    status: 'passed',
    votes: 567,
    endTime: '3 days ago',
    category: 'NFT'
  },
  {
    id: '6',
    title: 'ENS Domain Service',
    description: 'Implement Ethereum Name Service subgraph for decentralized domain resolution.',
    subgraph: 'ens',
    status: 'active',
    votes: 345,
    endTime: '7 days',
    category: 'DAO'
  },
  {
    id: '7',
    title: 'Axie Infinity Gaming',
    description: 'Create subgraph for Axie Infinity play-to-earn gaming platform.',
    subgraph: 'axie-infinity',
    status: 'failed',
    votes: 123,
    endTime: '10 days ago',
    category: 'Gaming'
  },
  {
    id: '8',
    title: 'MakerDAO Governance',
    description: 'Implement MakerDAO governance and voting mechanism subgraph.',
    subgraph: 'makerdao',
    status: 'passed',
    votes: 789,
    endTime: '2 days ago',
    category: 'DAO'
  },
  {
    id: '9',
    title: 'SushiSwap DEX Integration',
    description: 'Add SushiSwap decentralized exchange subgraph for trading data.',
    subgraph: 'sushiswap',
    status: 'active',
    votes: 456,
    endTime: '4 days',
    category: 'DeFi'
  },
  {
    id: '10',
    title: 'Chainlink Oracle Network',
    description: 'Implement Chainlink oracle price feed subgraph for DeFi protocols.',
    subgraph: 'chainlink',
    status: 'passed',
    votes: 678,
    endTime: '6 days ago',
    category: 'Infrastructure'
  }
]
