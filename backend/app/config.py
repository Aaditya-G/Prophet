import os
import dotenv

dotenv.load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SQLALCHEMY_POOL_SIZE = 3
    SQLALCHEMY_MAX_OVERFLOW = 2
    SQLALCHEMY_POOL_RECYCLE = 3600

    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')


    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}