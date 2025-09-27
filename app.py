from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
from datetime import datetime
from services.orchestrator import Orchestrator
from utils.helpers import ResponseBuilder, RequestValidator, DataProcessor

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

app = Flask(__name__)
CORS(app)  # Enable CORS for API access

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

# Initialize orchestrator
orchestrator = Orchestrator(app)

@app.route('/')
def index():
    """Root endpoint - API information"""
    return ResponseBuilder.success({
        'name': 'Prophet Flask API',
        'version': '1.0.0',
        'description': 'Backend API server for data handling',
        'endpoints': {
            'health': '/api/health',
            'data': '/api/data',
            'status': '/api/status'
        },
        'middleware': {
            'logging': 'Request/response logging',
            'rate_limiting': '100 requests per minute'
        }
    })

@orchestrator.public_route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return ResponseBuilder.success({
        'status': 'healthy',
        'message': 'Prophet Flask server is running!',
        'version': '1.0.0'
    })

@orchestrator.public_route('/api/status', methods=['GET'])
def status():
    """Detailed status endpoint"""
    return ResponseBuilder.success({
        'status': 'operational',
        'uptime': 'running',
        'environment': os.environ.get('FLASK_ENV', 'development'),
        'debug_mode': app.debug
    })

@orchestrator.public_route('/api/data', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_data():
    """Basic data handling endpoint"""
    if request.method == 'GET':
        # Get pagination params
        pagination = DataProcessor.extract_pagination_params()
        
        return ResponseBuilder.success({
            'message': 'GET request received',
            'data': 'This is sample data from Prophet API',
            'method': 'GET',
            'pagination': pagination
        })
    
    elif request.method == 'POST':
        # Validate JSON input
        validation_error = RequestValidator.validate_json_required(['data'])
        if validation_error:
            return validation_error
        
        data = request.get_json()
        sanitized_data = DataProcessor.sanitize_input(data)
        
        return ResponseBuilder.success({
            'message': 'POST request received',
            'received_data': sanitized_data,
            'status': 'created',
            'method': 'POST'
        })
    
    elif request.method == 'PUT':
        validation_error = RequestValidator.validate_json_required(['id', 'data'])
        if validation_error:
            return validation_error
        
        data = request.get_json()
        sanitized_data = DataProcessor.sanitize_input(data)
        
        return ResponseBuilder.success({
            'message': 'PUT request received',
            'received_data': sanitized_data,
            'status': 'updated',
            'method': 'PUT'
        })
    
    elif request.method == 'DELETE':
        item_id = request.args.get('id')
        if not item_id:
            return ResponseBuilder.error('ID parameter is required for DELETE', 400)
        
        return ResponseBuilder.success({
            'message': 'DELETE request received',
            'deleted_id': item_id,
            'status': 'deleted',
            'method': 'DELETE'
        })

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return ResponseBuilder.error(
        message='The requested resource was not found',
        status_code=404
    )

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return ResponseBuilder.error(
        message='An internal server error occurred',
        status_code=500
    )

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    # Get debug mode from environment variable
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    app.run(host='0.0.0.0', port=port, debug=debug)
