import os
import requests
import json
from datetime import datetime, timedelta
from web3 import Web3
from web3.exceptions import ContractLogicError
from dotenv import load_dotenv
from typing import Dict, Any, List, Optional, Tuple


load_dotenv('config.env')

class TreasuryAnalyticsService:
    """
    Service class to calculate Uniswap Treasury balance, spending analysis, 
    runway, and expense ratio using Web3, Etherscan, and CoinGecko APIs.
    """
    ETHERSCAN_API_KEY: Optional[str] = os.getenv('ETHERSCAN_API_KEY')
    RPC_URL: Optional[str] = os.getenv('RPC_URL')
    TREASURY_ADDRESS: str = '0x1a9c8182c09f50c8318d769245bea52c32be35bc'
    MINIMAL_ABI: List[Dict[str, Any]] = [
        {
            "constant": True,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "type": "function"
        }
    ]    
    TOKENS: Dict[str, Dict[str, Any]] = {
        'ETH': {'contract': None, 'id': 'ethereum', 'decimals': 18},
        'UNI': {'contract': '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', 'id': 'uniswap', 'decimals': 18},
        'USDC': {'contract': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 'id': 'usd-coin', 'decimals': 6},
        'USDT': {'contract': '0xdac17f958d2ee523a2206206994597c13d831ec7', 'id': 'tether', 'decimals': 6},
        'DAI': {'contract': '0x6b175474e89094c44da98b954eedeac495271d0f', 'id': 'dai', 'decimals': 18},
    }

    def __init__(self):
        if not self.ETHERSCAN_API_KEY or not self.RPC_URL:
            raise ValueError("ETHERSCAN_API_KEY and RPC_URL must be set for TreasuryAnalyticsService.")

        self.w3 = Web3(Web3.HTTPProvider(self.RPC_URL))
        self.treasury_address_checksum = Web3.to_checksum_address(self.TREASURY_ADDRESS)
        
        
        self._analysis_cache: Dict[str, Any] = {}
        self._cache_timestamp: Optional[datetime] = None
        self._cache_duration_minutes = 10 

        
        for symbol, info in self.TOKENS.items():
            if info['contract']:
                info['contract'] = Web3.to_checksum_address(info['contract'])

    def _check_cache(self) -> bool:
        """Checks if the cached analysis is still valid."""
        if self._analysis_cache and self._cache_timestamp:
            return (datetime.utcnow() - self._cache_timestamp) < timedelta(minutes=self._cache_duration_minutes)
        return False
    
    def _get_prices(self) -> Dict[str, float]:
        """Fetches current token prices from CoinGecko."""
        ids = ','.join([token['id'] for token in self.TOKENS.values()])
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=usd"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return {id: data['usd'] for id, data in response.json().items()}

    def _get_balance(self, token_info: Dict[str, Any]) -> float:
        """Gets the balance of a specific token for the treasury address."""
        if token_info['contract'] is None:  
            balance = self.w3.eth.get_balance(self.treasury_address_checksum)
        else:
            contract = self.w3.eth.contract(address=token_info['contract'], abi=self.MINIMAL_ABI)
            try:
                balance = contract.functions.balanceOf(self.treasury_address_checksum).call()
            except ContractLogicError:
                balance = 0
        return balance / 10 ** token_info['decimals']

    def _calculate_treasury_balance(self, prices: Dict[str, float]) -> Tuple[Dict[str, Any], float]:
        """Calculates the current USD value and breakdown of the treasury."""
        balances: Dict[str, Any] = {}
        total_usd = 0.0
        
        for symbol, info in self.TOKENS.items():
            amount = self._get_balance(info)
            price = prices[info['id']]
            value_usd = amount * price
            balances[symbol] = {
                'amount': amount,
                'price_usd': price,
                'value_usd': value_usd
            }
            total_usd += value_usd
        
        
        stablecoins = ['USDC', 'USDT', 'DAI']
        stable_usd = sum(balances[s]['value_usd'] for s in stablecoins if s in balances)
        stable_pct = (stable_usd / total_usd * 100) if total_usd > 0 else 0
        
        return balances, total_usd, stable_pct

    def _fetch_outflows(self, last_months: int = 6) -> List[Dict[str, Any]]:
        """Fetches recent ETH and ERC20 transaction outflows from Etherscan."""
        start_timestamp = int((datetime.utcnow() - timedelta(days=30*last_months)).timestamp())
        outflows: List[Dict[str, Any]] = []
        eth_url = f"https://api.etherscan.io/api?module=account&action=txlist&address={self.TREASURY_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey={self.ETHERSCAN_API_KEY}"
        eth_response = requests.get(eth_url, timeout=15)
        eth_response.raise_for_status()
        txs = eth_response.json().get('result', [])
        token_url = f"https://api.etherscan.io/api?module=account&action=tokentx&address={self.TREASURY_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey={self.ETHERSCAN_API_KEY}"
        token_response = requests.get(token_url, timeout=15)
        token_response.raise_for_status()
        token_txs = token_response.json().get('result', [])
        token_map = {info['contract'].lower(): (s, info['decimals']) for s, info in self.TOKENS.items() if info['contract']}
        for tx in txs:
            ts = int(tx['timeStamp'])
            if ts < start_timestamp: continue
            if tx['from'].lower() == self.TREASURY_ADDRESS.lower() and int(tx['value']) > 0:
                outflows.append({
                    'timestamp': ts,
                    'symbol': 'ETH',
                    'amount': int(tx['value']) / 10**18,
                    'tx_hash': tx['hash']
                })
        for tx in token_txs:
            ts = int(tx['timeStamp'])
            if ts < start_timestamp: continue
            if tx['from'].lower() == self.TREASURY_ADDRESS.lower() and int(tx['value']) > 0:
                symbol, decimals = token_map.get(tx['contractAddress'].lower(), ('UNKNOWN', 18))
                outflows.append({
                    'timestamp': ts,
                    'symbol': symbol,
                    'amount': int(tx['value']) / 10**decimals,
                    'tx_hash': tx['hash']
                })
        
        return outflows
    def _calculate_spending(self, outflows: List[Dict[str, Any]], prices: Dict[str, float], last_months: int = 6) -> Tuple[float, List[Dict[str, Any]]]:
        """Analyzes outflow transactions to determine average monthly spending."""
        monthly_spend: Dict[str, Dict[str, Any]] = {}
        total_spend_usd = 0.0
        now = datetime.utcnow()
        for i in range(last_months):
            month_start = (now - timedelta(days=30*(i+1))).replace(day=1)
            month_key = month_start.strftime('%Y-%m')
            monthly_spend[month_key] = {'total_spent': 0.0, 'transactions_count': 0}

        
        for outflow in outflows:
            symbol = outflow['symbol']
            if symbol not in self.TOKENS: continue 
            
            dt = datetime.fromtimestamp(outflow['timestamp'])
            month_key = dt.strftime('%Y-%m')
            
            if month_key in monthly_spend:
                price_id = self.TOKENS[symbol]['id']
                price = prices.get(price_id, 0.0)
                
                if price > 0:
                    value_usd = outflow['amount'] * price
                    monthly_spend[month_key]['total_spent'] += value_usd
                    monthly_spend[month_key]['transactions_count'] += 1
                    total_spend_usd += value_usd
        
        avg_monthly_spend = total_spend_usd / last_months if last_months > 0 else 0.0
        
        
        spending_months = [{'month': k, 'total_spent': round(v['total_spent'], 2), 'transactions_count': v['transactions_count']} 
                           for k, v in monthly_spend.items()]
        
        return avg_monthly_spend, spending_months

    def _get_cached_analysis(self) -> Dict[str, Any]:
        """
        Runs the full analysis chain (prices, balance, outflows, spending, 
        runway, ratio) and caches the results, or returns the cached data.
        """
        if self._check_cache():
            return self._analysis_cache
        
        try:
            prices = self._get_prices()
            
            
            balances, total_usd, stable_pct = self._calculate_treasury_balance(prices)
            
            
            outflows = self._fetch_outflows()
            
            
            avg_monthly_spend, spending_months = self._calculate_spending(outflows, prices)
            
            
            
            
            runway_months = total_usd / avg_monthly_spend if avg_monthly_spend > 0 else 0
            
            
            current_ratio = total_usd / avg_monthly_spend if avg_monthly_spend > 0 else 0

            
            self._analysis_cache = {
                "total_usd": round(total_usd, 2),
                "runway_months": round(runway_months, 1),
                "current_ratio": round(current_ratio, 2),
                "avg_monthly_spend_usd": round(avg_monthly_spend, 2),
                "stablecoin_percentage": round(stable_pct, 1),
                "spending_months": spending_months,
            }
            self._cache_timestamp = datetime.utcnow()
            return self._analysis_cache

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code if e.response is not None else 500
            return {"error": f"API Error (HTTP {status_code}) fetching treasury data: {e}", "status": status_code}
        except requests.exceptions.RequestException as e:
            return {"error": f"API request failed (connection/timeout): {e}", "status": 503}
        except Exception as e:
            return {"error": f"Internal processing error: {str(e)}", "status": 500}

    
    
    def get_treasury_balance_usd(self) -> Dict[str, Any]:
        """Returns the total USD value of the treasury."""
        result = self._get_cached_analysis()
        if 'error' in result:
            return result
        
        return {"total_usd": result["total_usd"]}

    def get_treasury_runway_months(self) -> Dict[str, Any]:
        """Returns the calculated runway in months."""
        result = self._get_cached_analysis()
        if 'error' in result:
            return result
            
        return {"runway_months": result["runway_months"]}
        
    def get_treasury_to_expense_ratio(self) -> Dict[str, Any]:
        """Returns the treasury balance to average monthly expense ratio."""
        result = self._get_cached_analysis()
        if 'error' in result:
            return result
            
        return {"current_ratio": result["current_ratio"]}


try:
    treasury_analytics_service = TreasuryAnalyticsService()
except ValueError as e:
    
    class FailedTreasuryAnalyticsService:
        def get_treasury_balance_usd(self) -> Dict[str, Any]:
            return {"error": f"Treasury service initialization failed: {str(e)}", "status": 500}
        def get_treasury_runway_months(self) -> Dict[str, Any]:
            return {"error": f"Treasury service initialization failed: {str(e)}", "status": 500}
        def get_treasury_to_expense_ratio(self) -> Dict[str, Any]:
            return {"error": f"Treasury service initialization failed: {str(e)}", "status": 500}
    treasury_analytics_service = FailedTreasuryAnalyticsService()
