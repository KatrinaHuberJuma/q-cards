"use strict";

function App() {
    return(
        <React.Fragment>
            <Header />
            <Main />
            <Footer />
        </React.Fragment>
    )
}

ReactDOM.render(
    <App />, document.querySelector('#app')
  )