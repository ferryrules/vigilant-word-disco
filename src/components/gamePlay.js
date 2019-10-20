import React, {useState, Fragment} from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react'

function GamePlay(props) {
  const { allWords, setLoseGame } = props

  const [initGuess, setInitGuess] = useState('')
  const [goodGuess, setGoodGuess] = useState([])
  const [badGuess, setBadGuess] = useState([])

  const [winLvl, setWinLvl] = useState(1)

  let level = winLvl
  const thisLvl = allWords[level-1].split('')
  const uniqW = [...new Set(thisLvl)]
  const uniqG = [...new Set(goodGuess)]
  const uniqB = [...new Set(badGuess)]
  const thisWord = thisLvl.map(w=>{
    return (
      <Grid.Column width={1} textAlign='center'>
        {goodGuess.includes(w) ? w.toUpperCase() : '____'}
      </Grid.Column>
    )
  })

  const myGuess = e => {
    let arr = e
    arr.forEach(x=>{
      if (allWords[winLvl-1].includes(x)) {
        setGoodGuess([...goodGuess, x])
      } else {
        setBadGuess([...badGuess, x.toUpperCase()])
      }
    })
    setInitGuess('')
  }

  const youWin = () => {
    setBadGuess([])
    setGoodGuess([])
    setWinLvl(winLvl+1)
  }

  const gameOver = () => {
    setBadGuess([])
    setGoodGuess([])
    setWinLvl(1)
  }

  console.log('CHEATER!!!');
  console.log('WE HAVE A CHEATER IN HERE!!!!');
  console.log("eh, it's fine");
  console.log('.....');
  console.log("it's " , allWords[winLvl-1]);
  return (
    <Fragment>
      {(uniqW.sort().join('') === uniqG.sort().join('')) ? winLvl === 3 ? (
        <Fragment>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h3'>You win, damnit!</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h6'>{allWords[winLvl-1].toUpperCase()}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h1'>Oh Snap! You Won the Game!</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h2'>Sorry, There is no prize though.</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h3'>But you clearly don't need anything.</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h4'>I mean, I couldn't do it,</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h5'>And I built this thing.</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h6'>But I also built in a cheat ;)</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button onClick={()=>gameOver()}>Play Again?</Button>
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      ) : (
        <Fragment>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h3'>You win, damnit!</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h6'>{allWords[winLvl-1].toUpperCase()}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button onClick={()=>youWin()}>Continue</Button>
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      ) : (
        <Fragment>
          <Grid.Row textAlign='center'>
            <Grid.Column textAlign='center'>
              <Header as='h1'>LEVEL: {`${winLvl}`}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            {uniqB.length === 6 ?
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
                  <Form.Input value={initGuess} width={4} onChange={(e)=>setInitGuess(e.target.value.toLowerCase())}/>
                  <Button type='submit' onClick={()=>{myGuess(initGuess.split(''))}}>Submit</Button>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Header as='h3'>
                  Bad Guesses: {uniqB.join(' ')}
                </Header>
              </Grid.Column>
          </Grid.Row>
        </Fragment>)
      }
    </Fragment>
  )
}

export default GamePlay
