## Real MVP feature: 
- use react
<!-- understand react router -->
- use react bootstrap / css grid / flexbox
## Detailed MVP features:
- [x] users can login as staff or students
    - [x] make mock login data
    - [x] server route
    - [x] make login form
    - [x] logic about what logged in users see
    - [x] hold staff/student in state in <Main />
- [x] users can see cards holding student queue request
- [x] cards can be dequeued -> sent to archive
- [x] users can see a form that posts info to the server
    - "students fill out forms with
    - [x] desired outcome, 
    - [x] current behavior, 
    - [x] things I've tried, 
    - [x] how I got here, 
    - [x] other info
    - and then it becomes a little card"
- [x] database
- [x] data model
- [x] routes to retrieve/update db
- [x] use React's `session` to keep users login *** UP NEXT: trudge into mordor and learn localStorage ***
- [ ] bug bounty
- [ ] web sockets *** UP NEXT.next ***

## Refactorings
- conditional rendering with ternary expression
    - [x] in card
    - [x] in main
- [x] sort active and inactive cards on the backend (maybe still one route with url arg/options header?)
- [ ] `Queue` will perform active card fetch, `Archive` will fetch the inactive cards
- [ ] move fetching cards to own function (e.g. `updateCards`) and call from within `useEffect` in `Main`. then can call `updateCards` whenever the data should change
- [ ] put `makeCards()` of `Queue` and `Archive` into a useEffect to prevent infinite loops/slow downs
- [ ] investigate queue + archive order

## Nice-to-haves:
- [ ] users can unfold chat/thread area and have detailed discussions
    - "and each card has an attached chat area that can unfold"
- [ ] users can tag cards
- [ ] maybe integrate with discord
- [ ] staff location/attention indicator (who's being seen presently)
- [ ] @ another staff for additional assistance
- [ ] cards should be draggable
- [x] use react to make modal with state
- [ ] create heap for priority
- [x] handle pair questions
- [x] cute empty queue gif (a beach?)
- [ ] htttpcats for http status codes
- [ ] add Save Our Queue timer that alerts staff if a question has been unaddressed for x amount of time
- [ ] create SomeChillComponent (reason tbd)
- [ ] staff away photos/statuses

## Explore:
- [x] Frodo API * Athelia solo quest -> boo, API is unhelpful
- [ ] CSS Flexbox
- [ ] React's version of `session`

## Will not use (for this project):
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
<!-- Co-authored-by: Athelia Crosmun <hi@athelia.codes>" -->

tutorial/informational links:
https://reactjs.org/tutorial/tutorial.html
https://reactjsexample.com/tag/drag-drop/
https://github.com/strml/react-draggable
https://programmingwithmosh.com/react/localstorage-react/
https://www.code-boost.com/react-local-storage/

Important links:
https://dbdiagram.io/d/6024019780d742080a3a04c4
https://balsamiq.cloud/sux2im4/pauie1u/r2278