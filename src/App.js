import React, {useEffect, useState, Fragment} from 'react';
import './App.css';
import TitlePage from './components/titlePage.js';
import GamePlay from './components/gamePlay.js';
import { Grid, Icon, Header, Label } from 'semantic-ui-react'

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API = 'http://app.linkedin-reach.io/words'

function App() {
  const [allWords, setAllWords] = useState([])
  const [loseGame, setLoseGame] = useState(false)
  const [gamePlay, setGamePlay] = useState(false)
  const [diffLvl, setDiffLvl] = useState(2)
  const [fetchErr, setFetchErr] = useState(false)
  const [modal, setModal] = useState(false)
  const [woff, setWoff] = useState(false)

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

  let paramArr = []
  const paramSettings = () => {
    if (!!diffLvl) {
      paramArr.push(`difficulty=${diffLvl}`)
    }
  }

  const gameSettings = async(e) => {
    paramSettings()
    let PARAMETERS = '?' + paramArr.join('&')
    const text = await fetch(PROXY+API+PARAMETERS)
      .then(r=>r.text())
    let newWords = text.split(`\n`)
    setAllWords(Array.from({length: 40}, () => newWords[Math.floor(Math.random() * newWords.length)]))
    setModal(false)
  }

  const startGame = () => {
    gameSettings()
    setGamePlay(true)
    setLoseGame(false)
  }

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
            <TitlePage modal={modal} setModal={setModal} gameSettings={gameSettings} startGame={startGame} setDiffLvl={setDiffLvl} stillLoading={stillLoading} fetchErr={fetchErr} setWoff={setWoff}/>
          </Fragment>
        ) :
        <GamePlay allWords={allWords} setLoseGame={setLoseGame} startGame={startGame} woff={woff}/> :
        <TitlePage modal={modal} setModal={setModal} gameSettings={gameSettings} startGame={startGame} setDiffLvl={setDiffLvl} stillLoading={stillLoading} fetchErr={fetchErr} setWoff={setWoff}/>
      }
    </Grid>
  )
}

export default App
