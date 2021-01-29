"use strict";

// const { checkPropTypes } = require("prop-types"); // where did this come from?

function Card(props){
  
  if (props.showDequeue){
    return ( <div className="card">
      <h1>{props.studentName}</h1>
      <img src={props.imgUrl}/>
      <p>{props.question}</p>
      <button>Dequeue</button>
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