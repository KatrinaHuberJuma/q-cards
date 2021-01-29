from flask import Flask, request, render_template, jsonify
from random import choice, randint
from mock_data import queue_cards, users


app = Flask(__name__)


@app.route('/')
def index():
    """Show homepage"""

    return render_template('base.html')


@app.route('/cards.json')
def return_mock_info():
    """Simulate retrieving data from db"""

    return jsonify(queue_cards)


@app.route('/login', methods= ['POST'])
def login():
    """Login user"""
    # check against user data, if match, login
    # else return an error of some sort

    user_name = request.json.get('userName')
    password = request.json.get('password')

    for user in users:
        if user['user_name'] == user_name and user['password'] == password:
            return jsonify(user)
            # make headers to increase legitness 

    return jsonify('user and password not found')


@app.route('/enqueue-submit', methods=['POST'])
def handle_enqueue_submit():
    """Store form data"""

    # import pdb; pdb.set_trace()

    title = request.json.get('title')
    # title = request.json['title']
    print('\n'*5, '*'*20, title, '\n'*5)
    # title is None
    # print('\n'*5, '*'*20, request.form, '\n'*5)
    return jsonify('YAS')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5050')
