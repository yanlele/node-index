from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello():
    return "hello dockeddr"

from flask_script import Manager

manager = Manager(app)

if __name__ == '__main__':
    manager.run()
