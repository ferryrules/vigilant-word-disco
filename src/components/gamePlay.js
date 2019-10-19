import React, {useState, Fragment} from 'react';
import { Grid, Header, Form } from 'semantic-ui-react'

function GamePlay(props) {
  const { allWords, setWinLvl } = props

  const [goodGuess, setGoodGuess] = useState([])
  const [badGuess, setBadGuess] = useState([])

  let level = 1
  const thisLvl = allWords[level-1].split('')
  const uniqW = [...new Set(thisLvl)]
  const uniqG = [...new Set(goodGuess)]
  const thisWord = thisLvl.map(w=>{
    return (
      <Grid.Column width={1} textAlign='center'>
        {goodGuess.includes(w) ? w.toUpperCase() : '____'}
      </Grid.Column>
    )
  })

  const myGuess = e => {
    if (allWords[level-1].includes(e)) {
      setGoodGuess([...goodGuess, e])
      if (uniqW.sort().join('') === uniqG.sort().join('')) {
        setWinLvl(true)
      }
    } else {
      setBadGuess([...badGuess, e.toUpperCase()])
    }
  }

  return (
    <Fragment>
      <Grid.Row textAlign='center'>
      <Grid.Column textAlign='center'>
        <Header as='h1'>LEVEL: {`${level}`}</Header>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column></Grid.Column>
        {thisWord}
        <Grid.Column></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Form.Field textAlign='center'>
          <label>Enter Your Guess</label>
          <input size='mini' onChange={(e)=>myGuess(e.target.value.toLowerCase())} />
          <button onClick={()=>{}}>Submit</button>
        </Form.Field>
      </Grid.Row>
      <Header as='h3'>
        Bad Guesses: {badGuess.join(' ')}
      </Header>
    </Fragment>
  )
}

export default GamePlay
