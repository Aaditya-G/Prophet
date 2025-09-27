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
    
    def fetch_liquidity_pools(self, max_pages: int = 20):
        """
        Fetch liquidity pools data
        
        Args:
            max_pages: Maximum number of pages to fetch
        """
        print(f"\nFetching liquidity pools...")
        
        all_pools = []
        page = 1
        
        while page <= max_pages:
            print(f"  Fetching page {page}...")
            
            try:
                pools = self.api.get_liquidity_pools(
                    network_id="mainnet",
                    limit=1000,  # Maximum limit
                    page=page
                )
                
                if pools.get('data') and len(pools['data']) > 0:
                    all_pools.extend(pools['data'])
                    print(f"    Found {len(pools['data'])} pools")
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
        filename = f"{self.data_dir}/liquidity_pools_{len(all_pools)}_records.json"
        with open(filename, 'w') as f:
            json.dump({
                "metadata": {
                    "total_records": len(all_pools),
                    "fetched_at": datetime.now().isoformat()
                },
                "data": all_pools
            }, f, indent=2)
        
        print(f"Saved {len(all_pools)} liquidity pools to {filename}")
        
        # Create pools summary
        self._create_pools_summary(all_pools)
        
        return all_pools
    
    def fetch_uniswap_v3_data(self, time_range: str = "1_month", max_pages: int = 30):
        """
        Fetch Uniswap V3 specific data (swaps and pools)
        
        Args:
            time_range: Time range to fetch data for
            max_pages: Maximum number of pages to fetch
        """
        print(f"\nFetching Uniswap V3 data for {time_range}...")
        
        end_time = int(time.time())
        start_time = end_time - self.time_ranges[time_range]
        
        # Fetch Uniswap V3 swaps
        all_uniswap_swaps = []
        page = 1
        
        while page <= max_pages:
            print(f"  Fetching Uniswap V3 swaps page {page}...")
            
            try:
                swaps = self.api.get_swap_events(
                    network_id="mainnet",
                    protocol="uniswap_v3",
                    start_time=start_time,
                    end_time=end_time,
                    limit=1000,
                    page=page
                )
                
                if swaps.get('data') and len(swaps['data']) > 0:
                    all_uniswap_swaps.extend(swaps['data'])
                    print(f"    Found {len(swaps['data'])} Uniswap V3 swaps")
                    page += 1
                else:
                    print(f"    No more Uniswap V3 data found")
                    break
                    
                time.sleep(0.5)
                
            except Exception as e:
                print(f"    Error on page {page}: {e}")
                break
        
        # Fetch Uniswap V3 pools
        all_uniswap_pools = []
        page = 1
        
        while page <= max_pages:
            print(f"  Fetching Uniswap V3 pools page {page}...")
            
            try:
                pools = self.api.get_liquidity_pools(
                    network_id="mainnet",
                    protocol="uniswap_v3",
                    limit=1000,
                    page=page
                )
                
                if pools.get('data') and len(pools['data']) > 0:
                    all_uniswap_pools.extend(pools['data'])
                    print(f"    Found {len(pools['data'])} Uniswap V3 pools")
                    page += 1
                else:
                    print(f"    No more Uniswap V3 pools found")
                    break
                    
                time.sleep(0.5)
                
            except Exception as e:
                print(f"    Error on page {page}: {e}")
                break
        
        # Save Uniswap V3 swaps
        swaps_filename = f"{self.data_dir}/uniswap_v3_swaps_{time_range}_{len(all_uniswap_swaps)}_records.json"
        with open(swaps_filename, 'w') as f:
            json.dump({
                "metadata": {
                    "protocol": "uniswap_v3",
                    "time_range": time_range,
                    "start_time": start_time,
                    "end_time": end_time,
                    "start_date": format_timestamp(start_time),
                    "end_date": format_timestamp(end_time),
                    "total_records": len(all_uniswap_swaps),
                    "fetched_at": datetime.now().isoformat()
                },
                "data": all_uniswap_swaps
            }, f, indent=2)
        
        # Save Uniswap V3 pools
        pools_filename = f"{self.data_dir}/uniswap_v3_pools_{len(all_uniswap_pools)}_records.json"
        with open(pools_filename, 'w') as f:
            json.dump({
                "metadata": {
                    "protocol": "uniswap_v3",
                    "total_records": len(all_uniswap_pools),
                    "fetched_at": datetime.now().isoformat()
                },
                "data": all_uniswap_pools
            }, f, indent=2)
        
        print(f"Saved {len(all_uniswap_swaps)} Uniswap V3 swaps to {swaps_filename}")
        print(f"Saved {len(all_uniswap_pools)} Uniswap V3 pools to {pools_filename}")
        
        # Create summaries for Uniswap V3 data
        self._create_swaps_summary(all_uniswap_swaps, time_range, "uniswap_v3")
        self._create_pools_summary(all_uniswap_pools, "uniswap_v3")
        
        return all_uniswap_swaps, all_uniswap_pools
    
    def fetch_comprehensive_dataset(self, time_range: str = "1_month"):
        """
        Fetch a comprehensive dataset for AI training
        
        Args:
            time_range: Time range to fetch data for
        """
        print(f"\nStarting comprehensive data fetch for {time_range}...")
        print("=" * 60)
        
        start_time = datetime.now()
        
        # Fetch all data types
        transfers = self.fetch_transfer_events(time_range, max_pages=30)
        swaps = self.fetch_swap_events(time_range, max_pages=30)
        pools = self.fetch_liquidity_pools(max_pages=10)
        uniswap_swaps, uniswap_pools = self.fetch_uniswap_v3_data(time_range, max_pages=20)
        
        # Create summary
        end_time = datetime.now()
        duration = end_time - start_time
        
        summary = {
            "fetch_summary": {
                "time_range": time_range,
                "start_time": start_time.isoformat(),
                "end_time": end_time.isoformat(),
                "duration_seconds": duration.total_seconds(),
                "total_records": {
                    "transfers": len(transfers),
                    "swaps": len(swaps),
                    "pools": len(pools),
                    "uniswap_v3_swaps": len(uniswap_swaps),
                    "uniswap_v3_pools": len(uniswap_pools)
                }
            }
        }
        
        # Save summary
        summary_filename = f"{self.data_dir}/fetch_summary_{time_range}_{start_time.strftime('%Y%m%d_%H%M%S')}.json"
        with open(summary_filename, 'w') as f:
            json.dump(summary, f, indent=2)
        
        print(f"\nFetch Summary:")
        print(f"   Duration: {duration.total_seconds():.2f} seconds")
        print(f"   Transfers: {len(transfers):,} records")
        print(f"   Swaps: {len(swaps):,} records")
        print(f"   Pools: {len(pools):,} records")
        print(f"   Uniswap V3 Swaps: {len(uniswap_swaps):,} records")
        print(f"   Uniswap V3 Pools: {len(uniswap_pools):,} records")
        print(f"   Summary saved to: {summary_filename}")
        
        return summary
    
    def _create_transfers_summary(self, transfers_data, time_range):
        """Create transfers summary"""
        total_transfers = len(transfers_data)
        total_value = sum(float(transfer.get('value', 0)) for transfer in transfers_data)
        
        summary = {
            "transfers_summary": {
                "total_transfers": total_transfers,
                "total_value": round(total_value, 3)
            }
        }
        
        filename = f"{self.data_dir}/transfers_summary_{time_range}_{total_transfers}_records.json"
        with open(filename, 'w') as f:
            json.dump(summary, f, indent=2)
        
        print(f"Created transfers summary: {total_transfers} transfers, total value: {total_value:.3f}")
    
    def _create_swaps_summary(self, swaps_data, time_range, prefix=""):
        """Create swaps summary"""
        total_swaps = len(swaps_data)
        swaps_by_protocol = {}
        
        for swap in swaps_data:
            protocol = swap.get('protocol', 'unknown')
            swaps_by_protocol[protocol] = swaps_by_protocol.get(protocol, 0) + 1
        
        summary = {
            "swaps_summary": {
                "total_swaps": total_swaps,
                "swaps_by_protocol": swaps_by_protocol
            }
        }
        
        prefix_str = f"{prefix}_" if prefix else ""
        filename = f"{self.data_dir}/{prefix_str}swaps_summary_{time_range}_{total_swaps}_records.json"
        with open(filename, 'w') as f:
            json.dump(summary, f, indent=2)
        
        print(f"Created swaps summary: {total_swaps} swaps, protocols: {swaps_by_protocol}")
    
    def _create_pools_summary(self, pools_data, prefix=""):
        """Create pools summary"""
        total_pools = len(pools_data)
        pools_by_protocol = {}
        
        for pool in pools_data:
            protocol = pool.get('protocol', 'unknown')
            pools_by_protocol[protocol] = pools_by_protocol.get(protocol, 0) + 1
        
        summary = {
            "pools_summary": {
                "total_pools": total_pools,
                "pools_by_protocol": pools_by_protocol
            }
        }
        
        prefix_str = f"{prefix}_" if prefix else ""
        filename = f"{self.data_dir}/{prefix_str}pools_summary_{total_pools}_records.json"
        with open(filename, 'w') as f:
            json.dump(summary, f, indent=2)
        
        print(f"Created pools summary: {total_pools} pools, protocols: {pools_by_protocol}")


