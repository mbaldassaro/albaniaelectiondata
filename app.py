from flask import Flask, request, render_template
from flask_script import Manager
from flask_bootstrap import Bootstrap
from flask_babel import Babel, gettext

app = Flask(__name__)
app.config.from_object('config')
bootstrap = Bootstrap(app)
manager = Manager(app)
babel = Babel(app)
from config import LANGUAGES

@babel.localeselector
def get_locale():
    return 'sq'
    #return request.accept_languages.best_match(LANGUAGES.keys())

"""@app.route('/')
def index():
    return render_template('index.html')"""

@app.route('/')
def turnout():
    return render_template('turnout.html')

@app.route('/results')
def map2015():
    return render_template('results.html')

if __name__ == '__main__':
    manager.run()
