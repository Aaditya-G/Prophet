import logging
import json
from typing import Dict, Any, Optional
from datetime import datetime
from flask import request, jsonify

logger = logging.getLogger(__name__)

class ResponseBuilder:
    """Utility class for building consistent API responses"""
    
    @staticmethod
    def success(data: Any = None, message: str = "Success", status_code: int = 200) -> tuple:
        """Build success response"""
        response = {
            'status': 'success',
            'message': message,
            'timestamp': datetime.utcnow().isoformat(),
            'data': data
        }
        return jsonify(response), status_code
    
    @staticmethod
    def error(message: str = "Error", status_code: int = 400, details: Any = None) -> tuple:
        """Build error response"""
        response = {
            'status': 'error',
            'message': message,
            'timestamp': datetime.utcnow().isoformat(),
            'status_code': status_code
        }
        if details:
            response['details'] = details
        return jsonify(response), status_code
    
    @staticmethod
    def validation_error(errors: Dict[str, Any]) -> tuple:
        """Build validation error response"""
        return ResponseBuilder.error(
            message="Validation failed",
            status_code=422,
            details=errors
        )

class RequestValidator:
    """Utility class for request validation"""
    
    @staticmethod
    def validate_json_required(required_fields: list) -> Optional[tuple]:
        """Validate that JSON request has required fields"""
        if not request.is_json:
            return ResponseBuilder.error("Request must be JSON", 400)
        
        data = request.get_json()
        if not data:
            return ResponseBuilder.error("Request body is required", 400)
        
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return ResponseBuilder.validation_error({
                'missing_fields': missing_fields,
                'required_fields': required_fields
            })
        
        return None
    
    @staticmethod
    def validate_content_type(content_type: str = 'application/json') -> Optional[tuple]:
        """Validate request content type"""
        if request.content_type != content_type:
            return ResponseBuilder.error(
                f"Content-Type must be {content_type}",
                415
            )
        return None

class DataProcessor:
    """Utility class for data processing"""
    
    @staticmethod
    def sanitize_input(data: Any) -> Any:
        """Basic input sanitization"""
        if isinstance(data, str):
            # Remove potentially dangerous characters
            return data.strip().replace('<', '&lt;').replace('>', '&gt;')
        elif isinstance(data, dict):
            return {key: DataProcessor.sanitize_input(value) for key, value in data.items()}
        elif isinstance(data, list):
            return [DataProcessor.sanitize_input(item) for item in data]
        return data
    
    @staticmethod
    def extract_pagination_params() -> Dict[str, int]:
        """Extract pagination parameters from request"""
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Validate pagination params
        page = max(1, page)
        per_page = min(max(1, per_page), 100)  # Limit to 100 items per page
        
        return {
            'page': page,
            'per_page': per_page,
            'offset': (page - 1) * per_page
        }
    
    @staticmethod
    def build_pagination_response(data: list, total: int, page: int, per_page: int) -> Dict[str, Any]:
        """Build paginated response"""
        total_pages = (total + per_page - 1) // per_page
        
        return {
            'data': data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'total_pages': total_pages,
                'has_next': page < total_pages,
                'has_prev': page > 1
            }
        }

class Logger:
    """Enhanced logging utility"""
    
    @staticmethod
    def log_request_start():
        """Log request start"""
        logger.info(f"Request started: {request.method} {request.path}")
    
    @staticmethod
    def log_request_end(response_status: int, duration: float):
        """Log request end"""
        logger.info(f"Request completed: {request.method} {request.path} - {response_status} ({duration:.3f}s)")
    
    @staticmethod
    def log_error(error: Exception, context: str = ""):
        """Log error with context"""
        logger.error(f"Error in {context}: {str(error)}", exc_info=True)
    
    @staticmethod
    def log_security_event(event_type: str, details: Dict[str, Any]):
        """Log security-related events"""
        logger.warning(f"Security event - {event_type}: {details}")
