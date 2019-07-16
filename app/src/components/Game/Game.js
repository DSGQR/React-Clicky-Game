import React, { Component } from 'react'
import Pokemon from './pokemon.json'
import PokemonCard from './gameComponents/PokemonCard'
import shuffle from 'shuffle-array'
import Grid from '@material-ui/core/Grid'
import Result from './gameComponents/Result'
import firebase from 'firebase'

class Game extends Component {
  state = {
    pokemon: [],
    clicked: [],
    count: 0,
    complete: false
  }

  componentDidMount = () => {
    this.setState({ pokemon: shuffle(Pokemon) })
  }
  handleClick = name => {
    if (this.state.clicked.indexOf(name) !== -1) {
    firebase.database().ref(`/users/${this.props.uid}`).once('value')
      .then(r => r.val())
      .then(user => {
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
              let scores = user[key].scores ? user[key].scores : []
            scores.push(this.state.count)
            firebase.database().ref(`/users/${this.props.uid}/${key}`).update({ scores: scores })
          }
        }
      })
    this.setState({ complete: true })
    } else {
      let clickedArr = this.state.clicked
      clickedArr.push(name)
      let count = this.state.count
      count++
      this.setState({ pokemon: shuffle(Pokemon), clicked: clickedArr, count: count })
    }
  }
  handleClose = () => {
    this.setState({ complete: false });
  }

  render() {
    return (
      <Grid alignContent='center' style={{ margin: 'auto', minHeight: '94vh', marginLeft: '5%' }} container spacing={32}>
        <Result count={this.state.count} handleClose={this.handleClose} complete={this.state.complete} />
        {
          this.state.pokemon.map((pokemon, index) => index < 16 ? <Grid justify='center' item xs={3} onClick={() => this.handleClick(pokemon.name)}><PokemonCard name={pokemon.name} image={pokemon.image} /></Grid> : null)
        }
      </Grid>
    )
  }
}

export default Game
