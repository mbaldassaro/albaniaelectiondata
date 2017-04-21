from flask import Flask, render_template
from flask_script import Manager
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)
manager = Manager(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/elections2013')
def elections2013():
    return render_template('elections2013.html')

@app.route('/elex2013')
def elex2013():
    return render_template('elex2013.html')

if __name__ == '__main__':
    manager.run()
