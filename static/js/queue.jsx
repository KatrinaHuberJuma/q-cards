"use strict";

function Queue(){
    return (
      <React.Fragment>
        <h1>this exists</h1>
        < QueueCard 
            studentName="Athelia" 
            imgUrl="https://fellowship.hackbrightacademy.com/media/CACHE/images/staff/athelia/d3a4891536121a55505ac626945056d9.jpeg"
            question="Jinja template doesn't show my navbar"
        />
        < QueueCard 
            question="Can't get flask route to render template. Getting Method Not Allowed"
            studentName="Kat" 
            imgUrl="https://fellowship.hackbrightacademy.com/media/CACHE/images/students/selfie/d5cb095e71fd4f86f87fed80c05d93d2.jpg"
        />
      </React.Fragment>
    )
  }
  
  ReactDOM.render(
    <Queue />, document.querySelector('#app')
  )