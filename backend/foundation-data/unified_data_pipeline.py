import os
import json
import time
import logging
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from pathlib import Path
import subprocess
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('pipeline.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

@dataclass
class ServiceResult:
    """Data class to hold service execution results"""
    service_name: str
    success: bool
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    execution_time: float = 0.0
    output_files: List[str] = None

class UnifiedDataPipeline:
    """
    Unified pipeline that orchestrates all microservices for comprehensive data fetching
    """
    
    def __init__(self, config_file: str = "config.env"):
        """Initialize the pipeline with configuration"""
        self.config_file = config_file
        
        # Get the directory where this script is located
        script_dir = Path(__file__).parent
        
        self.services = {
            "governance": str(script_dir / "governance-subgraph" / "total_voting_power.py"),
            "top_delegate": str(script_dir / "top-delegate" / "top-delegation.py"), 
            "treasury": str(script_dir / "treasury" / "treasure.py"),
            "tvl": str(script_dir / "TVL" / "TVL.py"),
            "uniswap_summary": str(script_dir / "uniswap_summary_fetcher.py")  # Non-interactive summary fetcher
        }
        self.results: Dict[str, ServiceResult] = {}
        self.output_dir = script_dir / "pipeline_output"
        self.output_dir.mkdir(exist_ok=True)
        
        # Load configuration
        self._load_config()
        
    def _load_config(self):
        """Load configuration from environment file"""
        try:
            from dotenv import load_dotenv
            # Use absolute path for config file
            config_path = Path(__file__).parent / self.config_file
            load_dotenv(config_path)
            logger.info(f"Configuration loaded from {config_path}")
        except ImportError:
            logger.warning("python-dotenv not installed, using system environment variables")
        except Exception as e:
            logger.error(f"Error loading configuration: {e}")
    
    def _run_service(self, service_name: str, service_path: str) -> ServiceResult:
        """Run a single service and capture its results"""
        logger.info(f"Starting {service_name} service...")
        start_time = time.time()
        
        try:
            # Change to the service directory if needed
            service_dir = Path(service_path).parent
            original_cwd = os.getcwd()
            os.chdir(service_dir)
            
            # Run the service
            result = subprocess.run(
                [sys.executable, Path(service_path).name],
                capture_output=True,
                text=True,
                timeout=300  # 5 minute timeout
            )
            
            # Change back to original directory
            os.chdir(original_cwd)
            
            execution_time = time.time() - start_time
            
            if result.returncode == 0:
                logger.info(f"{service_name} completed successfully in {execution_time:.2f}s")
                
                # Find output files created by the service
                output_files = self._find_service_outputs(service_name)
                
                # Load the data from output files
                data = self._load_service_data(service_name, output_files)
                
                return ServiceResult(
                    service_name=service_name,
                    success=True,
                    data=data,
                    execution_time=execution_time,
                    output_files=output_files
                )
            else:
                error_msg = f"Service failed with return code {result.returncode}: {result.stderr}"
                logger.error(f"{service_name} failed: {error_msg}")
                return ServiceResult(
                    service_name=service_name,
                    success=False,
                    error=error_msg,
                    execution_time=execution_time
                )
                
        except subprocess.TimeoutExpired:
            error_msg = f"Service timed out after 5 minutes"
            logger.error(f"{service_name} timed out")
            return ServiceResult(
                service_name=service_name,
                success=False,
                error=error_msg,
                execution_time=time.time() - start_time
            )
        except Exception as e:
            error_msg = f"Unexpected error: {str(e)}"
            logger.error(f"{service_name} error: {error_msg}")
            return ServiceResult(
                service_name=service_name,
                success=False,
                error=error_msg,
                execution_time=time.time() - start_time
            )
    
    def _find_service_outputs(self, service_name: str) -> List[str]:
        """Find output files created by a service"""
        output_files = []
        
        # Get the script directory to build absolute paths
        script_dir = Path(__file__).parent
        
        # Define expected output files for each service with their directories
        service_outputs = {
            "governance": [script_dir / "governance-subgraph" / "total_delegated_voting_power.json"],
            "top_delegate": [script_dir / "top-delegate" / "delegates_result.json"],
            "treasury": [
                script_dir / "treasury" / "treasury_balance.json",
                script_dir / "treasury" / "treasury_runway.json", 
                script_dir / "treasury" / "treasury_to_expense_ratio.json"
            ],
            "tvl": [script_dir / "TVL" / "uniswap_weekly_tvl_slopes.json"],
            "uniswap_summary": [
                script_dir / "uniswap_data" / "fetch_summary_*.json",
                script_dir / "uniswap_data" / "*_summary_*.json",
                script_dir / "uniswap_data" / "transfers_summary_*.json",
                script_dir / "uniswap_data" / "swaps_summary_*.json",
                script_dir / "uniswap_data" / "pools_summary_*.json"
            ]
        }
        
        if service_name in service_outputs:
            for pattern in service_outputs[service_name]:
                if "*" in str(pattern):
                    # Handle glob patterns
                    import glob
                    matches = glob.glob(str(pattern))
                    output_files.extend(matches)
                else:
                    # Handle specific files
                    if pattern.exists():
                        output_files.append(str(pattern))
        
        return output_files
    
    def _load_service_data(self, service_name: str, output_files: List[str]) -> Dict[str, Any]:
        """Load data from service output files"""
        data = {}
        
        for file_path in output_files:
            try:
                with open(file_path, 'r') as f:
                    file_data = json.load(f)
                    data[Path(file_path).name] = file_data
            except Exception as e:
                logger.warning(f"Could not load {file_path}: {e}")
        
        return data
    
    def run_service(self, service_name: str) -> ServiceResult:
        """Run a specific service"""
        if service_name not in self.services:
            raise ValueError(f"Unknown service: {service_name}")
        
        service_path = self.services[service_name]
        result = self._run_service(service_name, service_path)
        self.results[service_name] = result
        return result
    
    def run_all_services(self, exclude_services: List[str] = None) -> Dict[str, ServiceResult]:
        """Run all services in the pipeline"""
        exclude_services = exclude_services or []
        
        logger.info("Starting unified data pipeline...")
        logger.info(f"Services to run: {[s for s in self.services.keys() if s not in exclude_services]}")
        
        for service_name in self.services:
            if service_name not in exclude_services:
                result = self.run_service(service_name)
                if not result.success:
                    logger.warning(f"Service {service_name} failed, continuing with other services...")
        
        return self.results
    
    def run_governance_services(self) -> Dict[str, ServiceResult]:
        """Run only governance-related services"""
        governance_services = ["governance", "top_delegate"]
        results = {}
        
        for service_name in governance_services:
            if service_name in self.services:
                result = self.run_service(service_name)
                results[service_name] = result
        
        return results
    
    def run_treasury_services(self) -> Dict[str, ServiceResult]:
        """Run only treasury-related services"""
        treasury_services = ["treasury", "tvl"]
        results = {}
        
        for service_name in treasury_services:
            if service_name in self.services:
                result = self.run_service(service_name)
                results[service_name] = result
        
        return results
    
    def generate_combined_report(self) -> Dict[str, Any]:
        """Generate a combined report from all successful services"""
        logger.info("Generating combined report...")
        
        report = {
            "pipeline_execution": {
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "total_services": len(self.services),
                "successful_services": len([r for r in self.results.values() if r.success]),
                "failed_services": len([r for r in self.results.values() if not r.success])
            },
            "service_results": {},
            "combined_metrics": {},
            "summary": {}
        }
        
        # Add individual service results
        for service_name, result in self.results.items():
            report["service_results"][service_name] = {
                "success": result.success,
                "execution_time": result.execution_time,
                "output_files": result.output_files or [],
                "error": result.error
            }
            
            if result.success and result.data:
                report["service_results"][service_name]["data"] = result.data
        
        # Generate combined metrics
        self._generate_combined_metrics(report)
        
        # Generate summary
        self._generate_summary(report)
        
        # Save combined report
        report_file = self.output_dir / f"combined_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_file, 'w') as f:
            json.dump(report, f, indent=2)
        
        logger.info(f"Combined report saved to {report_file}")
        return report
    
    def _generate_combined_metrics(self, report: Dict[str, Any]):
        """Generate combined metrics from all services"""
        metrics = {}
        
        # Governance metrics
        if "governance" in self.results and self.results["governance"].success:
            gov_data = self.results["governance"].data
            if gov_data and "total_delegated_voting_power.json" in gov_data:
                metrics["total_delegated_voting_power"] = gov_data["total_delegated_voting_power.json"].get("totalDelegatedVotingPower", 0)
        
        if "top_delegate" in self.results and self.results["top_delegate"].success:
            delegate_data = self.results["top_delegate"].data
            if delegate_data and "delegates_result.json" in delegate_data:
                metrics["top_3_delegates_sum"] = delegate_data["delegates_result.json"].get("sum", 0)
        
        # Treasury metrics
        if "treasury" in self.results and self.results["treasury"].success:
            treasury_data = self.results["treasury"].data
            if treasury_data and "treasury_balance.json" in treasury_data:
                balance_data = treasury_data["treasury_balance.json"]
                metrics["treasury_total_usd"] = balance_data.get("treasury_balance", {}).get("total_usd", 0)
            
            if treasury_data and "treasury_runway.json" in treasury_data:
                runway_data = treasury_data["treasury_runway.json"]
                metrics["treasury_runway_months"] = runway_data.get("treasury_runway", {}).get("runway_months", 0)
        
        # TVL metrics
        if "tvl" in self.results and self.results["tvl"].success:
            tvl_data = self.results["tvl"].data
            if tvl_data and "uniswap_weekly_tvl_slopes.json" in tvl_data:
                slopes = tvl_data["uniswap_weekly_tvl_slopes.json"]
                if slopes:
                    metrics["avg_tvl_slope"] = sum(s.get("tvl_slope_usd_per_day", 0) for s in slopes) / len(slopes)
        
        report["combined_metrics"] = metrics
    
    def _generate_summary(self, report: Dict[str, Any]):
        """Generate executive summary"""
        summary = {
            "status": "success" if all(r.success for r in self.results.values()) else "partial_success",
            "key_findings": [],
            "recommendations": []
        }
        
        # Add key findings based on successful services
        if "treasury_total_usd" in report["combined_metrics"]:
            treasury_usd = report["combined_metrics"]["treasury_total_usd"]
            summary["key_findings"].append(f"Treasury balance: ${treasury_usd:,.2f}")
        
        if "treasury_runway_months" in report["combined_metrics"]:
            runway = report["combined_metrics"]["treasury_runway_months"]
            summary["key_findings"].append(f"Treasury runway: {runway:.1f} months")
        
        if "total_delegated_voting_power" in report["combined_metrics"]:
            voting_power = report["combined_metrics"]["total_delegated_voting_power"]
            summary["key_findings"].append(f"Total delegated voting power: {voting_power:,.2f}")
        
        # Add recommendations
        if "treasury_runway_months" in report["combined_metrics"]:
            runway = report["combined_metrics"]["treasury_runway_months"]
            if runway < 6:
                summary["recommendations"].append("Consider reducing treasury spending - runway is less than 6 months")
            elif runway > 24:
                summary["recommendations"].append("Treasury runway is healthy - consider strategic investments")
        
        report["summary"] = summary
    
    def get_service_status(self) -> Dict[str, bool]:
        """Get the status of all services"""
        return {name: result.success for name, result in self.results.items()}
    
    def get_failed_services(self) -> List[str]:
        """Get list of failed services"""
        return [name for name, result in self.results.items() if not result.success]
    
    def cleanup_old_files(self, days_old: int = 7):
        """Clean up old output files"""
        logger.info(f"Cleaning up files older than {days_old} days...")
        
        cutoff_time = time.time() - (days_old * 24 * 60 * 60)
        cleaned_files = []
        
        for file_path in self.output_dir.glob("*.json"):
            if file_path.stat().st_mtime < cutoff_time:
                file_path.unlink()
                cleaned_files.append(str(file_path))
        
        logger.info(f"Cleaned up {len(cleaned_files)} old files")
        return cleaned_files


def main():
    """Main function for command-line usage"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Unified Data Pipeline for Ethereum Governance Analysis")
    parser.add_argument("--service", help="Run specific service only")
    parser.add_argument("--governance", action="store_true", help="Run governance services only")
    parser.add_argument("--treasury", action="store_true", help="Run treasury services only")
    parser.add_argument("--exclude", nargs="+", help="Exclude specific services")
    parser.add_argument("--report", action="store_true", help="Generate combined report")
    parser.add_argument("--cleanup", type=int, help="Clean up files older than N days")
    
    args = parser.parse_args()
    
    # Initialize pipeline
    pipeline = UnifiedDataPipeline()
    
    try:
        if args.service:
            # Run specific service
            result = pipeline.run_service(args.service)
            print(f"Service {args.service}: {'SUCCESS' if result.success else 'FAILED'}")
            if result.error:
                print(f"Error: {result.error}")
        
        elif args.governance:
            # Run governance services
            results = pipeline.run_governance_services()
            print(f"Governance services completed: {len(results)} services")
        
        elif args.treasury:
            # Run treasury services
            results = pipeline.run_treasury_services()
            print(f"Treasury services completed: {len(results)} services")
        
        else:
            # Run all services
            results = pipeline.run_all_services(exclude_services=args.exclude or [])
            print(f"Pipeline completed: {len(results)} services")
            
            # Always generate report after running all services
            report = pipeline.generate_combined_report()
            print("Combined report generated successfully")
        
        # Generate report if explicitly requested (for specific service runs)
        if args.report and (args.service or args.governance or args.treasury):
            report = pipeline.generate_combined_report()
            print("Combined report generated successfully")
        
        # Cleanup if requested
        if args.cleanup:
            cleaned = pipeline.cleanup_old_files(args.cleanup)
            print(f"Cleaned up {len(cleaned)} old files")
    
    except KeyboardInterrupt:
        print("\nPipeline interrupted by user")
    except Exception as e:
        logger.error(f"Pipeline error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
