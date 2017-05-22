from flask import Flask, render_template
from flask_script import Manager
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)
manager = Manager(app)

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
