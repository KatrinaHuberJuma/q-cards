from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# instance of SQLAlchemy class from flask_sqlalchemy
# db is an object with certain methods and attributes

class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    # TODO: Update nullables below once testing complete
    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    img_url = db.Column(db.String)
    computer = db.Column(db.String)
    github = db.Column(db.String) #TODO: put back non-nullability
    job_title = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<User user_id={self.user_id} job_title={self.job_title} f+l name={self.first_name} {self.last_name}>'


class Question(db.Model): # TODO is this a terrible name?
    """ 
    
    cols: plea_id, user_id, title, question, details"""

    __tablename__ = 'questions'

    question_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    author_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    pair_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'))
    # TODO: lab_id
    title = db.Column(db.String, nullable=False)
    desired_outcome = db.Column(db.String)
    description = db.Column(db.String)
    background = db.Column(db.String)
    furtherInfo = db.Column(db.String)
    efforts = db.Column(db.String)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    author = db.relationship('User', backref='questions', foreign_keys=[author_id])
    pair = db.relationship('User', backref='pair_questions', foreign_keys=[pair_id])

    def __repr__(self):

        return f'<Question question_id={self.question_id}, title={self.title}, author_id={self.author_id}>'





    

# =================

def connect_to_db(flask_app, db_uri='postgresql:///qtestdb', echo=True): 
    # FIXME maybe better db name?
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')




if __name__ == '__main__':
    from server import app

    connect_to_db(app)
    print("Connected to DB.")