import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/game' component={Game} />
            <Route path='/leaderboard' component={LeaderBooard} />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
