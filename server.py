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

    user_name = request.json.get('userName')
    password = request.json.get('password')

    print('*'*15)
    print(f'\n\nuser_name = {user_name}, password = {password}\n\n')
    print('*'*15)

    code = 403
    response = 'not right pw/user name :('

    for user in users:
        if user['userName'] == user_name and user['password'] == password:

            code = 200
            response = user
            break

    return (jsonify(response), code)


@app.route('/enqueue-submit', methods=['POST'])
def handle_enqueue_submit():
    """Store form data"""

    # import pdb; pdb.set_trace()

    title = request.json.get('title')
    print('\n'*5, '*'*20, title, '\n'*5)
    return jsonify('YAS')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5050')
