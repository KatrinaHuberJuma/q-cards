"use strict";
// Question: Why "unreachable code after return statement" --is this still happening?

function Queue({handleDequeue, isStaff, activeCardData}){
  // TODO: write a utility to wrap fetch
  
  // TODO: put this junk in a use effect for when cards data changes....
  // except it's fine until we have a changing state
    function makeCards() {

      // const cards = [];
      // for(const card of props.activeCardData){
      //   cards.push(
      //     <Card 
      //       handleDequeue={props.handleDequeue}
      //       studentName={card.author.first_name}
      //       imgUrl={card.author.img_url}
      //       question={card.title}
      //       showDequeue={props.isStaff}
      //     />
      //   )
      // }
      return activeCardData.map(question => {
        return ( 
          <Card 
            handleDequeue={handleDequeue}
            question={question}
            showDequeue={isStaff}
          />
        )
      })
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