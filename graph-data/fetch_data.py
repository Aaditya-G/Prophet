import os
import json
import requests
from dotenv import load_dotenv
from urllib.parse import urlparse

def get_subgraph_name(url):
    #Extract subgraph name from URL for filename
    parsed = urlparse(url)
    path_parts = parsed.path.strip('/').split('/')
    if 'name' in path_parts:
        name_index = path_parts.index('name')
        if name_index + 1 < len(path_parts):
            return path_parts[name_index + 1]
    return 'subgraph'

def fetch_proposals():
    # Fetch proposals from GraphQL subgraph
    api_key = os.getenv('API_KEY')
    subgraph_id = os.getenv('SUBGRAPH_ID')
    proposals_count = int(os.getenv('PROPOSALS_COUNT', 10))
    
    if not api_key or not subgraph_id:
        raise ValueError("API_KEY and SUBGRAPH_ID must be set in environment variables")
    subgraph_url = f"https://gateway-arbitrum.network.thegraph.com/api/{api_key}/subgraphs/id/{subgraph_id}"
    
    print(f"Fetching {proposals_count} proposals from: {subgraph_url}")
    
    # GraphQL query
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
            
        proposals = data.get('data', {}).get('proposals', [])
        print(f"Successfully fetched {len(proposals)} proposals")
        return proposals
    
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {str(e)}")

def filter_active_proposals(proposals):
    #Filter proposals to only include active ones (not executed or cancelled)
    inactive_states = ['executed', 'cancelled', 'defeated']
    active_proposals = [
        proposal for proposal in proposals 
        if proposal.get('state', '').lower() not in inactive_states
    ]
    print(f"Filtered to {len(active_proposals)} active proposals (excluding executed/cancelled/defeated)")
    return active_proposals

def save_proposals_to_json(proposals, filename_prefix):
    #Save proposals to JSON files in data/ folder (relative to project root)
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    os.makedirs(data_dir, exist_ok=True)
    
    # Save all proposals
    all_filename = os.path.join(data_dir, f"{filename_prefix}_all_proposals.json")
    with open(all_filename, 'w', encoding='utf-8') as f:
        json.dump(proposals, f, indent=2, ensure_ascii=False)
    print(f"Saved all proposals to: {all_filename}")
    
    # Filter and save active proposals
    active_proposals = filter_active_proposals(proposals)
    active_filename = os.path.join(data_dir, f"{filename_prefix}_active_proposals.json")
    with open(active_filename, 'w', encoding='utf-8') as f:
        json.dump(active_proposals, f, indent=2, ensure_ascii=False)
    print(f"Saved active proposals to: {active_filename}")
    
    return {
        'all_proposals_file': all_filename,
        'active_proposals_file': active_filename,
        'total_proposals': len(proposals),
        'active_proposals': len(active_proposals)
    }

def main():
    load_dotenv()
    
    try:
        print("=== DAO Proposal Fetcher ===")
        
        # Fetch proposals from subgraph
        proposals = fetch_proposals()
        
        if not proposals:
            print("No proposals found!")
            return
        
        # Get subgraph name for filename
        subgraph_id = os.getenv('SUBGRAPH_ID', 'subgraph')
        subgraph_name = subgraph_id
        print(f"Using filename prefix: {subgraph_name}")
        
        # Save proposals to JSON files
        result = save_proposals_to_json(proposals, subgraph_name)
        
        print("\n=== Summary ===")
        print(f"Total proposals fetched: {result['total_proposals']}")
        print(f"Active proposals: {result['active_proposals']}")
        print(f"Files saved in 'data/' folder:")
        print(f"  - {result['all_proposals_file']}")
        print(f"  - {result['active_proposals_file']}")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
