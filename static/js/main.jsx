"use strict";
function Main() {
  
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isStaff, setIsStaff] = React.useState(false)
  const [cardsData, setCardsData] = React.useState([]);

  const handleDequeue = (studentName) => {
    console.log(`welcome to the archive, ${studentName}`);
    setCardsData(cardsData.map(card => {
      card.isActive = card.studentName === studentName ? false : card.isActive;
      return card;
    }))
  }

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  }

  const declareStaff = () => {
    // alert("yup, staff")
    console.log('you are a mighty staff member, I am so honored by your presence')
    setIsStaff(true);
  }

  // Question: why does this eternally fetch when not in useEffect?
  // also why does it run again after you log in
  React.useEffect(() => {
    // TODO: move to own function and call from within here
    fetch("/cards.json")
    .then(response => response.json())
    .then(data => setCardsData(data))
  }, [])
  
  // console.log(cardsData);
  const activeCardData = [];
  const miniCardData = [];
  
  for (const datum of cardsData){
    if (datum.isActive){
      // console.log(`I'm an active datum ${datum.studentName}`)
      activeCardData.push(datum);
    } else {
      // console.log(`I'm a passive aggressive datum ${datum.studentName}`)
      miniCardData.push(datum);
    }
  }

  // Question: why did the 'else if' Queue component care that it didn't have 
  // a prop activeCardData when the 'if' Queue component was getting rendered?
  if (loggedIn && isStaff) {
    return (
      <React.Fragment>
        <h1>Bat cave access granted</h1>
        <Queue isStaff={isStaff} activeCardData={activeCardData} handleDequeue={handleDequeue}/>
        <Archive miniCardData={miniCardData} />
      </React.Fragment>
    )
  } else if (loggedIn) {
      return (
        <React.Fragment>
          <h1>Bat cave access granted</h1>
          <Enqueue />
          <Queue isStaff={isStaff} activeCardData={activeCardData} />
          <Archive miniCardData={miniCardData} />
        </React.Fragment>
      )
  } else {
    return ( 
      <React.Fragment>
        <LoginForm handleLogin={handleLogin} declareStaff={declareStaff} />
      </React.Fragment>
    )
  }
}

