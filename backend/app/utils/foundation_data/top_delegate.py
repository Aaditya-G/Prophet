import os
import requests
from dotenv import load_dotenv
from typing import Dict, Any, List, Optional


load_dotenv('config.env')

class DuneAnalyticsService:
    """
    Service class to interact with the Dune Analytics API, fetching and 
    processing specific query results.
    """
    
    QUERY_ID: str = os.getenv('DUNE_DELEGATES_QUERY_ID', '5858070')
    DUNE_API_URL: str = "https://api.dune.com/api/v1/query/"
    LIMIT: int = 1000
    
    def __init__(self):
        
        self.api_key: Optional[str] = os.getenv('DUNE_API_KEY') 
        
        if not self.api_key:
            raise ValueError("DUNE_API_KEY environment variable must be set for DuneAnalyticsService.")
        
        self.headers: Dict[str, str] = {"X-Dune-API-Key": self.api_key}
        
        self.endpoint: str = f"{self.DUNE_API_URL}{self.QUERY_ID}/results?limit={self.LIMIT}"

    def get_top_delegate_sum_metric(self) -> Dict[str, Any]:
        """
        Fetches results from the Dune query, calculates the sum of the top 3 
        delegate voting amounts (divided by 10^9), and returns the metric.

        Returns:
            Dict[str, Any]: On success, returns {"divided_value": float}. 
                            On failure, returns {"error": str, "status": int}.
        """
        try:
            
            response = requests.get(self.endpoint, headers=self.headers, timeout=30)
            response.raise_for_status()
            data = response.json()
            
            rows: List[Dict[str, Any]] = data.get('result', {}).get('rows', [])
            
            
            top_3_rows = rows[:3]
            
            delegate_values: List[float] = []
            for row in top_3_rows:
                
                for value in row.values():
                    if isinstance(value, (int, float)) and value > 0:
                        delegate_values.append(float(value))
                        break
            
            if not delegate_values:
                
                return {"error": "Dune query returned data but failed to extract valid numeric delegate amounts.", "status": 404}
            
            total_sum = sum(delegate_values)
            
            divided_value = total_sum / (10**9)
            
            
            return {"divided_value": divided_value}
            
        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code if e.response is not None else 500
            return {"error": f"HTTP Error fetching Dune data: {e}", "status": status_code}
        except requests.exceptions.RequestException as e:
            return {"error": f"API request failed (connection/timeout): {e}", "status": 503}
        except Exception as e:
            return {"error": f"Error processing Dune data: {str(e)}", "status": 500}


try:
    dune_analytics_service = DuneAnalyticsService()
except ValueError as e:
    
    class FailedDuneAnalyticsService:
        def get_top_delegate_sum_metric(self) -> Dict[str, Any]:
            return {"error": f"Dune service initialization failed: {str(e)}", "status": 500}
    dune_analytics_service = FailedDuneAnalyticsService()
