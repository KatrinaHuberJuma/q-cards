"use strict";

function Card({studentName, showDequeue, imgUrl, question, handleDequeue} ){

  const cardHandleDequeue = () => {
    handleDequeue(studentName);
    const options = { 
      method: 'POST',
      body: JSON.stringify({'card': {
        studentName: studentName // TODO: should be question id
      }}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    }

    fetch('/dequeue-submit', options)
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return ( <div className="card">
    <h1>{studentName}</h1>
    <img src={imgUrl}/>
    <p>{question}</p>
    { showDequeue ? <button id={studentName} onClick={cardHandleDequeue}>Dequeue</button> : null }
  </div>)
}
