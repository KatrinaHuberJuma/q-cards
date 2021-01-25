from flask import Flask, request, render_template
from random import choice, randint


app = Flask(__name__)


@app.route('/')
def index():
    """Show homepage"""

    return render_template('base.html')



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
