from model import *
import os 
import server

os.system('dropdb qtestdb') 
os.system('createdb qtestdb')

connect_to_db(server.app)
db.create_all()


ac = User(  first_name = "Athelia", 
            last_name = "Crosmun", 
            email = "email@email.email", 
            password = "password",
            computer='mac',
            github='athelia',
            job_title='student'
        )

khj = User( first_name = "Katrina", 
            last_name = "Huber-Juma", 
            email = "email2@email.email", 
            password = "password",
            job_title='student'
        )



q1 = Question(  title = "Weekend is over", 
            description = "Where did all the time go?", 
            desired_outcome = "Like I'm happy to get back to work and see everyone, but I thought I'd accomplish more, you know?",
            author = khj
            )

q2 = Question(  title = "I was following a fox", 
            description = "all swallowed in their coats", 
            desired_outcome = "with scarves of red tied round their throats",
            author = ac,
            pair=khj
            )


# db.session.add(ac)
db.session.add(q1)
# db.session.add(khj)
db.session.add(q2)
db.session.commit()