def main():
    """Main function for data fetching"""
    fetcher = UniswapDataFetcher()
    
    print("Uniswap Data Fetcher for AI Training")
    print("=" * 40)
    print("1. Fetch comprehensive dataset (1 month)")
    print("2. Fetch comprehensive dataset (3 months)")
    print("3. Fetch comprehensive dataset (6 months)")
    print("4. Fetch transfer events only")
    print("5. Fetch swap events only")
    print("6. Fetch liquidity pools only")
    print("7. Fetch Uniswap V3 data only")
    print("8. Exit")
    
    while True:
        try:
            choice = input("\nEnter your choice (1-8): ").strip()
            
            if choice == "1":
                fetcher.fetch_comprehensive_dataset("1_month")
                break
            elif choice == "2":
                fetcher.fetch_comprehensive_dataset("3_months")
                break
            elif choice == "3":
                fetcher.fetch_comprehensive_dataset("6_months")
                break
            elif choice == "4":
                time_range = input("Enter time range (1_week, 1_month, 3_months, 6_months, 1_year): ").strip()
                max_pages = int(input("Enter max pages (default 30): ").strip() or "30")
                fetcher.fetch_transfer_events(time_range, max_pages)
                break
            elif choice == "5":
                time_range = input("Enter time range (1_week, 1_month, 3_months, 6_months, 1_year): ").strip()
                max_pages = int(input("Enter max pages (default 30): ").strip() or "30")
                fetcher.fetch_swap_events(time_range, max_pages)
                break
            elif choice == "6":
                max_pages = int(input("Enter max pages (default 20): ").strip() or "20")
                fetcher.fetch_liquidity_pools(max_pages)
                break
            elif choice == "7":
                time_range = input("Enter time range (1_week, 1_month, 3_months, 6_months, 1_year): ").strip()
                max_pages = int(input("Enter max pages (default 20): ").strip() or "20")
                fetcher.fetch_uniswap_v3_data(time_range, max_pages)
                break
            elif choice == "8":
                print("Goodbye!")
                break
            else:
                print("Invalid choice. Please enter 1-8.")
                
        except KeyboardInterrupt:
            print("\n\nData fetch interrupted by user.")
            break
        except Exception as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    main()
