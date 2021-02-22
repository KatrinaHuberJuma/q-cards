from flask import Flask, request, render_template, jsonify
from random import choice, randint
from mock_data import queue_cards, users
from helpers import *
from model import *


app = Flask(__name__)


@app.route('/')
def index():
    """Show homepage"""

    return render_template('base.html')


@app.route('/cards.json')
def return_questions_json():
    """Retrieve questions data from db"""
    questions = order_questions()
    dict_questions = sort_question_dict(questions)

    return jsonify(dict_questions)


@app.route('/login', methods= ['POST'])
def login():
    """Login user"""

    email = request.json.get('email')
    password = request.json.get('password')

    print('*'*15)
    print(f'\n\nemail = {email}, password = {password}\n\n')
    print('*'*15)

    code = 403
    response = {'message': 'not right pw/user name :('}

    user = validate_user(email=email, password=password)

    if user:
        code = 200
        response = user

    return (jsonify(response), code)


@app.route('/enqueue-submit', methods=['POST'])
def handle_enqueue_submit():
    """Store form data"""

    # import pdb; pdb.set_trace()

    title = request.json.get('title')
    desiredOutcome = request.json.get('desiredOutcome')
    description = request.json.get('description')
    background = request.json.get('background')
    furtherInfo = request.json.get('furtherInfo')
    efforts = request.json.get('efforts')
    print('\n'*5, '*'*20, title)
    print(f'desiredOutcome={desiredOutcome}, description={description}, background={background}, furtherInfo={furtherInfo}, efforts={efforts}')
    print('*'*20,'\n'*5)
    return jsonify('YAS')


@app.route('/dequeue-submit', methods=['POST'])
def handle_dequeue_submit():
    """Deactivate queue message"""
    
    card = request.json.get('card')

    print('*'*8, '\n', card, '\n', '*'*8)

    return jsonify('journey to the archive!')


if __name__ == '__main__':
    
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0', port='5000')
