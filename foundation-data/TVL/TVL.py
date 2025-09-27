import requests
import json
from datetime import datetime, timedelta
from collections import defaultdict
import sys

def fetch_treasury_data(url="https://api.llama.fi/treasury/Uniswap"):
    """Fetch treasury data from DeFi Llama API with error handling."""
    try:
        print("Fetching treasury data...")
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

def explore_json_structure(data, max_depth=3, current_depth=0):
    """Recursively explore JSON structure to find relevant keys."""
    if current_depth >= max_depth:
        return
    
    if isinstance(data, dict):
        for key, value in data.items():
            print("  " * current_depth + f"Key: '{key}' -> Type: {type(value).__name__}")
            if isinstance(value, list) and len(value) > 0:
                print("  " * current_depth + f"  List length: {len(value)}")
                print("  " * current_depth + f"  First item type: {type(value[0]).__name__}")
                if isinstance(value[0], dict):
                    print("  " * current_depth + f"  First item keys: {list(value[0].keys())}")
            elif isinstance(value, dict):
                explore_json_structure(value, max_depth, current_depth + 1)
    elif isinstance(data, list) and len(data) > 0:
        print("  " * current_depth + f"List with {len(data)} items")
        print("  " * current_depth + f"First item type: {type(data[0]).__name__}")
        if isinstance(data[0], dict):
            print("  " * current_depth + f"First item keys: {list(data[0].keys())}")

def find_tvl_data(data):
    """
    Automatically detect the correct key containing TVL data.
    Looks for arrays with objects containing date and TVL-like fields.
    """
    candidates = []
    
    def search_recursive(obj, path=""):
        if isinstance(obj, dict):
            for key, value in obj.items():
                current_path = f"{path}.{key}" if path else key
                if isinstance(value, list) and len(value) > 0:
                    # Check if this looks like TVL data
                    first_item = value[0]
                    if isinstance(first_item, dict):
                        keys = set(first_item.keys())
                        # Look for date and TVL-like keys
                        date_keys = {'date', 'timestamp', 'time'}
                        tvl_keys = {'totalLiquidityUSD', 'tvl', 'totalValueLocked', 'usdValue'}
                        
                        has_date = bool(keys & date_keys)
                        has_tvl = bool(keys & tvl_keys)
                        
                        if has_date and has_tvl:
                            date_key = next(iter(keys & date_keys))
                            tvl_key = next(iter(keys & tvl_keys))
                            candidates.append({
                                'path': current_path,
                                'data': value,
                                'date_key': date_key,
                                'tvl_key': tvl_key,
                                'length': len(value)
                            })
                elif isinstance(value, dict):
                    search_recursive(value, current_path)
    
    search_recursive(data)
    
    # Return the candidate with the most data points
    if candidates:
        best_candidate = max(candidates, key=lambda x: x['length'])
        print(f"Found TVL data at path: {best_candidate['path']}")
        print(f"Date key: {best_candidate['date_key']}, TVL key: {best_candidate['tvl_key']}")
        print(f"Data points: {best_candidate['length']}")
        return best_candidate
    
    return None

def parse_date(date_str):
    """Parse date string in various formats."""
    formats = [
        "%Y-%m-%d",
        "%Y-%m-%dT%H:%M:%S.%fZ",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%d %H:%M:%S",
        "%d/%m/%Y",
        "%m/%d/%Y"
    ]
    
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt).date()
        except ValueError:
            continue
    
    # Try parsing as timestamp
    try:
        return datetime.fromtimestamp(float(date_str)).date()
    except (ValueError, TypeError):
        pass
    
    raise ValueError(f"Unable to parse date: {date_str}")

