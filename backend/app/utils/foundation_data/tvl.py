import requests
from datetime import datetime, timedelta
from collections import defaultdict
from typing import Dict, Any, List, Optional, Tuple

class LlamaTvlAnalyzer:
    """
    Utility class to analyze Total Value Locked (TVL) data, typically from 
    DeFi Llama, and calculate weekly growth slopes (rate of change).
    This service is configured for the Uniswap treasury endpoint.
    """
    
    DEFAULT_API_URL: str = "https://api.llama.fi/treasury/Uniswap"

    def __init__(self, api_url: str = DEFAULT_API_URL):
        """Initializes the analyzer with the target API URL."""
        self.api_url = api_url

    def _fetch_data(self) -> Optional[Dict[str, Any]]:
        """Fetch treasury data from DeFi Llama API with error handling."""
        try:
            response = requests.get(self.api_url, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            
            print(f"Error fetching DeFi Llama data from {self.api_url}: {e}")
            return None

    def _parse_date(self, date_str: str) -> datetime.date:
        """Parse date string/timestamp in various common formats."""
        formats = [
            "%Y-%m-%d",
            "%Y-%m-%dT%H:%M:%S.%fZ",
            "%Y-%m-%dT%H:%M:%SZ",
            "%Y-%m-%d %H:%M:%S",
        ]
        
        for fmt in formats:
            try:
                return datetime.strptime(date_str, fmt).date()
            except ValueError:
                continue
        
        
        try:
            
            timestamp = int(float(date_str))
            return datetime.fromtimestamp(timestamp).date()
        except (ValueError, TypeError):
            pass
        
        raise ValueError(f"Unable to parse date: {date_str}")

    def _find_tvl_data(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Recursively detect the correct key containing TVL time-series data.
        Looks for arrays with objects containing date/timestamp and TVL-like fields.
        """
        candidates: List[Dict[str, Any]] = []
        
        def search_recursive(obj, path=""):
            if isinstance(obj, dict):
                for key, value in obj.items():
                    current_path = f"{path}.{key}" if path else key
                    if isinstance(value, list) and len(value) > 0:
                        first_item = value[0]
                        if isinstance(first_item, dict):
                            keys = set(first_item.keys())
                            date_keys = {'date', 'timestamp', 'time'}
                            tvl_keys = {'totalLiquidityUSD', 'tvl', 'totalValueLocked', 'usdValue', 'currentVal'}
                            
                            has_date = bool(keys & date_keys)
                            has_tvl = bool(keys & tvl_keys)
                            
                            
                            if has_date and has_tvl and len(value) > 30:
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
        
        
        if candidates:
            return max(candidates, key=lambda x: x['length'])
        
        return None

    def _calculate_slopes(self, tvl_info: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Calculates weekly TVL slopes from daily data."""
        tvl_data = tvl_info['data']
        date_key = tvl_info['date_key']
        tvl_key = tvl_info['tvl_key']
        
        
        parsed_data: List[Tuple[datetime.date, float]] = []
        for entry in tvl_data:
            try:
                date = self._parse_date(str(entry[date_key]))
                tvl = float(entry[tvl_key]) if entry[tvl_key] is not None else 0.0
                parsed_data.append((date, tvl))
            except (ValueError, KeyError, TypeError):
                continue
        
        if len(parsed_data) < 7: 
            return []
        
        parsed_data.sort(key=lambda x: x[0])
        
        
        weekly_data: Dict[datetime.date, List[Tuple[datetime.date, float]]] = defaultdict(list)
        for date, tvl in parsed_data:
            
            monday = date - timedelta(days=date.weekday())
            weekly_data[monday].append((date, tvl))
        
        
        weekly_slopes: List[Dict[str, Any]] = []
        for week_start, week_data in sorted(weekly_data.items()):
            if len(week_data) < 2:
                continue
            
            week_data.sort(key=lambda x: x[0])
            
            first_date, first_tvl = week_data[0]
            last_date, last_tvl = week_data[-1]
            
            days_diff = (last_date - first_date).days
            
            
            slope = (last_tvl - first_tvl) / days_diff if days_diff > 0 else 0.0
            
            weekly_slopes.append({
                "week_start": week_start.strftime("%Y-%m-%d"),
                "tvl_slope_usd_per_day": round(slope, 2),
                "start_tvl": round(first_tvl, 2),
                "end_tvl": round(last_tvl, 2)
            })
        
        return weekly_slopes

    def get_weekly_tvl_slopes(self) -> Dict[str, Any]:
        """
        Orchestrates the TVL analysis, fetching data and calculating weekly slopes.
        Returns the structured analysis results.
        """
        data = self._fetch_data()
        if data is None:
            return {"error": "Failed to fetch data from DeFi Llama API.", "status": 503}
        
        tvl_info = self._find_tvl_data(data)
        if tvl_info is None:
            return {"error": "Could not locate TVL time-series data within the API response structure.", "status": 500}
        
        weekly_slopes = self._calculate_slopes(tvl_info)
        
        if not weekly_slopes:
            return {"error": "Not enough data points found to calculate weekly slopes.", "status": 500}

        
        total_weeks = len(weekly_slopes)
        total_slope = sum(w['tvl_slope_usd_per_day'] for w in weekly_slopes)
        
        return {
            "average_weekly_slope_usd_per_day": round(total_slope / total_weeks, 2) if total_weeks > 0 else 0.0
        }


llama_tvl_analyzer = LlamaTvlAnalyzer()
