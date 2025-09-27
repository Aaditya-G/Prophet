import json
from typing import Dict, Any, List
from datetime import datetime
from .tvl_slope import llama_tvl_analyzer
from .voting_power import subgraph_service
from .top_delegate import dune_analytics_service
from .treasury import treasury_analytics_service

class DaoMetricsUtil:
    """
    A utility class to fetch and organize key DAO metrics from various services.
    """

    @staticmethod
    def get_all_dao_metrics() -> Dict[str, Any]:
        """
        Fetches key summary metrics from all integrated services (Treasury,
        Governance, Delegates, TVL) and combines them into a single response object.
        """
        treasury_balance = treasury_analytics_service.get_treasury_balance_usd()
        treasury_runway = treasury_analytics_service.get_treasury_runway_months()
        treasury_ratio = treasury_analytics_service.get_treasury_to_expense_ratio()
        treasury_full_data = treasury_analytics_service._get_cached_analysis()

        governance_power = subgraph_service.get_total_voting_power()
        top_delegate_metric = dune_analytics_service.get_top_delegate_sum_metric()
        tvl_slopes = llama_tvl_analyzer.get_weekly_tvl_slopes()

        last_updated_ts = treasury_full_data.get("_cache_timestamp")
        last_updated_str = last_updated_ts.isoformat() + 'Z' if isinstance(last_updated_ts, datetime) else None

        results: Dict[str, Any] = {
            "treasury": {
                "total_usd": treasury_balance.get("total_usd") if "error" not in treasury_balance else treasury_balance,
                "runway_months": treasury_runway.get("runway_months") if "error" not in treasury_runway else treasury_runway,
                "expense_ratio": treasury_ratio.get("current_ratio") if "error" not in treasury_ratio else treasury_ratio,
            },
            "governance": {
                "total_delegated_voting_power": governance_power.get("totalDelegatedVotingPower") if "error" not in governance_power else governance_power,
            },
            "delegates": {
                "top_3_sum_metric": top_delegate_metric.get("divided_value") if "error" not in top_delegate_metric else top_delegate_metric,
            },
            "tvl": {
                "average_weekly_slope": tvl_slopes.get("average_weekly_slope_usd_per_day") if "error" not in tvl_slopes else tvl_slopes,
            }
        }

        return results

    @staticmethod
    def get_treasury_data() -> Dict[str, Any]:
        """
        Exposes all detailed treasury analysis data (including spending breakdown,
        stablecoin percentage, etc.) by calling the underlying cached analysis method.
        """
        return treasury_analytics_service._get_cached_analysis()

    @staticmethod
    def get_governance_metrics() -> Dict[str, Any]:
        """Exposes raw governance metrics from Subgraph (Total Delegated Voting Power)."""
        return {
            "total_delegated_voting_power": subgraph_service.get_total_voting_power(),
        }

    @staticmethod
    def get_top_delegate_metric() -> Dict[str, Any]:
        """Exposes the top 3 delegate sum metric from Dune Analytics."""
        return dune_analytics_service.get_top_delegate_sum_metric()

    @staticmethod
    def get_tvl_metrics() -> Dict[str, Any]:
        """Exposes the TVL slope analysis."""
        return llama_tvl_analyzer.get_weekly_tvl_slopes()