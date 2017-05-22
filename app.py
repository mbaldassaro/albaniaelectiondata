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
def map2013():
    return render_template('map2013.html')

@app.route('/map2015')
def map2015():
    return render_template('map2015.html')

if __name__ == '__main__':
    manager.run()
