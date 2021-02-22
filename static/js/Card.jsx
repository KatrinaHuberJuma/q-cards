"use strict";

function Card({ showDequeue, question, handleDequeue} ){

  const cardHandleDequeue = () => {
    handleDequeue(question.question_id);
    const options = { 
      method: 'POST',
      body: JSON.stringify({
        questionId: question.question_id // TODO for reals make that util
      }),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    }

    fetch('/dequeue-submit', options)
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return ( <div className="card">
    <h1>{question.student_name}</h1>
    <img src={question.author.img_url}/>
    <h2>{question.title}</h2>
    <p>{question.description}</p>
    { showDequeue ? <button id={question.question_id} onClick={cardHandleDequeue}>Dequeue</button> : null }
  </div>)
}
