import os 

from flask import Flask
import yaml
from flask_sqlalchemy import SQLAlchemy


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    db = yaml.load(open('db.yaml'), Loader=yaml.BaseLoader)
    db_user = db['mysql_user']
    db_pass = db['mysql_password']
    db_name = db['mysql_database']
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{db_user}:{db_pass}@localhost/{db_name}"

    if test_config is None:
        # load the instance config
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)



    # ensuring the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    return app
