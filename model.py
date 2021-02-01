from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# instance of SQLAlchemy class from flask_sqlalchemy
# db is an object with certain methods and attributes

class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    is_staff = db.Column(db.Boolean)

    def __repr__(self):
        return f'<User user_id={self.user_id} username={self.username} first_name={self.first_name} last_name={self.last_name} email={self.email} password={self.password}>'



class Plea(db.Model): # TODO is this a terrible name?
    """ plea_id, user_id, title, question, details"""

    __tablename__ = 'pleas'

    plea_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False) # TODO probably should be one to many, because pairs
    title = db.Column(db.String, nullable=False)
    question = db.Column(db.String, nullable=False)
    details = db.Column(db.String)

    student = db.relationship('User', backref='pleas')
    

    def __repr__(self):
        
        return f"<Plea plea_id = {self.plea_id}, title = {self.title}>"




    

# =================

def connect_to_db(flask_app, db_uri='postgresql:///qtestdb', echo=True):
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