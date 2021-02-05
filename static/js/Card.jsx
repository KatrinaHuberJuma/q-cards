"use strict";

// const { checkPropTypes } = require("prop-types"); // where did this come from?

function Card(props){
  
  // const handleDequeue = (evt) => {
  //   evt.preventDefault();
  //   console.log(props);
  //   props.isActive = false;
  // }

  const cardHandleDequeue = () => {
    props.handleDequeue(props.studentName);
  }

  if (props.showDequeue){
    return ( <div className="card">
      <h1>{props.studentName}</h1>
      <img src={props.imgUrl}/>
      <p>{props.question}</p>
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

// <Card studentName="Athelia" imgUrl="urlGoesHere" question="Why? help me!!!!"/>