"use strict";

const { checkPropTypes } = require("prop-types");

function QueueCard(props){
  return ( <div>
    <h1>{props.studentName}</h1>
    <img src={props.imgUrl}/>
    <p>{props.question}</p>
  </div>)
}

// < QueueCard studentName="Athelia" imgUrl="urlGoesHere" question="Why? help me!!!!"/>