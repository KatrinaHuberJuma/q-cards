"use strict";
// TODO: Why "unreachable code after return statement"

function Queue(){

    const [cardsData, setCardsData] = React.useState([]);
    
    React.useEffect(() => {
        fetch("/cards.json")
        .then(response => response.json())
        .then(data => setCardsData(data))
    }, [])

    const cards = [];

    for(const card of cardsData){
        cards.push(
            <Card 
                studentName={card.studentName}
                imgUrl={card.imgUrl}
                question={card.question}
            />
        )
    }

    return (
      <React.Fragment>
        <h1>this exists</h1>
        {cards}
      </React.Fragment>
    )
  }
  
  ReactDOM.render(
    <Queue />, document.querySelector('#app')
  )