import os
from dotenv import load_dotenv
from app import create_app

load_dotenv()

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

if __name__ == '__main__':
    host = os.environ.get('FLASK_RUN_HOST', '127.0.0.1')
    port = int(os.environ.get('FLASK_RUN_PORT', 5000))
    debug = app.config.get('DEBUG', False)
    
    app.run(host=host, port=port, debug=debug)