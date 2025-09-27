# Logging Middleware

import time
import logging
from typing import Dict, Any, Optional
from flask import request, g
from . import Middleware

logger = logging.getLogger(__name__)

class LoggingMiddleware(Middleware):
    """Middleware for request/response logging"""
    
    def __init__(self, log_level: str = 'INFO'):
        super().__init__()
        self.log_level = getattr(logging, log_level.upper(), logging.INFO)
    
    def before_request(self, *args, **kwargs) -> Optional[Dict[str, Any]]:
        """Log incoming request"""
        g.start_time = time.time()
        
        log_data = {
            'method': request.method,
            'url': request.url,
            'remote_addr': request.remote_addr,
            'user_agent': request.user_agent.string,
            'timestamp': time.time()
        }
        
        # Log request body for POST/PUT requests
        if request.method in ['POST', 'PUT', 'PATCH']:
            try:
                log_data['request_body'] = request.get_json()
            except Exception:
                log_data['request_body'] = 'Unable to parse JSON'
        
        logger.log(self.log_level, f"Request: {log_data}")
        return None
    
    def after_request(self, response, *args, **kwargs) -> Any:
        """Log outgoing response"""
        if hasattr(g, 'start_time'):
            duration = time.time() - g.start_time
            
            log_data = {
                'status_code': response.status_code,
                'duration_ms': round(duration * 1000, 2),
                'response_size': len(response.get_data()),
                'timestamp': time.time()
            }
            
            logger.log(self.log_level, f"Response: {log_data}")
        
        return response
    
    def on_error(self, error: Exception, *args, **kwargs) -> Optional[Dict[str, Any]]:
        """Log errors"""
        logger.error(f"Request error: {str(error)}", exc_info=True)
        return None
