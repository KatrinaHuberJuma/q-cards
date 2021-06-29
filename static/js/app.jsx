"use strict";

const Router = ReactRouterDOM.BrowserRouter;
const {Link, Switch, Route} = ReactRouterDOM;

function App() {
  return(
    <Router>
      <Link to="/">Queue</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      
      <Switch>
        <Route path="/leaderboard">
          <Header />
          <Leaderboard />
          <Footer />
        </Route>
        <Route path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
      </Switch>
    
    </Router>
  )
}

ReactDOM.render(
    <App />, document.querySelector('#app')
  )