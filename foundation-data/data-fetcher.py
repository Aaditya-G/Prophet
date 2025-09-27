import os
import json
import time
from datetime import datetime, timedelta
from dotenv import load_dotenv
from thegraph_simple_api import TheGraphSimpleAPI, format_timestamp

# Load environment variables
load_dotenv('.env')

class UniswapDataFetcher:
    """
    Fetches large amounts of Uniswap data for AI training purposes
    """
    
    def __init__(self):
        """Initialize the data fetcher"""
        try:
            self.api = TheGraphSimpleAPI()
            print("Data fetcher initialized successfully")
        except ValueError as e:
            print(f"Failed to initialize: {e}")
            exit(1)
        
        # Create data directory
        self.data_dir = "uniswap_data"
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
        
        # Time ranges for data collection
        self.time_ranges = {
            "1_week": 7 * 24 * 60 * 60,      # 1 week
            "1_month": 30 * 24 * 60 * 60,    # 1 month
            "3_months": 90 * 24 * 60 * 60,   # 3 months
            "6_months": 180 * 24 * 60 * 60,  # 6 months
            "1_year": 365 * 24 * 60 * 60,    # 1 year
        }
    
    def fetch_transfer_events(self, time_range: str = "1_month", max_pages: int = 50):
        """
        Fetch transfer events data
        
        Args:
            time_range: Time range to fetch data for
            max_pages: Maximum number of pages to fetch
        """
        print(f"\nFetching transfer events for {time_range}...")
        
        end_time = int(time.time())
        start_time = end_time - self.time_ranges[time_range]
        
        all_transfers = []
        page = 1
        
        while page <= max_pages:
            print(f"  Fetching page {page}...")
            
            try:
                transfers = self.api.get_transfer_events(
                    network_id="mainnet",
                    start_time=start_time,
                    end_time=end_time,
                    limit=1000,  # Maximum limit
                    page=page
                )
                
                if transfers.get('data') and len(transfers['data']) > 0:
                    all_transfers.extend(transfers['data'])
                    print(f"    Found {len(transfers['data'])} transfers")
                    page += 1
                else:
                    print(f"    No more data found")
                    break
                    
                # Rate limiting
                time.sleep(0.5)
                
            except Exception as e:
                print(f"    Error on page {page}: {e}")
                break
        
        # Save to JSON
        filename = f"{self.data_dir}/transfer_events_{time_range}_{len(all_transfers)}_records.json"
        with open(filename, 'w') as f:
            json.dump({
                "metadata": {
                    "time_range": time_range,
                    "start_time": start_time,
                    "end_time": end_time,
                    "start_date": format_timestamp(start_time),
                    "end_date": format_timestamp(end_time),
                    "total_records": len(all_transfers),
                    "fetched_at": datetime.now().isoformat()
                },
                "data": all_transfers
            }, f, indent=2)
        
        print(f"Saved {len(all_transfers)} transfer events to {filename}")
        
        # Create transfers summary
        self._create_transfers_summary(all_transfers, time_range)
        
        return all_transfers
    
    def fetch_swap_events(self, time_range: str = "1_month", max_pages: int = 50):
        """
        Fetch swap events data
        
        Args:
            time_range: Time range to fetch data for
            max_pages: Maximum number of pages to fetch
        """
        print(f"\nFetching swap events for {time_range}...")
        
        end_time = int(time.time())
        start_time = end_time - self.time_ranges[time_range]
        
        all_swaps = []
        page = 1
        
        while page <= max_pages:
            print(f"  Fetching page {page}...")
            
            try:
                swaps = self.api.get_swap_events(
                    network_id="mainnet",
                    start_time=start_time,
                    end_time=end_time,
                    limit=1000,  # Maximum limit
                    page=page
                )
                
                if swaps.get('data') and len(swaps['data']) > 0:
                    all_swaps.extend(swaps['data'])
                    print(f"    Found {len(swaps['data'])} swaps")
                    page += 1
                else:
                    print(f"    No more data found")
                    break
                    
                # Rate limiting
                time.sleep(0.5)
                
            except Exception as e:
                print(f"    Error on page {page}: {e}")
                break
        
        # Save to JSON
        filename = f"{self.data_dir}/swap_events_{time_range}_{len(all_swaps)}_records.json"
        with open(filename, 'w') as f:
            json.dump({
                "metadata": {
                    "time_range": time_range,
                    "start_time": start_time,
                    "end_time": end_time,
                    "start_date": format_timestamp(start_time),
                    "end_date": format_timestamp(end_time),
                    "total_records": len(all_swaps),
                    "fetched_at": datetime.now().isoformat()
                },
                "data": all_swaps
            }, f, indent=2)
        
        print(f"Saved {len(all_swaps)} swap events to {filename}")
        
        # Create swaps summary
        self._create_swaps_summary(all_swaps, time_range)
        
        return all_swaps