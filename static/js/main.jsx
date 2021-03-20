"use strict";

// UI/state: what is my application actually dependent on?
// dependency array: when do those things need to be updated?

// https://kentcdodds.com/blog/dont-sync-state-derive-it  <---- good read

function Main() {
  // style tip: all hooks at top of component
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isStaff, setIsStaff] = React.useState(false);
  const [cardsData, setCardsData] = React.useState({
    activeCardData: [],
    miniCardData: [],
  });
  const [userId, setUserId] = React.useState(null);
  const [needsRefetch, setNeedsRefetch] = React.useState(false); 
  let user = null;


  const numberOfTimesMounted = React.useRef(0);

  numberOfTimesMounted.current = numberOfTimesMounted.current + 1;
  // current is an attribute on useRef thingies (always the same object)

  console.log("Number of times mounted: ", numberOfTimesMounted.current);
  // userId : either null or number
  // if userId is not null, then I have a user w/ first name, last name, isStaff, whatever else
  // better: make userId part of your state and then have a user variable/object (not part of state) that contains the data
  // when userId changes update your user variable

  // let user = null // if this doesn't persist between renders then use useRef to make it persist
  // useEffect(() => {
  //  user = await fetchUser().
  //
  // }, [userId])

  const fetchUser = (userId) => {
    const argsData = JSON.stringify({"userId": userId});
    console.log(`argsData=${argsData}`)
    fetch("/user.json", argsData)
    .then(response => response.json())
    .then(data => { console.log(data); user = data})

    return user;
  }

  React.useEffect(() => {
    user = fetchUser(userId);
  }, [userId])
  
  React.useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLoggedIn(true);
      setUserId(localStorage.getItem("userId"))
    }
  }, []);

  // fetch function, ES6'ed and with Seema's needsRefetch improvement
  const fetchCards = () => {
    // TODO: UP NEXT move this out of component?
    fetch("/cards.json")
    .then(response => response.json())
    .then((data) => {
      setNeedsRefetch(false);
      setCardsData({
        activeCardData: data.active,
        miniCardData: data.not_active,
      })
    });
  }

  React.useEffect(fetchCards, [needsRefetch]);

  function handleDequeue(questionId) {
    console.log(`welcome to the archive, question number ${questionId}`);
    setNeedsRefetch(true);
  }

  // const handleDequeue = (questionId) => {
  //   // TODO: UP NEXT we no longer need to sort here, dequeue button currently broken

  //   /*
  //   do a fetch to new server route dequeue_submit --modify dequeue_submit to change question.is_active to false
  //   */
  //   console.log(`welcome to the archive, question number ${questionId}`);
  //   setNeedsRefetch(true)
  // }

  const handleLogin = (userId) => {
    setLoggedIn(!loggedIn);
    // perhaps: userId is a state initially null; have a useEffect that updates localStorage when userId changes
    userId
      ? localStorage.setItem("userId", userId)
      : localStorage.setItem("userId", null); // local storage isn't ours and could be slow af
    //because a side effect (could be slow), setting in local storage should be in a useEffect
    // if you had some state update that caused a re-render, that re-render is now dependent on localStorage setting

    console.log(`here is your camely userID ${localStorage.getItem("userId")}`);
  };

  const declareStaff = () => {
    // alert("yup, staff")
    // pull things out of local storage once and then use them wherever
    console.log(
      `Look what we found in localStorage~ ${localStorage.getItem("jobTitle")}`
    );
    console.log(
      "you are a mighty staff member, I am so honored by your presence"
    );
    setIsStaff(true);
  };

  // React.useEffect(()=>{setCardsData(fetchCards)}, [])
  // console.log(cardsData);
  // const activeCardData = cardsData.active; // undefined
  // const miniCardData = cardsData.not_active; // ERROR calling not_active on undefined

  // TODO: the following?:
  // if localStorage.getItem('userId')
  // then set loggedIn to be true
  // set isStaff based on a query to backend?
  // bring user object to javascript?
  // and that's all

  // // next condition: if loggedIn....
  //   if (localStorage.getItem('userId')) {
  //     // React.useEffect(()=>{setLoggedIn(true); console.log("using effect not drugs")}, []);
  //     console.log("howdy, localStorage is watching you")
  //     return <h1>lolz</h1>
  // // the below resulted in ALL the errors (activeCardData is undefined, etc)
  //   // if (loggedIn || localStorage.getItem('userId')) {
  //   } else
  // const { activeCardData, miniCardData} = cardsData;

  if (loggedIn) {
    return (
      // fortunately this still works fine for a standard never-been-in-storage user
      <React.Fragment>
        <h1>
          Bat cave access granted{" "}
          {isStaff
            ? `to illustrious ${localStorage.getItem("jobTitle")}`
            : null}{" "}
        </h1>
        {isStaff ? null : <Enqueue />}
        <Queue
          isStaff={isStaff}
          activeCardData={cardsData.activeCardData}
          handleDequeue={handleDequeue}
        />
        <Archive miniCardData={cardsData.miniCardData} />
      </React.Fragment>
    );
  }
  // if (localStorage.getItem('userId')) {
  //     setLoggedIn(true);
  //     return(
  //       <React.Fragment>
  //         <h1>what</h1>
  //         {console.log(activeCardData)}
  //         {console.log(`are you staff? ${isStaff}`)}
  //         <Enqueue />
  //       </React.Fragment>
  //     )
  // }
  return (
    // fortunately this still works fine for a standard never-been-in-storage user
    <React.Fragment>
      <LoginForm handleLogin={handleLogin} declareStaff={declareStaff} />
    </React.Fragment>
  );

  // if (loggedIn) { // but why don't the cards be??? TODO read this https://reactjs.org/docs/error-boundaries.html
  //   return (
  //     // fortunately this still works fine for a standard never-been-in-storage user
  //     <React.Fragment>
  //       <h1>Bat cave access granted { isStaff ? `to illustrious ${localStorage.getItem('jobTitle')}` : null } </h1>
  //       { isStaff ? null : <Enqueue /> }
  //       <Queue isStaff={isStaff} activeCardData={activeCardData} handleDequeue={handleDequeue}/>
  //       <Archive miniCardData={miniCardData} />
  //     </React.Fragment>
  //   )
  //   // this shows up, but we still can't use activeCardData to render the queue or archive :<
  // } else if (localStorage.getItem('userId')){
  //   setLoggedIn(true);
  //   return(
  //     <React.Fragment>
  //       <h1>what</h1>
  //       {console.log(activeCardData)}
  //       {console.log(`are you staff? ${isStaff}`)}
  //       <Enqueue />
  //     </React.Fragment>
  //   )
  // } else {
  //   return (
  //     // fortunately this still works fine for a standard never-been-in-storage user
  //     <React.Fragment>
  //       <LoginForm handleLogin={handleLogin} declareStaff={declareStaff} />
  //     </React.Fragment>
  //   )
  // }
}
