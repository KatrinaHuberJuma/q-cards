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

  React.useEffect(() => {
    // Question: move down to end of this file or to another file?
    // TODO: move to own function (e.g. updateCards) and call from within here. then can call updateCards whenever the data should change
    fetch("/cards.json")
    .then(response => response.json())
    .then(data => setCardsData(data))
  }, [])
  
  // console.log(cardsData);
  const activeCardData = cardsData.active;
  const miniCardData = cardsData.not_active;
  
  // // TODO: better in a useEffect because no need to re-render every time component mounts, only whenever data is actually changed
  // // or better: have back end do more data manipulation
  // for (const datum of cardsData){
  //   if (datum.isActive){
  //     // console.log(`I'm an active datum ${datum.studentName}`)
  //     activeCardData.push(datum);
  //   } else {
  //     // console.log(`I'm a passive aggressive datum ${datum.studentName}`)
  //     miniCardData.push(datum);
  //   }
  // }

  if (loggedIn) {
    return (
      <React.Fragment>
        <h1>Bat cave access granted</h1>
        { isStaff ? null : <Enqueue /> } 
        <Queue isStaff={isStaff} activeCardData={activeCardData} handleDequeue={handleDequeue}/>
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

