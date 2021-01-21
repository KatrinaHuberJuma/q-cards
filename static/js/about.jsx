"use strict";

function Bio(){
  return (
    <React.Fragment>
      My name is Balloonicorn! I have awesome friends.
    </React.Fragment>
  )
}

ReactDOM.render(
  <Bio />, document.querySelector('#bio')
)