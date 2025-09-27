import logging
from typing import Dict, Any, Optional, Callable
from flask import Flask, request, jsonify, g
from middleware import MiddlewareChain, middleware_decorator
from middleware.logging_middleware import LoggingMiddleware
from middleware.rate_limit_middleware import RateLimitMiddleware

logger = logging.getLogger(__name__)

class Orchestrator:
    """Main orchestrator service for managing requests and middleware"""
    
    def __init__(self, app: Flask = None):
        self.app = app
        self.middleware_chains = {}
        self.default_chain = MiddlewareChain()
        
        if app:
            self.init_app(app)
    
    def init_app(self, app: Flask):
        """Initialize orchestrator with Flask app"""
        self.app = app
        
        # Set up default middleware chain
        self.setup_default_middleware()
        
        # Register before/after request handlers
        app.before_request(self.before_request)
        app.after_request(self.after_request)
        
        logger.info("Orchestrator initialized with Flask app")
    
    def setup_default_middleware(self):
        """Set up default middleware chain"""
        # Add logging middleware
        logging_middleware = LoggingMiddleware()
        self.default_chain.add_middleware(logging_middleware)
        
        # Add rate limiting middleware
        rate_limit_middleware = RateLimitMiddleware(max_requests=100, window_seconds=60)
        self.default_chain.add_middleware(rate_limit_middleware)
    
    def create_middleware_chain(self, name: str) -> MiddlewareChain:
        """Create a new middleware chain"""
        chain = MiddlewareChain()
        self.middleware_chains[name] = chain
        return chain
    
    def get_middleware_chain(self, name: str = None) -> MiddlewareChain:
        """Get middleware chain by name or return default"""
        if name and name in self.middleware_chains:
            return self.middleware_chains[name]
        return self.default_chain
    
    def before_request(self):
        """Flask before_request handler"""
        try:
            result = self.default_chain.execute_before()
            if result:
                return jsonify(result)
        except Exception as e:
            logger.error(f"Error in before_request: {e}")
            return jsonify({
                'error': 'Internal Server Error',
                'message': 'Request processing failed',
                'status_code': 500
            }), 500
    
    def after_request(self, response):
        """Flask after_request handler"""
        try:
            response = self.default_chain.execute_after(response)
        except Exception as e:
            logger.error(f"Error in after_request: {e}")
        return response
    
    def route(self, rule: str, methods: list = None, middleware_chain: str = None, **options):
        """Decorator for routes with middleware support"""
        if methods is None:
            methods = ['GET']
        
        def decorator(func: Callable) -> Callable:
            # Get the appropriate middleware chain
            chain = self.get_middleware_chain(middleware_chain)
            
            # Apply middleware decorator
            func = middleware_decorator(chain)(func)
            
            # Register route with Flask
            self.app.add_url_rule(rule, func.__name__, func, methods=methods, **options)
            
            logger.info(f"Registered route: {rule} with methods: {methods}")
            return func
        
        return decorator
    
    def api_route(self, rule: str, methods: list = None, **options):
        """Convenience method for API routes"""
        return self.route(rule, methods, **options)
    
    def public_route(self, rule: str, methods: list = None, **options):
        """Route with basic middleware (no auth)"""
        # Use default chain (no auth middleware)
        def decorator(func: Callable) -> Callable:
            func = middleware_decorator(self.default_chain)(func)
            self.app.add_url_rule(rule, func.__name__, func, methods=methods, **options)
            return func
        
        return decorator
    
    def get_request_info(self) -> Dict[str, Any]:
        """Get current request information"""
        return {
            'method': request.method,
            'url': request.url,
            'endpoint': request.endpoint,
            'remote_addr': request.remote_addr,
            'user_agent': request.user_agent.string,
            'headers': dict(request.headers),
            'args': dict(request.args),
            'authenticated': getattr(g, 'authenticated', False),
            'user_id': getattr(g, 'user_id', None)
        }
    
    def log_request(self, message: str, level: str = 'INFO'):
        """Log request-specific information"""
        log_func = getattr(logger, level.lower(), logger.info)
        request_info = self.get_request_info()
        log_func(f"{message} - {request_info}")
