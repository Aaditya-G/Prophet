import os
import json
import requests
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def fetch_and_process_delegates():
    api_key = os.getenv('API_KEY')
    if not api_key:
        print("Error: API_KEY environment variable is not set")
        return None
    
    # API endpoint
    url = "https://api.dune.com/api/v1/query/5858070/results?limit=1000"
    headers = {"X-Dune-API-Key": api_key}
    
    try:
        # Make API call
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        # Extract top 3 delegates
        rows = data.get('result', {}).get('rows', [])
        top_3_rows = rows[:3]
        
        # Find the numeric value in each row (looking for delegate amounts)
        delegate_values = []
        for row in top_3_rows:
            for key, value in row.items():
                if isinstance(value, (int, float)) and value > 0:
                    delegate_values.append(value)
                    break
        
        # Calculate sum and divide by 10^9
        total_sum = sum(delegate_values)
        divided_value = total_sum / (10**9)
        
        # Create result object
        result = {
            "top_3_delegates_values": delegate_values,
            "sum": total_sum,
            "divided_by_10e10": divided_value,
            "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        }
        
        # Save to JSON file
        with open('delegates_result.json', 'w') as f:
            json.dump(result, f, indent=2)
        
        # Display result
        print(f"Top 3 delegates sum: {total_sum}")
        print(f"Divided by 10^10: {divided_value}")
        print("Result saved to delegates_result.json")
        
        return result
        
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON parsing failed: {e}")
        return None
    except Exception as e:
        print(f"Error processing data: {e}")
        return None

if __name__ == "__main__":
    fetch_and_process_delegates()