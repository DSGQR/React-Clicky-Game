import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Game from './components/Game'
import Home from './components/Home'
import LeaderBoard from './components/LeaderBoard'


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/game' component={Game} />
            <Route path='/leaderboard' component={LeaderBoard} />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
