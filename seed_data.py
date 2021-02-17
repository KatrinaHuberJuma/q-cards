from model import *
import os 
import server

os.system('dropdb qtestdb') 
os.system('createdb qtestdb')

connect_to_db(server.app)
db.create_all()

eve = User(
           first_name='empty',
           last_name='eve',
           email='',
           password='',
           job_title='staff'
           )

ac = User(  first_name = "Athelia", 
            last_name = "Crosmun", 
            email = "email@email.email", 
            password = "password",
            computer='mac',
            github='athelia',
            job_title='student',
            img_url='https://fellowship.hackbrightacademy.com/media/CACHE/images/staff/athelia/d3a4891536121a55505ac626945056d9.jpeg'
        )

khj = User( first_name = "Katrina", 
            last_name = "Huber-Juma", 
            email = "email2@email.email", 
            password = "password",
            job_title='student',
            img_url='https://fellowship.hackbrightacademy.com/media/CACHE/images/students/selfie/d5cb095e71fd4f86f87fed80c05d93d2.jpg'
        )

ab = User(
          first_name='Andrew',
          last_name='Blum',
          email = "email3@email.email", 
          password = "password",
          job_title='student',
          img_url='https://fellowship.hackbrightacademy.com/media/CACHE/images/staff/andrew/32238b47f4ad742072e16f0ba1cb1794.jpeg'
          )

susan = User(
             first_name='lazy',
             last_name='susan',
             email='s',
             password='s',
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

q3 = Question(
              title='Ready for a code review',
              author=ab
             )
# db.session.add(ac)
db.session.add(q1)
# db.session.add(khj)
db.session.add(q2)
db.session.add(q3)
db.session.add(eve)
db.session.add(susan)
db.session.commit()