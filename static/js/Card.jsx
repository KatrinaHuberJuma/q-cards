"use strict";

function Card({studentName, showDequeue, imgUrl, question} ){
  // that's props destructuring 
  // TODO remove all the props.

  // const {studentName, showDequeue, imgUrl, question} = props;

  const cardHandleDequeue = () => {
    props.handleDequeue(props.studentName);
    const options = { 
      method: 'POST',
      body: JSON.stringify({'card': {
        studentName: props.studentName // TODO: should be question id
      }}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    }

    fetch('/dequeue-submit', options)
    .then(response => response.json())
    .then(data => console.log(data))
  }
// Question: is this too repetitive, is better possible?
  if (props.showDequeue){
    return ( <div className="card">
      <h1>{props.studentName}</h1>
      <img src={props.imgUrl}/>
      <p>{props.question}</p>
      {/* TODO: handle whether to show dequeue button in ternary */}
      <button id={props.studentName} onClick={cardHandleDequeue}>Dequeue</button>
    </div>)
  }else{
    return ( <div className="card">
      <h1>{props.studentName}</h1>
      <img src={props.imgUrl}/>
      <p>{props.question}</p>
    </div>)
  }
}