def calculate_weekly_slopes(tvl_data, date_key, tvl_key):
    """Calculate weekly TVL slopes from daily data."""
    print("Processing TVL data...")
    
    # Parse and sort data by date
    parsed_data = []
    for entry in tvl_data:
        try:
            date = parse_date(str(entry[date_key]))
            tvl = float(entry[tvl_key]) if entry[tvl_key] is not None else 0.0
            parsed_data.append((date, tvl))
        except (ValueError, KeyError, TypeError) as e:
            print(f"Skipping invalid entry: {e}")
            continue
    
    if not parsed_data:
        print("No valid data found!")
        return []
    
    # Sort by date
    parsed_data.sort(key=lambda x: x[0])
    print(f"Processed {len(parsed_data)} valid data points")
    print(f"Date range: {parsed_data[0][0]} to {parsed_data[-1][0]}")
    
    # Group by week
    weekly_data = defaultdict(list)
    for date, tvl in parsed_data:
        # Get Monday of the week (ISO week)
        monday = date - timedelta(days=date.weekday())
        weekly_data[monday].append((date, tvl))
    
    # Calculate slopes for each week
    weekly_slopes = []
    for week_start, week_data in sorted(weekly_data.items()):
        if len(week_data) < 2:
            continue  # Need at least 2 points to calculate slope
        
        # Sort week data by date
        week_data.sort(key=lambda x: x[0])
        
        first_date, first_tvl = week_data[0]
        last_date, last_tvl = week_data[-1]
        
        # Calculate slope (TVL change per day)
        days_diff = (last_date - first_date).days
        if days_diff > 0:
            slope = (last_tvl - first_tvl) / days_diff
        else:
            slope = 0.0
        
        weekly_slopes.append({
            "week_start": week_start.strftime("%Y-%m-%d"),
            "week_end": last_date.strftime("%Y-%m-%d"),
            "tvl_slope_usd_per_day": round(slope, 2),
            "data_points": len(week_data),
            "start_tvl": round(first_tvl, 2),
            "end_tvl": round(last_tvl, 2)
        })
    
    return weekly_slopes

def save_results(weekly_slopes, filename="uniswap_weekly_tvl_slopes.json"):
    """Save results to JSON file."""
    try:
        with open(filename, 'w') as f:
            json.dump(weekly_slopes, f, indent=2)
        print(f"Results saved to {filename}")
        
        # Print summary
        if weekly_slopes:
            print(f"\nSummary:")
            print(f"Total weeks analyzed: {len(weekly_slopes)}")
            print(f"Average slope: {sum(w['tvl_slope_usd_per_day'] for w in weekly_slopes) / len(weekly_slopes):,.2f} USD/day")
            
            # Show first few entries
            print(f"\nFirst 3 entries:")
            for entry in weekly_slopes[:3]:
                print(f"  {entry['week_start']} to {entry['week_end']}: {entry['tvl_slope_usd_per_day']:,.2f} USD/day")
    except IOError as e:
        print(f"Error saving file: {e}")

def main():
    """Main execution function."""
    print("Uniswap Treasury Data Analyzer")
    print("=" * 40)
    
    # Fetch data
    data = fetch_treasury_data()
    if data is None:
        sys.exit(1)
    
    print("\nAPI Response Structure:")
    print("-" * 25)
    explore_json_structure(data)
    
    # Find TVL data
    print(f"\nSearching for TVL data...")
    print("-" * 25)
    tvl_info = find_tvl_data(data)
    
    if tvl_info is None:
        print("Could not find TVL data in the API response!")
        print("Please check the API response structure manually.")
        sys.exit(1)
    
    # Calculate weekly slopes
    print(f"\nCalculating weekly slopes...")
    print("-" * 25)
    weekly_slopes = calculate_weekly_slopes(
        tvl_info['data'], 
        tvl_info['date_key'], 
        tvl_info['tvl_key']
    )
    
    if not weekly_slopes:
        print("No weekly slopes calculated!")
        sys.exit(1)
    
    # Save results
    print(f"\nSaving results...")
    print("-" * 15)
    save_results(weekly_slopes)
    
    print(f"\nAnalysis complete!")

if __name__ == "__main__":
    main()