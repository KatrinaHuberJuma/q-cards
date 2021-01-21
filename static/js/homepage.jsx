"use strict";

function Homepage() {
  return (
    <React.Fragment>
      <h2>These cards are super cool!</h2>
      <p><a href="/cards">See the cards</a></p>
      <p><a href="/about">About the author</a></p>
      <img src="/static/img/balloonicorn.jpg" />
    </React.Fragment>
  );
}

ReactDOM.render(<Homepage />, document.querySelector('#app'));
