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
            job_title='staff',
            img_url='https://elveswriter.files.wordpress.com/2012/01/eowyn.jpg'
            )


gandalf = User(
                first_name='Gandalf',
                last_name='the Grey',
                email='speakfriendandenter',
                password='mellon',
                job_title='wizard',
                img_url='https://i.pinimg.com/originals/de/0c/a0/de0ca05add40b7504a66d94f5ab3dbbc.jpg'
)

seema = User(
                first_name='Seema',
                last_name='Ullal',
                email='og@hb',
                password='password',
                job_title='instructor',
                img_url='https://avatars.githubusercontent.com/u/8728285?s=460&u=5ba6bbf957d07f835a5cecd35f63776ab213fd92&v=4'
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
                job_title='student',
                img_url='https://i.pinimg.com/564x/38/f3/36/38f336f53a26ecee87c79ffa3c1f81f3.jpg'
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

q3 = Question(  title = "My greatness is not being leveraged properly", 
            description = "I'm an engineer, not an ornament. Give me something to do!", 
            desired_outcome = "lots of fun problems to solve",
            author = seema,
            pair=ab
            )

q4 = Question(
            title='Ready for a code review',
            author=ab
            )

iq1 = Question(  title = "How do we cross Caradhras?", 
            description = "much snow, evil intent, fell voices on the wind", 
            desired_outcome = "being on the other side",
            author = ac,
            pair=khj,
            is_active=False
            )   

iq2 = Question(  title = "to keep their little heads", 
            description = "from falling in the snow", 
            desired_outcome = "I turned around an there you go",
            author = ac,
            pair=khj,
            is_active=False
            )  

a = Appearance(question=iq1, 
               rescuer=gandalf, 
               staff_notes='We must go down into the depths of Khazad-dûm and cross through the darkness',
               resolved=True)

db.session.add_all([iq1, iq2, q1, q2, q3, eve, susan, gandalf, seema, a]) 
# some users are implicitly added by relationship to questions
db.session.commit()

q2.make_appearance(gandalf.user_id)