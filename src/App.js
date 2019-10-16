import React, {useEffect, useState} from 'react';
import './App.css';
import { Form, Button, Modal, Segment, Label, Grid, Icon, Header } from 'semantic-ui-react'

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API = 'http://app.linkedin-reach.io/words'

function App() {
  const [allWords, setAllWords] = useState([])
  const [words, setWords] = useState([])
  const [gameWords, setGameWords] = useState([])

  const [modal, setModal] = useState(false)
  const [maxLen, setMaxLen] = useState(12)
  const [minLen, setMinLen] = useState(5)
  const [diffLvl, setDiffLvl] = useState(1)

  useEffect(() => {
    fetch(PROXY+API)
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

  let paramArr = []
  const paramSettings = () => {
    if (!!minLen) {
      paramArr.push(`minLength=${minLen}`)
    }
    if (!!maxLen) {
      paramArr.push(`maxLength=${maxLen}`)
    }
    if (!!diffLvl) {
      paramArr.push(`difficulty=${diffLvl}`)
    }
  }

  const gameSettings = e => {
    paramSettings()
    let PARAMETERS = '?' + paramArr.join('&')
    fetch(PROXY+API+PARAMETERS)
    .then(r=>r.text())
    .then(words=>setWords(words.split(`\n`)))
    setModal(false)
    setGameWords(Array.from({length: 40}, () => words[Math.floor(Math.random() * words.length)]))
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
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button size='massive'>Start Game</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Modal size='mini' trigger={<Button size='large'>Instructions</Button>}>
            <Segment.Group>
              <Segment>
                <Header as='h1' textAlign='center'>Instructions</Header>
                <Header as='h5' textAlign='center'>
                  Guess the word in 6 tries or the game ends.
                  <br/>
                  Guess correctly and advance to the next round.
                  <br/>
                  Try to reach round 40.
                </Header>
              </Segment>
              <Segment textAlign='center'>
                <Button size='small' color='green'>Start Game</Button>
                <Button size='small' color='grey' onClick={()=>setModal(true)}>Settings</Button>
              </Segment>
            </Segment.Group>
          </Modal>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Modal
            size='mini'
            trigger={<Button size='small' onClick={()=>setModal(true)}>
                        <Icon name='setting' />Settings</Button>}
            open={modal}
            onClose={()=>setModal(false)}>
            <Segment.Group>
              <Segment textAlign='center'>
                <Label attached='top' color={((maxLen < minlength && maxLen > 0) || maxLen < 0 || (!parseInt(maxLen) && maxLen !== '')) ? 'red' : 'green'}>{`Max Length: Enter a number greater than ${minlength}`}</Label>
                <Form.Input placeholder='#' value={maxLen}
                  onChange={e => setMaxLen(e.target.value)}/>
              </Segment>
              <Segment textAlign='center'>
                <Label attached='top' color={((minLen > maxlength && minLen > 0) || minLen < 0 || (!parseInt(minLen) && minLen !== '')) ? 'red' : 'teal'}>{`Minimum Length: Enter a number between ${minlength} - ${maxlength}`}</Label>
                <Form.Input placeholder='#' value={minLen}
                  onChange={e => setMinLen(e.target.value)}/>
              </Segment>
              <Segment textAlign='center'>
                <Label attached='top' color={((diffLvl > 10 || diffLvl < 0) || (!parseInt(diffLvl) && diffLvl !== '')) ? 'red': 'blue'}>Difficulty: Enter a level between 1 (easy) & 10 (hard)</Label>
                <Form.Input
                  placeholder='1 - 10' value={diffLvl}
                  onChange={e => setDiffLvl(e.target.value)}/>
              </Segment>
              <Segment textAlign='center'>
                <Button type='submit' onClick={gameSettings} color="purple">Submit</Button>
              </Segment>
            </Segment.Group>
          </Modal>
        </Grid.Column>
      </Grid.Row>
      <br />
      {gameWords}
    </Grid>
  )
}

export default App
