from model import User, Plea, connect_to_db, db
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
            is_staff = True
        )

khj = User( first_name = "Katrina", 
            last_name = "Huber-Juma", 
            email = "email2@email.email", 
            password = "password"
        )

p1 = Plea(  title = "Weekend is over", 
            question = "Where did all the time go?", 
            details = "Like I'm happy to get back to work and see everyone, but I thought I'd accomplish more, you know?",
            student = khj
            )

db.session.add(ac)
db.session.add(p1)
db.session.commit()