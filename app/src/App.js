import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Game from './components/Game'
import Home from './components/Home'
import LeaderBoard from './components/LeaderBoard'
import Navbar from './components/Navbar'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
  apiKey: 'AIzaSyDNI18xuniXEQeRutDYj3cdjhFsaOhAZcc',
  authDomain: 'pokemonclickygame.firebaseapp.com',
  databaseURL: 'https://pokemonclickygame.firebaseio.com',
  projectId: 'pokemonclickygame',
  storageBucket: 'pokemonclickygame.appspot.com',
  messagingSenderId: '427848233086'
})

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
}

class App extends Component {
  state = {
    isSignedIn: false,
    name: '',
    uid: ''
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    )
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref(`/users/${user.uid}`).once('value')
        .then(r => r.val())
        .then(dbUser => {
          this.setState({ name: user.displayName, uid: user.uid })
          if (!dbUser) {
            firebase.database().ref(`/users/${user.uid}`).push({
              name: user.displayName,
              scores: []
            })
          }
        })
    })
  }
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    return (
      <>
        <Router>
          <div style={{ backgroundColor: '#9E2A2B' }}>
            <Navbar uiConfig={uiConfig} isSignedIn={this.state.isSignedIn} userName={this.state.name} />
            <Route exact path='/' component={Home} />
            <Route path='/game' component={() => <Game uid={this.state.uid} />} />
            <Route path='/leaderboard' component={LeaderBoard} />
          </div>
        </Router>
      </>
    )
  }
}

export default App
