"use strict";
// TODO: Why "unreachable code after return statement"

function Queue(){

    const [cardsData, setCardsData] = React.useState([]);
    

    React.useEffect(() => {
        // TODO: move to own function and call from within here
      fetch("/cards.json")
      .then(response => response.json())
      .then(data => setCardsData(data))
    }, [])


    function makeCards() {
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
      return cards

      // can also use map 
      // return cardsData.map(card => {

      // })
    }

    return (
      <React.Fragment>
        <h1>this exists</h1>
        {makeCards()}
      </React.Fragment>
    )
  }
  
  ReactDOM.render(
    <Queue />, document.querySelector('#app')
  )