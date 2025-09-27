import os
import json
import requests
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables from config.env file
load_dotenv('config.env')

SUBGRAPH_ID = os.getenv('SUBGRAPH_ID', '7WXaWRE2GbBpmokFAnQfugpVsC61D9dfR6fHgjQFqpq5')
JWT_TOKEN = os.getenv('THEGRAPH_JWT_TOKEN')

# Configuration - adjust these limits as needed
BATCH_SIZE = 1000
MAX_RECORDS = 5000   # Maximum number of records to fetch (reduced for faster testing)
MAX_BATCHES = 5      # Maximum number of batches to process (reduced for faster testing)

if not SUBGRAPH_ID or not JWT_TOKEN:
    raise ValueError("SUBGRAPH_ID and THEGRAPH_JWT_TOKEN must be set in .env file")

# Construct the Gateway endpoint using JWT token
endpoint = f"https://gateway.thegraph.com/api/subgraphs/id/{SUBGRAPH_ID}"

headers = {
    "Authorization": f"Bearer {JWT_TOKEN}",
    "Content-Type": "application/json"
}

# Initial query to inspect schema
introspection_query = """
{
  __schema {
    queryType {
      fields {
        name
      }
    }
  }
}
"""

try:
    response = requests.post(endpoint, json={'query': introspection_query}, headers=headers)
    response.raise_for_status()
    data = response.json()

    if 'errors' in data:
        raise Exception(f"GraphQL errors: {data['errors']}")

    available_entities = [field['name'] for field in data['data']['__schema']['queryType']['fields']]
    print(f"Available entities: {available_entities}")

    # Determine the correct entity for voting power
    if 'delegates' in available_entities:
        query_entity = 'delegates'
        field_name = 'delegatedVotes'
    elif 'delegateVotingPowerChanges' in available_entities:
        query_entity = 'delegateVotingPowerChanges'
        field_name = 'newBalance'
    else:
        raise Exception("No supported voting power entity found in schema")

except requests.exceptions.HTTPError as http_err:
    print(f"HTTP error occurred: {http_err}")
    data = response.json() if 'response' in locals() else {}
    if 'errors' in data:
        print(f"GraphQL errors: {data['errors']}")
    raise
except Exception as e:
    print(f"An error occurred: {e}")
    raise

# Fetch relevant data with reasonable limits
all_records = []
skip = 0
batch_count = 0

print(f"Starting data fetch with limits: max {MAX_RECORDS:,} records, max {MAX_BATCHES} batches")
print(f"Batch size: {BATCH_SIZE} records per batch\n")

while batch_count < MAX_BATCHES and len(all_records) < MAX_RECORDS:
    current_query = f"""
    {{
      {query_entity}(first: {BATCH_SIZE}, skip: {skip}) {{
        id
        {field_name}
      }}
    }}
    """
    response = requests.post(endpoint, json={'query': current_query}, headers=headers)
    response.raise_for_status()
    data = response.json()
    
    if 'errors' in data:
        raise Exception(f"GraphQL errors: {data['errors']}")
    
    records = data.get('data', {}).get(query_entity, [])
    if not records:
        print("No more records found, stopping...")
        break
    
    all_records.extend(records)
    skip += BATCH_SIZE
    batch_count += 1
    
    print(f"Batch {batch_count}: Fetched {len(records)} records, total so far: {len(all_records)}")
    
    # Stop if we've reached our limits
    if len(all_records) >= MAX_RECORDS:
        print(f"Reached maximum record limit ({MAX_RECORDS:,}), stopping...")
        break
    elif batch_count >= MAX_BATCHES:
        print(f"Reached maximum batch limit ({MAX_BATCHES}), stopping...")
        break

# Calculate total delegated voting power
total_voting_power = sum(float(record.get(field_name, 0)) for record in all_records)

# Save to JSON file
result = {
    "totalDelegatedVotingPower": total_voting_power,
    "numberOfRecords": len(all_records),
    "batchesProcessed": batch_count,
    "maxRecordsLimit": MAX_RECORDS,
    "maxBatchesLimit": MAX_BATCHES,
    "fetchedAt": datetime.utcnow().isoformat() + "Z"
}

with open('total_delegated_voting_power.json', 'w') as f:
    json.dump(result, f, indent=4)

print(f"\n=== SUMMARY ===")
print(f"Total Delegated Voting Power: {total_voting_power:,.2f}")
print(f"Number of Records Processed: {len(all_records):,}")
print(f"Batches Processed: {batch_count}")
print(f"Saved to total_delegated_voting_power.json")