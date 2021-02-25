"use strict";
function Main() {
  
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isStaff, setIsStaff] = React.useState(false)
  const [cardsData, setCardsData] = React.useState([]);
  const [username, setUsername] = React.useState('');

  

  const handleDequeue = (questionId) => {
    // TODO: UP NEXT we no longer need to sort here, dequeue button currently broken

    /* 
    do a fetch to new server route dequeue_submit --modify dequeue_submit to change question.is_active to false
    
    */
    console.log(`welcome to the archive, question number ${questionId}`);
    fetchCards();
  }

  const handleLogin = (userId) => {
    setLoggedIn(!loggedIn);
    userId ? localStorage.setItem('userId', userId) : localStorage.setItem('userId', null);
    console.log(`here is your camely userID ${localStorage.getItem('userId')}`)
  }

  const declareStaff = () => {
    // alert("yup, staff")
    console.log(`Look what we found in localStorage~ ${localStorage.getItem('jobTitle')}`)
    console.log('you are a mighty staff member, I am so honored by your presence')
    setIsStaff(true);
  }

  function fetchCards() {
    // TODO: UP NEXT move this out of component?
    fetch("/cards.json")
    .then(response => response.json())
    .then(data => setCardsData(data))
  }

  React.useEffect(fetchCards, [])
  
  // React.useEffect(()=>{setCardsData(fetchCards)}, [])
  // console.log(cardsData);
  const activeCardData = cardsData.active;
  const miniCardData = cardsData.not_active;

  if (loggedIn) {
    return (
      <React.Fragment>
        <h1>Bat cave access granted { isStaff ? `to illustrious ${localStorage.getItem('jobTitle')}` : null } </h1>
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

