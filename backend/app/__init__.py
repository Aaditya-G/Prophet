from flask import Flask 
from .config import config
from .db.models import db
from .controllers import main as main_blueprint
from flask_cors import CORS

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    CORS(app , resources={r"/api/*": {"origins": "*"}})


    db.init_app(app)

    app.register_blueprint(main_blueprint)

    return app