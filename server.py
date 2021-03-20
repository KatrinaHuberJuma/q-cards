from flask import Flask, request, render_template, jsonify, session
from random import choice, randint
from mock_data import queue_cards, users
from helpers import *
from model import *


app = Flask(__name__)
app.secret_key = 'ash nazg durbatuluk, ash nazg gimbatul'


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
        session['user_id'] = user['user_id'] # we dictified the user in validate_user

    return (jsonify(response), code)


@app.route('/user.json')
def return_user_json():

    print('yo')

    user_id = request.args.get('userId')
    print('*'*5, f'user_id = {user_id}', '*'*5)
    return jsonify(User.query.get(user_id).to_dict())


@app.route('/enqueue-submit', methods=['POST'])
def handle_enqueue_submit():
    """Store form data"""

    # import pdb; pdb.set_trace()

    title = request.json.get('title')
    desired_outcome = request.json.get('desiredOutcome')
    description = request.json.get('description')
    background = request.json.get('background')
    further_info = request.json.get('furtherInfo')
    efforts = request.json.get('efforts')
    print('\n'*5, '*'*20, title)
    print(f'desired_outcome={desired_outcome}, description={description}, background={background}, further_info={further_info}, efforts={efforts}')
    print('*'*20,'\n'*5)

    create_question(title=title, 
                    author_id=session['user_id'],
                    desired_outcome=desired_outcome,
                    description=description, 
                    background=background, 
                    further_info=further_info, 
                    efforts=efforts)

    return jsonify('YAS')


@app.route('/dequeue-submit', methods=['POST'])
def handle_dequeue_submit():
    """Deactivate queue message"""
    
    question_id = request.json.get('questionId') # TODO for reals make that util
    print('*'*8, '\nid:', question_id, '\n', '*'*8)
    question = Question.query.get(question_id)
    print('*'*8, '\nbefore', question, '\n', '*'*8)

    question.is_active = False

    db.session.commit()
    print('*'*8, '\nafter', question, '\n', '*'*8)

    return jsonify('journey to the archive!')


if __name__ == '__main__':
    
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0', port='5000')
