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
            password = "password"
        )

khj = User( first_name = "Katrina", 
            last_name = "Huber-Juma", 
            email = "email2@email.email", 
            password = "password"
        )

ac_staff = Staff(
    job_title = 'Goddess of Greatness',
    user = ac
)

khj_student = Student(  computer='mac', 
                        github='katrinahuberjuma', 
                        user=khj)

# p1 = Plea(  title = "Weekend is over", 
#             question = "Where did all the time go?", 
#             details = "Like I'm happy to get back to work and see everyone, but I thought I'd accomplish more, you know?",
#             student = khj
#             )

# db.session.add(ac)
db.session.add(ac_staff)
# db.session.add(khj)
db.session.add(khj_student)
db.session.commit()