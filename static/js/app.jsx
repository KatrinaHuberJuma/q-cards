"use strict";

console.log(ReactRouterDOM.Link);

function App() {
    return(
        <ReactRouterDOM.BrowserRouter>
            <ReactRouterDOM.Link to="/">Queue</ReactRouterDOM.Link>
            <ReactRouterDOM.Link to="/leaderboard">Leaderboard</ReactRouterDOM.Link>
        
        <ReactRouterDOM.Switch>
            <ReactRouterDOM.Route path="/leaderboard">
                <h1>ermigerd my rouutousoete</h1>
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route path="/">
                <Header />
                <Main />
                <Footer />
            </ReactRouterDOM.Route>
        </ReactRouterDOM.Switch>

        </ReactRouterDOM.BrowserRouter>
    )
}

ReactDOM.render(
    <App />, document.querySelector('#app')
  )