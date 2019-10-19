import React, {useState, Fragment} from 'react';
import { Grid, Header, Form, Button, Label } from 'semantic-ui-react'

function GamePlay(props) {
  const { allWords, setLoseGame } = props

  const [initGuess, setInitGuess] = useState('')
  const [goodGuess, setGoodGuess] = useState([])
  const [badGuess, setBadGuess] = useState([])

  const [winLvl, setWinLvl] = useState(false)

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
    } else {
      setBadGuess([...badGuess, e.toUpperCase()])
    }
    if (badGuess.length === 6) {
      setLoseGame(true)
    }
    if (uniqW.sort().join('') === uniqG.sort().join('')) {
      setWinLvl(true)
    }
    setInitGuess('')
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
        {(uniqW.sort().join('') === uniqG.sort().join('')) ? "You win damnit!" :
          badGuess.length === 6 ?
          setLoseGame(true) :
          thisWord}
        <Grid.Column></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column></Grid.Column>
        <Grid.Column textAlign='center'>
          <Form>
            <Form.Group inline>
              <label>Enter Your Guess</label>
              <Form.Input value={initGuess} width={1} onChange={(e)=>setInitGuess(e.target.value.toLowerCase())}/>
            </Form.Group>
            <Button type='submit' onClick={()=>{myGuess(initGuess)}}>Submit</Button>
          </Form>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid.Row>
      <Header as='h3'>
        Bad Guesses: {badGuess.join(' ')}
      </Header>
    </Fragment>
  )
}

export default GamePlay
