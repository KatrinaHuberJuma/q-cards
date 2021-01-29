"use strict";
// TODO: Why "unreachable code after return statement"

function Queue(props){

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
                  showDequeue={props.isStaff}
              />
          )
      }
      return cards

      // can also use map 
      // return cardsData.map(card => {

      // })
    }

    return (
      <div className="queue">
        {makeCards()}
      </div>
    )
  }
  
