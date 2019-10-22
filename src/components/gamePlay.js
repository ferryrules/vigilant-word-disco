import React, {useEffect, useState, Fragment} from 'react';
import GameOver from './gameOver.js';
import NextLevel from './nextLevel.js';
import { Grid, Header, Form, Button } from 'semantic-ui-react'

function GamePlay(props) {
  const { allWords, setLoseGame, startGame, woff} = props

  let woffArr = ['r', 's', 't', 'l', 'n', 'e']
  const [initGuess, setInitGuess] = useState('')
  const [goodGuess, setGoodGuess] = useState([])
  const [badGuess, setBadGuess] = useState([])
  const [hints, setHints] = useState(3)

  const [thisLvl, setThisLvl] = useState(1)
  let level = thisLvl
  const thisLvlWord = allWords[level-1].split('')

  const uniqW = [...new Set(thisLvlWord)]
  const uniqG = [...new Set(goodGuess)]
  const uniqB = [...new Set(badGuess)]

  if (woff) {
    woffArr.forEach(wa=>{
      return thisLvlWord.includes(wa) ? goodGuess.push(wa) : null
    })
  }

  const thisWord = thisLvlWord.map(w=>{
    return (
      <Grid.Column width={1} textAlign='center'>
        {goodGuess.includes(w) || (woffArr.includes(w) && woff) ? w.toUpperCase() : '____'}
      </Grid.Column>
    )
  })

  const myGuess = e => {
    let arr = e
    arr.forEach(x=>{
      if (allWords[thisLvl-1].includes(x)) {
        goodGuess.push(x)
      } else {
        badGuess.push(x.toUpperCase())
      }
    })
    setInitGuess('')
  }

  const youWin = () => {
    setBadGuess([])
    setGoodGuess([])
    setThisLvl(thisLvl+1)
    setHints(hints+1)
  }

  const gameOver = () => {
    setThisLvl(1)
    setHints(3)
    setBadGuess([])
    setGoodGuess([])
    startGame()
  }

  const myHints = () => {
    setHints(hints-1)
    for (var i = 0; i < uniqW.length; i++) {
      if (!uniqG.includes(uniqW[i])) {
        return goodGuess.push(uniqW[i])
      }
    }
  }

  const hintButton = hints === 0 || woff ? 'disabled' : null
  useEffect(() => {
    console.log('CHEATER!!!');
    console.log('WE HAVE A CHEATER IN HERE!!!!');
    console.log("eh, it's fine");
    console.log('.....');
    console.log("it's " , allWords[thisLvl-1]);
  },[allWords, thisLvl])

  return (
    <Fragment>
      {(uniqW.join('') === uniqG.join('')) && (uniqB.length < 6) ? thisLvl === 40 ? (
        <GameOver allWords={allWords} thisLvl={thisLvl} gameOver={gameOver} />
      ) : (
        <NextLevel allWords={allWords} thisLvl={thisLvl} youWin={youWin} />
      ) : (
        <Fragment>
          <Grid.Row textAlign='center'>
            <Grid.Column textAlign='center'>
              <Header as='h1'>LEVEL: {`${thisLvl}`}</Header>
              {woff ? <Header as='h5' color='blue'>W of F enabled. RSTLNE filled in. Hints disabled</Header> : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            {(6-uniqB.length <= 0) ?
              setLoseGame(true) :
              thisWord}
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column textAlign='center'>
              <Form>
                <Form.Group inline>
                  <label>Enter Your Guess</label>
                  <Form.Input value={initGuess} width={6} onChange={(e)=>setInitGuess(e.target.value.toLowerCase())}/>
                  <Button type='submit' onClick={()=>{myGuess(initGuess.split(''))}}>Submit</Button>
                  <Button type='submit' className={hintButton} onClick={()=>{myHints()}}>Hint ({hints})</Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Header as='h3'>
                  Bad Guesses: {uniqB.join(' ')}
                </Header>
              </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Header as={6-uniqB.length === 1 ? 'h1' : 'h3'} color={6-uniqB.length === 1 ? 'red' : 'green'}>
                  You Have {6-uniqB.length} {6-uniqB.length === 1 ? 'Guess' : 'Guesses'} Remaining
                </Header>
              </Grid.Column>
          </Grid.Row>
        </Fragment>)
      }
    </Fragment>
  )
}

export default GamePlay
