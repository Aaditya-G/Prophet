# Uniswap Governance Data Fetcher

import logging
from typing import Dict, Any, List, Optional
from .base_fetcher import BaseDataFetcher

logger = logging.getLogger(__name__)

class UniswapGovernanceFetcher(BaseDataFetcher):
    """Data fetcher for Uniswap governance data from The Graph"""
    
    def __init__(self):
        # Uniswap governance subgraph URL
        subgraph_url = "https://api.thegraph.com/subgraphs/name/uniswap/governance"
        super().__init__(subgraph_url)
    
    def fetch_data(self, query: str, variables: Dict[str, Any] = None) -> Dict[str, Any]:
        """Fetch governance data from Uniswap subgraph"""
        return self.execute_query(query, variables)
    
    def get_proposals(self, first: int = 10, skip: int = 0) -> Dict[str, Any]:
        """Fetch recent governance proposals"""
        query = """
        query GetProposals($first: Int!, $skip: Int!) {
            proposals(first: $first, skip: $skip, orderBy: startBlock, orderDirection: desc) {
                id
                title
                description
                status
                startBlock
                endBlock
                executionETA
                forVotes
                againstVotes
                abstainVotes
                proposer {
                    id
                }
                targets
                values
                signatures
                calldatas
            }
        }
        """
        
        variables = {
            'first': first,
            'skip': skip
        }
        
        logger.info(f"Fetching {first} proposals starting from {skip}")
        return self.fetch_data(query, variables)
    
    def get_proposal_by_id(self, proposal_id: str) -> Dict[str, Any]:
        """Fetch a specific proposal by ID"""
        query = """
        query GetProposal($id: String!) {
            proposal(id: $id) {
                id
                title
                description
                status
                startBlock
                endBlock
                executionETA
                forVotes
                againstVotes
                abstainVotes
                proposer {
                    id
                }
                targets
                values
                signatures
                calldatas
                votes {
                    id
                    voter {
                        id
                    }
                    support
                    votes
                    reason
                }
            }
        }
        """
        
        variables = {'id': proposal_id}
        
        logger.info(f"Fetching proposal {proposal_id}")
        return self.fetch_data(query, variables)
    
    def get_delegates(self, first: int = 10, skip: int = 0) -> Dict[str, Any]:
        """Fetch governance delegates"""
        query = """
        query GetDelegates($first: Int!, $skip: Int!) {
            delegates(first: $first, skip: $skip, orderBy: delegatedVotes, orderDirection: desc) {
                id
                delegatedVotes
                tokenHoldersRepresentedAmount
                votes {
                    id
                    support
                    votes
                    proposal {
                        id
                        title
                    }
                }
            }
        }
        """
        
        variables = {
            'first': first,
            'skip': skip
        }
        
        logger.info(f"Fetching {first} delegates starting from {skip}")
        return self.fetch_data(query, variables)
    
    def get_voting_power(self, address: str) -> Dict[str, Any]:
        """Get voting power for a specific address"""
        query = """
        query GetVotingPower($address: String!) {
            delegate(id: $address) {
                id
                delegatedVotes
                tokenHoldersRepresentedAmount
            }
            governance(id: "GOVERNANCE") {
                totalSupply
            }
        }
        """
        
        variables = {'address': address.lower()}
        
        logger.info(f"Fetching voting power for {address}")
        return self.fetch_data(query, variables)
