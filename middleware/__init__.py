# Middleware Base Classes and Decorators

from functools import wraps
from typing import Callable, Dict, Any, Optional
import time
import logging
from flask import request, jsonify, g

logger = logging.getLogger(__name__)

class Middleware:
    """Base middleware class"""
    
    def __init__(self):
        self.name = self.__class__.__name__
    
    def before_request(self, *args, **kwargs) -> Optional[Dict[str, Any]]:
        """Called before request processing"""
        return None
    
    def after_request(self, response, *args, **kwargs) -> Any:
        """Called after request processing"""
        return response
    
    def on_error(self, error: Exception, *args, **kwargs) -> Optional[Dict[str, Any]]:
        """Called when an error occurs"""
        return None

class MiddlewareChain:
    """Manages a chain of middleware"""
    
    def __init__(self):
        self.middlewares: list[Middleware] = []
    
    def add_middleware(self, middleware: Middleware):
        """Add middleware to the chain"""
        self.middlewares.append(middleware)
        logger.info(f"Added middleware: {middleware.name}")
    
    def execute_before(self, *args, **kwargs) -> Optional[Dict[str, Any]]:
        """Execute all before_request methods"""
        for middleware in self.middlewares:
            try:
                result = middleware.before_request(*args, **kwargs)
                if result:  # If middleware returns something, stop chain
                    return result
            except Exception as e:
                logger.error(f"Error in middleware {middleware.name}: {e}")
                error_result = middleware.on_error(e, *args, **kwargs)
                if error_result:
                    return error_result
        return None
    
    def execute_after(self, response, *args, **kwargs) -> Any:
        """Execute all after_request methods"""
        for middleware in reversed(self.middlewares):
            try:
                response = middleware.after_request(response, *args, **kwargs)
            except Exception as e:
                logger.error(f"Error in middleware {middleware.name}: {e}")
                middleware.on_error(e, *args, **kwargs)
        return response

def middleware_decorator(middleware_chain: MiddlewareChain):
    """Decorator to apply middleware chain to routes"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Execute before middleware
            before_result = middleware_chain.execute_before(*args, **kwargs)
            if before_result:
                return jsonify(before_result)
            
            try:
                # Execute the actual route function
                response = func(*args, **kwargs)
                
                # Execute after middleware
                response = middleware_chain.execute_after(response, *args, **kwargs)
                
                return response
            except Exception as e:
                # Handle errors in middleware chain
                for middleware in middleware_chain.middlewares:
                    error_result = middleware.on_error(e, *args, **kwargs)
                    if error_result:
                        return jsonify(error_result)
                raise e
        
        return wrapper
    return decorator

def api_route(app, rule, methods=None, middleware_chain=None, **options):
    """Decorator for API routes with middleware support"""
    if methods is None:
        methods = ['GET']
    
    def decorator(func):
        if middleware_chain:
            func = middleware_decorator(middleware_chain)(func)
        
        app.add_url_rule(rule, func.__name__, func, methods=methods, **options)
        return func
    
    return decorator
