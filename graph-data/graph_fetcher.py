import os
import json
import requests
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv()

def get_subgraph_name(url):
    # """Extract subgraph name from URL for filename"""
    parsed = urlparse(url)
    path_parts = parsed.path.strip('/').split('/')
    if 'name' in path_parts:
        name_index = path_parts.index('name')
        if name_index + 1 < len(path_parts):
            return path_parts[name_index + 1]
    return 'subgraph'

def fetch_proposals():
    # """Fetch proposals from GraphQL subgraph"""
    api_key = os.getenv('API_KEY')
    subgraph_id = os.getenv('SUBGRAPH_ID')
    proposals_count = int(os.getenv('PROPOSALS_COUNT', 10))
    
    if not api_key or not subgraph_id:
        raise ValueError("API_KEY and SUBGRAPH_ID must be set in environment variables")
    
    # Construct the full subgraph URL
    subgraph_url = f"https://gateway-arbitrum.network.thegraph.com/api/{api_key}/subgraphs/id/{subgraph_id}"
    
    query = """
    {
      proposals(first: %d, orderBy: creationTime, orderDirection: desc) {
        id
        description
        proposer {
          id
          delegatedVotesRaw
          delegatedVotes
          tokenHoldersRepresentedAmount
          numberVotes
        }
        state
        quorumVotes
        creationTime
        state
        votes(first: 1000) {
            id
            voter {
                id
                delegatedVotesRaw
                delegatedVotes
            }
            weight
            choice
            reason
        }
        abstainDelegateVotes
        abstainWeightedVotes
        againstDelegateVotes
        againstWeightedVotes
        forDelegateVotes
        forWeightedVotes
        delegatesAtStart
        governanceFramework {
          quorumVotes
          votingPeriod
        }
        quorumVotes
        totalDelegateVotes
        totalWeightedVotes
        values
        }
    }
    """ % proposals_count
    
    headers = {
        'Content-Type': 'application/json',
    }
    
    payload = {
        'query': query
    }
    
    try:
        response = requests.post(subgraph_url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        if 'errors' in data:
            raise Exception(f"GraphQL errors: {data['errors']}")
            
        return data.get('data', {}).get('proposals', [])
    
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {str(e)}")

def filter_active_proposals(proposals):
    # """Filter proposals to only include active ones (not executed or cancelled)"""
    active_states = ['pending', 'active', 'queued']  # Common active states
    return [
        proposal for proposal in proposals 
        if proposal.get('state', '').lower() not in ['executed', 'cancelled', 'defeated']
    ]

def save_proposals_to_json(proposals, filename_prefix):
    # """Save proposals to JSON files in data/ folder (relative to project root)"""
    # Ensure data directory exists relative to project root
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    os.makedirs(data_dir, exist_ok=True)
    
    # Save all proposals
    all_filename = os.path.join(data_dir, f"{filename_prefix}_all_proposals.json")
    with open(all_filename, 'w', encoding='utf-8') as f:
        json.dump(proposals, f, indent=2, ensure_ascii=False)
    
    # Filter and save active proposals
    active_proposals = filter_active_proposals(proposals)
    active_filename = os.path.join(data_dir, f"{filename_prefix}_active_proposals.json")
    with open(active_filename, 'w', encoding='utf-8') as f:
        json.dump(active_proposals, f, indent=2, ensure_ascii=False)
    
    return {
        'all_proposals_file': all_filename,
        'active_proposals_file': active_filename,
        'total_proposals': len(proposals),
        'active_proposals': len(active_proposals)
    }
