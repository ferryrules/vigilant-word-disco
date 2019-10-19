import React, {useEffect, useState} from 'react';
import './App.css';
import TitlePage from './components/titlePage.js';
import GamePlay from './components/gamePlay.js';
import { Grid, Icon, Header } from 'semantic-ui-react'

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API = 'http://app.linkedin-reach.io/words'

function App() {
  const [allWords, setAllWords] = useState([])
  const [newWords, setNewWords] = useState([])

  const [loseGame, setLoseGame] = useState(false)
  const [winLvl, setWinLvl] = useState(false)

  const [gamePlay, setGamePlay] = useState(false)
  const [diffLvl, setDiffLvl] = useState(1)

  useEffect(() => {
    fetch(PROXY+API+'?minlength=5&difficulty=2&count=40', {
      header: {
        'Accept': 'text/html',
        'Content-Type': 'text/html'
      }})
    .then(r=>r.text())
    .then(words=>{
      setAllWords(words.split('\n'))
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

  const stillLoading = allWords.length === 0 ? 'loading' : null

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
        winLvl ? "You Win!" :
        <GamePlay setGamePlay={setGamePlay} allWords={allWords} newWords={newWords} winLvl={winLvl} setWinLvl={setWinLvl} loseGame={loseGame} setLoseGame={setLoseGame} /> :
        <TitlePage PROXY={PROXY} API={API} diffLvl={diffLvl} setDiffLvl={setDiffLvl} newWords={newWords} setNewWords={setNewWords} minlength={minlength} maxlength={maxlength} setGamePlay={setGamePlay} allWords={setAllWords} stillLoading={stillLoading}/>
      }
    </Grid>
  )
}

export default App
