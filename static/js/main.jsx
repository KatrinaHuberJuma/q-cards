"use strict";

// UI/state: what is my application actually dependent on?
// dependency array: when do those things need to be updated?

// https://kentcdodds.com/blog/dont-sync-state-derive-it  <---- good read

  // fetch function, ES6'ed and with Seema's needsRefetch improvement
  const fetchCards = (setNeedsRefetch, setCardsData) => {
    // TODO: UP NEXT move this out of component?
    console.log("fetching like a puppy")
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

function Main() {
  // style tip: all hooks at top of component
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isStaff, setIsStaff] = React.useState(false);
  const [squyshCount, setSquyshCount] = React.useState(null);
  const [cardsData, setCardsData] = React.useState({
    activeCardData: [],
    miniCardData: [],
  });
  const [userId, setUserId] = React.useState(null);
  const [needsRefetch, setNeedsRefetch] = React.useState(false); 
  let user = null;


  const numberOfTimesMounted = React.useRef(0);

  numberOfTimesMounted.current = numberOfTimesMounted.current + 1;
  // current is an attribute on useRef kinds of things (always the same object)

  console.log("Number of times mounted: ", numberOfTimesMounted.current);
  // userId : either null or number
  // if userId is not null, then I have a user w/ first name, last name, isStaff, whatever else
  // better: make userId part of your state and then have a user variable/object (not part of state) that contains the data
  // when userId changes update your user variable

  // let user = null // if this doesn't persist between renders then use useRef to make it persist
  // useEffect(() => {
  //  user = await fetchUser();
  // }, [userId])

  const fetchUser = (userId) => {
    if (userId) {
      fetch(`/user.json?userId=${userId}`)
      .then(response => response.json())
      .then(data => { 
        console.log(data); 
        user = data;
        setSquyshCount(data.squysh_count);
      })
      
    }
    return user
  }

  React.useEffect(() => {
    user = fetchUser(userId);
  }, [userId])
  
  React.useEffect(() => {
    let localStorageUserId = JSON.parse(localStorage.getItem("userId"))
    if (localStorageUserId) {
      setLoggedIn(true);
      setUserId(localStorageUserId);
    }
  }, []);


  React.useEffect(() =>{fetchCards(setNeedsRefetch, setCardsData)}, [needsRefetch]);

  function handleDequeue(questionId) {
    console.log(`welcome to the archive, question number ${questionId}`);
    setNeedsRefetch(true);
  }

  const handleLogin = (userId) => {
    setLoggedIn(true);
    // perhaps: userId is a state initially null; have a useEffect that updates localStorage when userId changes
    // TODO: keep working on how to prevent a query to user.json with a userId = null
    if(userId){
      console.log(`handleLogin before, user is  ${user}`)
      localStorage.setItem("userId", userId)
      setUserId(userId)
    }else{
      localStorage.setItem("userId", null); // local storage isn't ours and could be slow af
    }
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
      "you are a mighty staff member, I am so honored by your presence",
      // `your squyshes to date are ${user.squysh_count}`
    );
    setIsStaff(true);
  };

  const handleLogout = () => {
    console.log("don't shame the thenables (JS is a lifestyle)");
    setUserId(null);
    setLoggedIn(false);
    localStorage.setItem("userId", null);
    user = null;
  }

  if (loggedIn) {
    return (
      <React.Fragment>
        <Logout handleLogout={handleLogout}/>
        <h1>
          Bat cave access granted
          {isStaff
            ? ` to illustrious ${localStorage.getItem("jobTitle")} with squysh count ${squyshCount}`
            : null}
        </h1>
        {isStaff ? null : <Enqueue setNeedsRefetch={setNeedsRefetch}/>}
        <Queue
          isStaff={isStaff}
          userId={userId}
          activeCardData={cardsData.activeCardData}
          handleDequeue={handleDequeue}
          squyshCount={squyshCount}
          setSquyshCount={setSquyshCount}
        />
        <Archive miniCardData={cardsData.miniCardData} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <LoginForm handleLogin={handleLogin} declareStaff={declareStaff} />
    </React.Fragment>
  );

}
