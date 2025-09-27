import os
import requests
from dotenv import load_dotenv
from typing import List, Dict, Optional, Any
from datetime import datetime


load_dotenv('.env')

class SubgraphService:
    """
    Service class to interact with The Graph's subgraph endpoint, handling
    configuration, GraphQL queries, pagination, and calculation of total
    delegated voting power.
    """
    
    BATCH_SIZE = 1000
    MAX_RECORDS = 5000 
    MAX_BATCHES = 5

    def __init__(self):
        self.subgraph_id: Optional[str] = os.getenv('SUBGRAPH_ID')
        self.jwt_token: Optional[str] = os.getenv('THEGRAPH_JWT_TOKEN')

        if not self.subgraph_id or not self.jwt_token:
            raise ValueError("SUBGRAPH_ID and THEGRAPH_JWT_TOKEN must be set in the environment or 'config.env' file.")

        self.endpoint: str = f"https://gateway.thegraph.com/api/subgraphs/id/{self.subgraph_id}"
        self.headers: Dict[str, str] = {
            "Authorization": f"Bearer {self.jwt_token}",
            "Content-Type": "application/json"
        }
        
    def _execute_query(self, query: str) -> Dict[str, Any]:
        """Executes a GraphQL query against The Graph endpoint."""
        
        response = requests.post(self.endpoint, json={'query': query}, headers=self.headers, timeout=30)
        response.raise_for_status()
        data = response.json()

        if 'errors' in data:
            error_message = f"GraphQL errors: {data['errors']}"
            raise Exception(error_message)

        return data

    def _get_query_entity_and_field(self) -> tuple[str, str]:
        """Performs introspection to determine the correct entity and voting power field."""
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
        data = self._execute_query(introspection_query)
        available_entities = [field['name'] for field in data.get('data', {}).get('__schema', {}).get('queryType', {}).get('fields', [])]

        if 'delegates' in available_entities:
            return 'delegates', 'delegatedVotes'
        elif 'delegateVotingPowerChanges' in available_entities:
            return 'delegateVotingPowerChanges', 'newBalance'
        else:
            raise Exception("No supported voting power entity ('delegates' or 'delegateVotingPowerChanges') found in subgraph schema.")

    def _fetch_all_records(self, query_entity: str, field_name: str) -> List[Dict[str, Any]]:
        """Handles pagination to fetch records up to MAX_RECORDS/MAX_BATCHES limits."""
        all_records: List[Dict[str, Any]] = []
        skip: int = 0
        batch_count: int = 0

        while batch_count < self.MAX_BATCHES and len(all_records) < self.MAX_RECORDS:
            current_query = f"""
            {{
              {query_entity}(first: {self.BATCH_SIZE}, skip: {skip}) {{
                id
                {field_name}
              }}
            }}
            """
            
            data = self._execute_query(current_query)
            records = data.get('data', {}).get(query_entity, [])

            if not records:
                break
            
            all_records.extend(records)
            skip += self.BATCH_SIZE
            batch_count += 1
            
            if len(all_records) >= self.MAX_RECORDS or batch_count >= self.MAX_BATCHES:
                break

        return all_records

    def get_total_voting_power(self) -> Dict[str, Any]:
        """
        Calculates the total delegated voting power from the subgraph.
        Returns a dictionary containing only the total power on success, 
        or an error payload dictionary on failure.
        """
        try:
            query_entity, field_name = self._get_query_entity_and_field()
            records = self._fetch_all_records(query_entity, field_name)
            
            total_voting_power: float = sum(float(record.get(field_name, 0)) for record in records)
            return {
                "totalDelegatedVotingPower": total_voting_power,
            }

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code if e.response is not None else 500
            return {"error": f"HTTP Error fetching subgraph data: {e}", "status": status_code}
        except Exception as e:
            return {"error": f"Failed to retrieve voting power data: {str(e)}", "status": 500}


try:
    subgraph_service = SubgraphService()
except ValueError as e:
    
    class FailedSubgraphService:
        def get_total_voting_power(self) -> Dict[str, Any]:
            return {"error": f"Subgraph service initialization failed: {str(e)}", "status": 500}
    subgraph_service = FailedSubgraphService()
