from flask import Flask, request, render_template, jsonify
from random import choice, randint
from mock_data import queue_cards


app = Flask(__name__)


@app.route('/')
def index():
    """Show homepage"""

    return render_template('base.html')


@app.route('/cards.json')
def return_mock_info():
    """Simulate retrieving data from db"""

    return jsonify(queue_cards)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5050')
