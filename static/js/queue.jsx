"use strict";
// TODO: Why "unreachable code after return statement"

function Queue(props){

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

    return (
      <div className="queue">
        {makeCards()}
      </div>
    )
  }
  
