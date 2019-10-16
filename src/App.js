import React, {useEffect, useState} from 'react';
import './App.css';
import { Form, Button, Modal, Segment, Label } from 'semantic-ui-react'

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API = 'http://app.linkedin-reach.io/words'

function App() {
  const [allWords, setAllWords] = useState([])
  const [words, setWords] = useState([])

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
    fetch(PROXY+API+PARAMETERS+'&count=100')
    .then(r=>r.text())
    .then(words=>setWords(words.split(`\n`)))
    setModal(false)
    console.log(words);
    console.log(words.length);
    let arr = Array.from({length: 40}, () => words[Math.floor(Math.random() * words.length)])
    console.log(arr);
  }

  return (
    <div>
      <br />
      <Modal
        size='mini'
        trigger={<Button onClick={()=>setModal(true)}>Settings</Button>}
        open={modal}
        onClose={()=>setModal(false)}>
          <Segment.Group>
            <Segment textAlign='center'>
              <Label attached='top' color={((maxLen < minlength && maxLen > 0) || maxLen < 0 || (!parseInt(maxLen) && maxLen !== '')) ? 'red' : 'green'}>{`Enter a number greater than ${minlength}`}</Label>
              <Form.Input placeholder='#' value={maxLen}
                onChange={e => setMaxLen(e.target.value)}/>
            </Segment>
            <Segment textAlign='center'>
              <Label attached='top' color={((minLen > maxlength && minLen > 0) || minLen < 0 || (!parseInt(minLen) && minLen !== '')) ? 'red' : 'teal'}>{`Enter a number between ${minlength} - ${maxlength}`}</Label>
              <Form.Input placeholder='#' value={minLen}
                onChange={e => setMinLen(e.target.value)}/>
            </Segment>
            <Segment textAlign='center'>
              <Label attached='top' color={((diffLvl > 10 || diffLvl < 0) || (!parseInt(diffLvl) && diffLvl !== '')) ? 'red': 'blue'}>Enter a level between 1 (easy) & 10 (hard)</Label>
              <Form.Input
                placeholder='1 - 10' value={diffLvl}
                onChange={e => setDiffLvl(e.target.value)}/>
            </Segment>
            <Segment textAlign='center'>
              <Button type='submit' value="ferris" onClick={gameSettings} color="purple">Submit</Button>
            </Segment>
          </Segment.Group>
      </Modal>
      <br />
    </div>
  )
}

export default App
