from model import *

def order_questions():
    """Queries db for all questions with users"""
    qq = Question.query.order_by(Question.is_active)
    questions_w_users = qq.options( db.joinedload('author'), 
                                    db.joinedload('pair')).all()

    return questions_w_users


def sort_question_dict(questions):
    """Returns a dictionary with active and inactive keys for question dicts"""

    result = {
            'active': [],
            'not_active': []
    }

    for question in questions:
        if question.is_active:
            result['active'].append(question.to_dict())
        else:
            result['not_active'].append(question.to_dict())

    return result



def validate_user(email, password):
    """ validate user with email and password"""

    u = User.query.filter_by(email=email).first()

    if u.password == password:
        return u.to_dict()

    return None


if __name__ == '__main__':
    from server import app

    connect_to_db(app)

    print(order_questions())
    print(sort_question_dict(order_questions()))