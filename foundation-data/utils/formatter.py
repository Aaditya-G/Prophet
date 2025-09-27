import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class DataProcessor:
    """Utility class for processing governance data"""
    
    @staticmethod
    def format_proposal_status(status: str) -> str:
        """Format proposal status for display"""
        status_map = {
            'PENDING': 'Pending',
            'ACTIVE': 'Active',
            'CANCELED': 'Canceled',
            'DEFEATED': 'Defeated',
            'SUCCEEDED': 'Succeeded',
            'QUEUED': 'Queued',
            'EXECUTED': 'Executed',
            'EXPIRED': 'Expired'
        }
        return status_map.get(status.upper(), status)
    
    @staticmethod
    def calculate_vote_percentage(for_votes: int, against_votes: int, abstain_votes: int) -> Dict[str, float]:
        """Calculate vote percentages"""
        total = for_votes + against_votes + abstain_votes
        
        if total == 0:
            return {
                'for_percentage': 0.0,
                'against_percentage': 0.0,
                'abstain_percentage': 0.0
            }
        
        return {
            'for_percentage': (for_votes / total) * 100,
            'against_percentage': (against_votes / total) * 100,
            'abstain_percentage': (abstain_votes / total) * 100
        }
    
    @staticmethod
    def format_voting_power(votes: int) -> str:
        """Format voting power for display"""
        if votes >= 1_000_000:
            return f"{votes / 1_000_000:.2f}M"
        elif votes >= 1_000:
            return f"{votes / 1_000:.2f}K"
        else:
            return str(votes)
    
    @staticmethod
    def get_proposal_timeline(start_block: int, end_block: int) -> Dict[str, Any]:
        """Get proposal timeline information"""
        # This is simplified - in reality you'd need block timestamps
        return {
            'start_block': start_block,
            'end_block': end_block,
            'duration_blocks': end_block - start_block,
            'status': 'active' if start_block <= 0 <= end_block else 'inactive'
        }

class DataValidator:
    """Utility class for validating governance data"""
    
    @staticmethod
    def validate_address(address: str) -> bool:
        """Validate Ethereum address format"""
        if not address:
            return False
        
        # Basic Ethereum address validation
        return address.startswith('0x') and len(address) == 42
    
    @staticmethod
    def validate_proposal_id(proposal_id: str) -> bool:
        """Validate proposal ID format"""
        if not proposal_id:
            return False
        
        try:
            int(proposal_id)
            return True
        except ValueError:
            return False
    
    @staticmethod
    def sanitize_description(description: str) -> str:
        """Sanitize proposal description"""
        if not description:
            return ""
        
        # Remove HTML tags and limit length
        import re
        clean_description = re.sub(r'<[^>]+>', '', description)
        return clean_description[:500] + "..." if len(clean_description) > 500 else clean_description

class DataFormatter:
    """Utility class for formatting data for display"""
    
    @staticmethod
    def format_proposal_summary(proposal_data: Dict[str, Any]) -> Dict[str, Any]:
        """Format proposal data for summary display"""
        return {
            'id': proposal_data.get('id', ''),
            'title': proposal_data.get('title', 'Untitled'),
            'status': DataProcessor.format_proposal_status(proposal_data.get('status', '')),
            'votes': {
                'for': proposal_data.get('forVotes', 0),
                'against': proposal_data.get('againstVotes', 0),
                'abstain': proposal_data.get('abstainVotes', 0)
            },
            'proposer': proposal_data.get('proposer', {}).get('id', ''),
            'timeline': DataProcessor.get_proposal_timeline(
                proposal_data.get('startBlock', 0),
                proposal_data.get('endBlock', 0)
            )
        }
    
    @staticmethod
    def format_delegate_summary(delegate_data: Dict[str, Any]) -> Dict[str, Any]:
        """Format delegate data for summary display"""
        return {
            'address': delegate_data.get('id', ''),
            'voting_power': DataProcessor.format_voting_power(
                delegate_data.get('delegatedVotes', 0)
            ),
            'raw_voting_power': delegate_data.get('delegatedVotes', 0),
            'token_holders': delegate_data.get('tokenHoldersRepresentedAmount', 0),
            'vote_count': len(delegate_data.get('votes', []))
        }
