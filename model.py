from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()
# instance of SQLAlchemy class from flask_sqlalchemy
# db is an object with certain methods and attributes

class User(db.Model):
    """A user, student or staff"""

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

    def to_dict(self):
        is_staff = self.job_title.lower() in {'instructor', 'ta', 'staff', 'wizard'} # TODO: this is kinda hacky
        squysh_count = self.count_squyshes() if is_staff else None

        return {
                'user_id': self.user_id,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'email': self.email,
                'password': self.password,
                'img_url': self.img_url,
                'computer': self.computer,
                'github': self.github,
                'job_title': self.job_title,
                'is_staff': is_staff,
                'squysh_count': squysh_count
        }

    def squyshes_dict(self): # WIP
        squyshes = Appearance.query.filter(Appearance.rescuer_id == self.user_id,
                                           Appearance.resolved == True).all()
        for squysh in squyshes:
            squysh.to_dict()

    def count_squyshes(self): # TODO: cooler query to count
        """All successful Queue Appearances by User"""
        squysh_count = len(Appearance.query.filter(Appearance.rescuer_id == self.user_id,
                                                   Appearance.resolved == True).all())
        return squysh_count


    def __repr__(self):
        return f'<User user_id={self.user_id} job_title={self.job_title} first_+last_name={self.first_name} {self.last_name}>'


class Appearance(db.Model):
    """A queue visit by (usually) staff to a student waiting for help."""

    __tablename__ = 'appearances'

    appearance_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    staff_notes = db.Column(db.String)
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.now())
    end_time = db.Column(db.DateTime, nullable=False, default=datetime.now())
    resolved = db.Column(db.Boolean, nullable=False, default=False)
    question_id = db.Column(db.Integer,
                        db.ForeignKey('questions.question_id'))
    rescuer_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'))

    question = db.relationship('Question', backref='appearances')
    rescuer = db.relationship('User', backref='appearances')

    def to_dict(self):
        return {
                'appearance_id': self.appearance_id,
                'rescuer_id': self.rescuer_id, # TODO: do we want dictß or idß?
                'question_id': self.question_id,
                'staff_notes': self.staff_notes,
                'start_time': self.start_time,
                'end_time': self.end_time,
                'resolved': self.resolved,
        }

    def __repr__(self):
        return f'<Appearance {self.appearance_id} question_id={self.question_id} rescuer_id={self.rescuer_id}>'



class Question(db.Model):
    """A queue request posed by a student asking for help."""

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
    further_info = db.Column(db.String)
    efforts = db.Column(db.String)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    author = db.relationship('User', backref='questions', foreign_keys=[author_id])
    pair = db.relationship('User', backref='pair_questions', foreign_keys=[pair_id])

    def to_dict(self):
        return {
                'question_id': self.question_id,
                'author': self.author.to_dict(),
                'pair': self.pair.to_dict() if self.pair else {},
                'title': self.title,
                'desired_outcome': self.desired_outcome,
                'description': self.description,
                'background': self.background,
                'further_info': self.further_info,
                'efforts': self.efforts,
                'is_active': self.is_active,
        }

    def __repr__(self):

        return f'<Question question_id={self.question_id}, title={self.title}, is_active={self.is_active}, author_id={self.author_id}>'





    

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