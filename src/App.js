import React, {useEffect, useState, Fragment} from 'react';
import './App.css';
import TitlePage from './components/titlePage.js';
import GamePlay from './components/gamePlay.js';
import { Grid, Icon, Header, Label } from 'semantic-ui-react'

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API = 'http://app.linkedin-reach.io/words'

function App() {
  const [allWords, setAllWords] = useState([])
  const [newWords, setNewWords] = useState([])

  const [loseGame, setLoseGame] = useState(false)

  const [gamePlay, setGamePlay] = useState(false)
  const [diffLvl, setDiffLvl] = useState(2)

  const [fetchErr, setFetchErr] = useState(false)

  useEffect(() => {
    fetch(PROXY+API+'?minlength=5&difficulty=2&count=40', {mode: 'cors',
      header: {
        'Accept': 'text/html',
        'Content-Type': 'text/html'
      }})
    .then(r=>r.text())
    .then(words=>{
      setAllWords(words.split('\n'))
    })
    .catch(err=>{
      setFetchErr(true)
    })
  }, [])

  let maxlength = 0
  let minlength = 100
  allWords.forEach(w=>{
    if (w.length > maxlength) {
      maxlength = w.length
    } else if (w.length < minlength) {
      minlength = w.length
    }
  })

  const stillLoading = (allWords.length === 0 && !fetchErr) ?
  'loading' : fetchErr ? 'disabled' : null

  return (
    <Grid padded columns='equal'>
      <Grid.Row>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Icon name='user secret' size='massive'/>
          <Icon name='terminal' size='massive'/>
          <Header as='h1'></Header>
        </Grid.Column>
      </Grid.Row>
      {gamePlay ?
        loseGame ? (
          <Fragment>
            <Grid.Column textAlign='center'>
              <Label color="red">You Lost :(</Label>
            </Grid.Column>
            <TitlePage PROXY={PROXY} API={API} diffLvl={diffLvl} setDiffLvl={setDiffLvl} newWords={newWords} setNewWords={setNewWords} minlength={minlength} maxlength={maxlength} setGamePlay={setGamePlay} allWords={setAllWords} stillLoading={stillLoading} fetchErr={fetchErr} setLoseGame={setLoseGame}/>
          </Fragment>
        ) :
        <GamePlay setGamePlay={setGamePlay} allWords={allWords} newWords={newWords} loseGame={loseGame} setLoseGame={setLoseGame} /> :
        <TitlePage PROXY={PROXY} API={API} diffLvl={diffLvl} setDiffLvl={setDiffLvl} newWords={newWords} setNewWords={setNewWords} minlength={minlength} maxlength={maxlength} setGamePlay={setGamePlay} allWords={setAllWords} stillLoading={stillLoading} fetchErr={fetchErr} setLoseGame={setLoseGame}/>
      }
    </Grid>
  )
}

export default App
