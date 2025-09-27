from unified_data_pipeline import UnifiedDataPipeline, ServiceResult
from typing import Dict, List, Optional, Any
import json
from datetime import datetime

class DataPipelineAPI:
    """
    Simple API interface for the unified data pipeline
    """
    
    def __init__(self, config_file: str = "config.env"):
        """Initialize the API with pipeline"""
        self.pipeline = UnifiedDataPipeline(config_file)
    
    def fetch_all_data(self, exclude_services: List[str] = None) -> Dict[str, Any]:
        """
        Fetch all data from all services
        
        Args:
            exclude_services: List of service names to exclude
            
        Returns:
            Dictionary containing all service results and combined report
        """
        print("Starting comprehensive data fetch...")
        
        # Run all services
        results = self.pipeline.run_all_services(exclude_services=exclude_services)
        
        # Generate combined report
        report = self.pipeline.generate_combined_report()
        
        return {
            "success": True,
            "results": results,
            "report": report,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def fetch_governance_data(self) -> Dict[str, Any]:
        """
        Fetch only governance-related data (voting power, delegates)
        
        Returns:
            Dictionary containing governance service results
        """
        print("Fetching governance data...")
        
        results = self.pipeline.run_governance_services()
        
        return {
            "success": True,
            "service_type": "governance",
            "results": results,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def fetch_treasury_data(self) -> Dict[str, Any]:
        """
        Fetch only treasury-related data (balance, runway, TVL)
        
        Returns:
            Dictionary containing treasury service results
        """
        print("Fetching treasury data...")
        
        results = self.pipeline.run_treasury_services()
        
        return {
            "success": True,
            "service_type": "treasury", 
            "results": results,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def fetch_single_service(self, service_name: str) -> Dict[str, Any]:
        """
        Fetch data from a single service
        
        Args:
            service_name: Name of the service to run
            
        Returns:
            Dictionary containing single service result
        """
        print(f"Fetching data from {service_name} service...")
        
        result = self.pipeline.run_service(service_name)
        
        return {
            "success": result.success,
            "service_name": service_name,
            "result": result,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def get_quick_summary(self) -> Dict[str, Any]:
        """
        Get a quick summary of key metrics without running services
        
        Returns:
            Dictionary with key metrics summary
        """
        # This would ideally load from existing data files
        summary = {
            "status": "no_data",
            "message": "Run fetch_all_data() first to get summary",
            "available_services": list(self.pipeline.services.keys()),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        return summary
    
    def get_service_status(self) -> Dict[str, bool]:
        """
        Get the status of all services (success/failure)
        
        Returns:
            Dictionary mapping service names to success status
        """
        return self.pipeline.get_service_status()
    
    def get_failed_services(self) -> List[str]:
        """
        Get list of services that failed in the last run
        
        Returns:
            List of failed service names
        """
        return self.pipeline.get_failed_services()
    
    def cleanup_old_data(self, days_old: int = 7) -> List[str]:
        """
        Clean up old data files
        
        Args:
            days_old: Number of days old files to clean up
            
        Returns:
            List of cleaned file paths
        """
        print(f"🧹 Cleaning up files older than {days_old} days...")
        return self.pipeline.cleanup_old_files(days_old)


# Convenience functions for direct usage
def fetch_all_data(exclude_services: List[str] = None) -> Dict[str, Any]:
    """Convenience function to fetch all data"""
    api = DataPipelineAPI()
    return api.fetch_all_data(exclude_services)

def fetch_governance_data() -> Dict[str, Any]:
    """Convenience function to fetch governance data"""
    api = DataPipelineAPI()
    return api.fetch_governance_data()

def fetch_treasury_data() -> Dict[str, Any]:
    """Convenience function to fetch treasury data"""
    api = DataPipelineAPI()
    return api.fetch_treasury_data()

def fetch_service(service_name: str) -> Dict[str, Any]:
    """Convenience function to fetch single service data"""
    api = DataPipelineAPI()
    return api.fetch_single_service(service_name)

def get_quick_summary() -> Dict[str, Any]:
    """Convenience function to get quick summary"""
    api = DataPipelineAPI()
    return api.get_quick_summary()


# Example usage and testing
if __name__ == "__main__":
    print("Unified Data Pipeline API")
    print("=" * 40)
    
    # Initialize API
    api = DataPipelineAPI()
    
    print("\nAvailable services:")
    for service in api.pipeline.services.keys():
        print(f"  - {service}")
    
    print("\nExample usage:")
    print("  # Fetch all data")
    print("  result = api.fetch_all_data()")
    print("  ")
    print("  # Fetch only governance data")
    print("  gov_data = api.fetch_governance_data()")
    print("  ")
    print("  # Fetch only treasury data")
    print("  treasury_data = api.fetch_treasury_data()")
    print("  ")
    print("  # Fetch single service")
    print("  delegate_data = api.fetch_service('top_delegate')")
    
    # Interactive menu
    while True:
        print("\n" + "=" * 40)
        print("Choose an option:")
        print("1. Fetch all data")
        print("2. Fetch governance data only")
        print("3. Fetch treasury data only")
        print("4. Fetch single service")
        print("5. Get service status")
        print("6. Cleanup old files")
        print("7. Exit")
        
        try:
            choice = input("\nEnter your choice (1-7): ").strip()
            
            if choice == "1":
                result = api.fetch_all_data()
                print(f"All data fetched successfully!")
                print(f"Services run: {len(result['results'])}")
                
            elif choice == "2":
                result = api.fetch_governance_data()
                print(f"Governance data fetched!")
                print(f"Services run: {len(result['results'])}")
                
            elif choice == "3":
                result = api.fetch_treasury_data()
                print(f"Treasury data fetched!")
                print(f"Services run: {len(result['results'])}")
                
            elif choice == "4":
                print("Available services:")
                for i, service in enumerate(api.pipeline.services.keys(), 1):
                    print(f"  {i}. {service}")
                
                service_choice = input("Enter service number: ").strip()
                try:
                    service_index = int(service_choice) - 1
                    service_name = list(api.pipeline.services.keys())[service_index]
                    result = api.fetch_service(service_name)
                    print(f"{service_name} data fetched!")
                    
                except (ValueError, IndexError):
                    print("Invalid service choice")
                    
            elif choice == "5":
                status = api.get_service_status()
                print("Service status:")
                for service, success in status.items():
                    status_icon = "Right" if success else "Danger"
                    print(f"  {status_icon} {service}")
                    
            elif choice == "6":
                days = input("Enter days old (default 7): ").strip()
                days = int(days) if days else 7
                cleaned = api.cleanup_old_data(days)
                print(f"Cleaned up {len(cleaned)} files")
                
            elif choice == "7":
                print("Goodbye!")
                break
                
            else:
                print("Invalid choice. Please enter 1-7.")
                
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")
