import React, {useEffect, useState, Fragment} from 'react';
import './App.css';
import TitlePage from './components/titlePage.js';
import GamePlay from './components/gamePlay.js';
import { Grid, Icon, Header, Label } from 'semantic-ui-react'

// const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API = 'https://random-word-api.herokuapp.com/'

function App() {
  const [allWords, setAllWords] = useState([])
  const [loseGame, setLoseGame] = useState(false)
  const [gamePlay, setGamePlay] = useState(false)
  const [diffLvl, setDiffLvl] = useState(2)
  const [fetchErr, setFetchErr] = useState(false)
  const [modal, setModal] = useState(false)
  const [woff, setWoff] = useState(false)

  useEffect(() => {
    fetch(API + 'all', {
      methods: 'GET'})
    .then(r=>r.json())
    .then(words=>{
      setAllWords(words)
    })
    .catch(err=>{
      setFetchErr(true)
    })
  }, [])

  let maxlength = 0
  let minlength = 2**31
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
    // let PARAMETERS = '?' + paramArr.join('&')
    // const text = await fetch(API)
    //   .then(r=>r.text())
    let newWords = allWords
    setAllWords(Array.from({length: 40}, () => newWords[Math.floor(Math.random() * newWords.length)]))
    setModal(false)
  }

  const startGame = () => {
    gameSettings()
    setGamePlay(true)
    setLoseGame(false)
  }

  return (
    // <h1>Header</h1>
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
