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
    image_url = db.Column(db.String)

    # staff = relationship to one row in staff table, if user is staff
    # student = relationship to one row in students table, if user is student

    def __repr__(self):
        return f'<User user_id={self.user_id} first_name={self.first_name} last_name={self.last_name}>'

class Staff(db.Model):

    __tablename__ = 'staff'

    staff_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    # Question: can we just use the user_id as the primary key and also the foreign key
    job_title = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, 
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    
    user = db.relationship('User', 
                        backref=db.backref('staff', uselist=False))

    def __repr__(self):

        return f'<Staff staff_id={self.staff_id}, job_title={self.job_title}>'


class Student(db.Model):

    __tablename__ = 'students'

    student_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    computer = db.Column(db.String, nullable=False)
    github = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    
    user = db.relationship('User',
                        backref=db.backref('student', uselist=False))
    
    def __repr__(self):

        return f'<Student student_id{self.student_id}, github={self.github}, computer={self.computer}>'







# class Plea(db.Model): # TODO is this a terrible name?
#     """ 
    
#     cols: plea_id, user_id, title, question, details"""

#     __tablename__ = 'pleas'

#     plea_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
#     user_id = db.Column(db.Integer,
#                         db.ForeignKey('users.user_id'),
#                         nullable=False) # TODO probably should be one to many, because pairs
#     title = db.Column(db.String, nullable=False)
#     question = db.Column(db.String, nullable=False)
#     details = db.Column(db.String)

#     student = db.relationship('User', backref='pleas')


# class UserPlea(db.Model):

#     user_plea_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    
    

    # def __repr__(self):
        
    #     return f"<Plea plea_id = {self.plea_id}, title = {self.title}>"




    

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