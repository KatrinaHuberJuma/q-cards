"use strict";
// Question: Why "unreachable code after return statement" --is this still happening?

function Queue(props){
  // TODO: write a utility to wrap fetch
  
  // TODO: put this junk in a use effect for when cards data changes....
  // except it's fine until we have a changing state
    function makeCards() {
      const cards = [];
      for(const card of props.activeCardData){
        if (card.isActive) {
          cards.push(
            <Card 
              handleDequeue={props.handleDequeue}
              studentName={card.studentName}
              imgUrl={card.imgUrl}
              question={card.question}
              showDequeue={props.isStaff}
            />
        )
        }
      }
      return cards

      // can also use map 
      // return activeCardData.map(card => {

      // })
    }
    
    const cards = makeCards();

    return (
      <div className="queue">
        {cards.length > 0 ? cards : <EmptyGif /> }
      </div>
    )
  }
  


function EmptyGif() {
  // TODO: array of happy gifs to randomly choose from
  return (
      <img src="https://media.giphy.com/media/3o7bu39B95jW5bBJGU/giphy.gif" />
  )
}