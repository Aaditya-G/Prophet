# Rate Limiting Middleware

import time
import logging
from typing import Dict, Any, Optional
from flask import request, g
from collections import defaultdict, deque
from . import Middleware

logger = logging.getLogger(__name__)

class RateLimitMiddleware(Middleware):
    """Simple rate limiting middleware"""
    
    def __init__(self, max_requests: int = 100, window_seconds: int = 60):
        super().__init__()
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(deque)
    
    def before_request(self, *args, **kwargs) -> Optional[Dict[str, Any]]:
        """Check rate limit"""
        client_ip = request.remote_addr
        current_time = time.time()
        
        # Clean old requests outside the window
        while (self.requests[client_ip] and 
               self.requests[client_ip][0] < current_time - self.window_seconds):
            self.requests[client_ip].popleft()
        
        # Check if limit exceeded
        if len(self.requests[client_ip]) >= self.max_requests:
            logger.warning(f"Rate limit exceeded for {client_ip}")
            return {
                'error': 'Rate Limit Exceeded',
                'message': f'Maximum {self.max_requests} requests per {self.window_seconds} seconds',
                'status_code': 429,
                'retry_after': self.window_seconds
            }
        
        # Add current request
        self.requests[client_ip].append(current_time)
        
        # Add rate limit info to response headers
        g.rate_limit_remaining = self.max_requests - len(self.requests[client_ip])
        g.rate_limit_reset = int(current_time + self.window_seconds)
        
        return None
    
    def after_request(self, response, *args, **kwargs) -> Any:
        """Add rate limit headers to response"""
        if hasattr(g, 'rate_limit_remaining'):
            response.headers['X-RateLimit-Remaining'] = str(g.rate_limit_remaining)
            response.headers['X-RateLimit-Reset'] = str(g.rate_limit_reset)
            response.headers['X-RateLimit-Limit'] = str(self.max_requests)
        return response
    
    def on_error(self, error: Exception, *args, **kwargs) -> Optional[Dict[str, Any]]:
        """Handle rate limiting errors"""
        logger.error(f"Rate limiting error: {str(error)}")
        return None
