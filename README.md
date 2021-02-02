real MVP feature: 
use react
<!-- understand react router -->
use react bootstrap / css grid / flexbox
- [ ] users can login as staff or students
    - [x] make mock login data
    - [x] server route
    - [x] make login form
    - [x] logic about what logged in users see
    - [x] hold staff/student in state in <Main />
    - [ ] come up with better fake user name react pun
- [x] users can see cards holding student queue request
- [ ] cards can be dequeued -> sent to archive
- [x] users can see a form that posts info to the server
    - "students fill out forms with
    - [ ] desired outcome, 
    - [ ] current behavior, 
    - [ ] things I've tried, 
    - [ ] how I got here, 
    - [ ] other info
    - and then it becomes a little card"
- [ ] bug bounty
- [ ] database, data model, routes to retrieve/update db * Kat to sally forth solo
- [ ] use React's `session` to keep users login

nice-to-haves:
- [ ] users can unfold chat/thread area and have detailed discussions
    - "and each card has an attached chat area that can unfold"
- [ ] users can tag cards
- [ ] maybe integrate with discord
- [ ] staff location/attention indicator (who's being seen presently)
- [ ] @ another staff for additional assistance
- [ ] cards should be draggable
- [ ] use react to make modal with state
- [ ] create JS queue class
- [ ] create heap for priority
- [ ] handle pair questions

explore:
- [ ] Frodo API * Athelia solo quest

will not use (for this project):
- [ ] react router
 
Components
----------
    App
        Header
        Main
            LoginForm (when not logged in)
            Queue (when logged in)
                Card
                    <!-- Staff -->
                    Chat
                    Dequeue (logged in, as staff)
            Enqueue (logged in, as student)
                EnqueueForm
            ArchiveQueue (when logged in)
                Card
                    Chat
        Footer
 




<!-- Co-authored-by: Katrina Huber-Juma <katrina.huber@gmail.com>" -->

links:
https://reactjs.org/tutorial/tutorial.html