from flask import Flask, session, url_for, request, redirect, render_template
from flask_admin import Admin
from flask_script import Manager
from flask_bootstrap import Bootstrap
from flask_babel import Babel, gettext, refresh

app = Flask(__name__)
app.config['SECRET_KEY']='a1'
app.config['BABEL_DEFAULT_LOCALE']='sq'
bootstrap = Bootstrap(app)
manager = Manager(app)
babel = Babel(app)

@babel.localeselector
def get_locale():
    if 'language' in session:
        return session['language']
    else:
        return 'sq'
    #return 'sq'
    #request.accept_languages.best_match(LANGUAGES.keys())

@app.route('/<lang>')
def language(lang):
    session['language']=lang
    refresh()
    return redirect(url_for('turnout'))
    #note: only works w/en + sq

@app.route('/')
@app.route('/turnout')
def turnout():
    return render_template('turnout.html')

@app.route('/results')
def results():
    return render_template('results.html')

if __name__ == '__main__':
    manager.run()
