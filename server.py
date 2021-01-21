from flask import Flask, request
from random import choice, randint


app = Flask(__name__)


@app.route('/')
def index():
    """Show homepage"""

    return """
    <html>
    <body>
      <h1>I am the landing page</h1>
    </body>
    </html>
    """



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
