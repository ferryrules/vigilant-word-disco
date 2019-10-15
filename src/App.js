import React, {useEffect, useState} from 'react';
import './App.css';
import { Form, Button } from 'semantic-ui-react'

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API = 'http://app.linkedin-reach.io/words'

function App() {
  const [allWords, setAllWords] = useState([])
  const [words, setWords] = useState([])

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

  const startGame = e => {
    let paramArr = []
    if (!!minLen) {
      paramArr.push(`minLength=${minLen}`)
    }
    if (!!maxLen) {
      paramArr.push(`maxLength=${maxLen}`)
    }
    if (!!diffLvl) {
      paramArr.push(`difficulty=${diffLvl}`)
    }
    let PARAMETERS = '?' + paramArr.join('&')
    fetch(PROXY+API+PARAMETERS)
    .then(r=>r.text())
    .then(words=>setWords(words.split(`\n`)))
    console.log(words);
  }

  const list = words.join(' ')

  return (
    <div>
      <br />
      <Form>
        <Form.Group>
          <Form.Input width={4} fluid
            label='Max Word Length' placeholder='#' value={maxLen}
            onChange={e => setMaxLen(e.target.value)}
            error={
              ((maxLen < minlength && maxLen > 0) || maxLen < 0 || (!parseInt(maxLen) && maxLen !== '')) ?
              {content: `Enter a number greater than ${minlength}`} : null }/>
          <Form.Input width={4} fluid
            label='Min Word Length' placeholder='#' value={minLen}
            onChange={e => setMinLen(e.target.value)}
            error={
              ((minLen > maxlength && minLen > 0) || minLen < 0 || (!parseInt(minLen) && minLen !== '')) ?
              {content: `Enter a number between ${minlength} - ${maxlength}`} : null}/>
          <Form.Input width={4} fluid
            label='Difficulty: 1 (easy) - 10' placeholder='1 - 10' value={diffLvl}
            onChange={e => setDiffLvl(e.target.value)}
            error={
              ((diffLvl > 10 || diffLvl < 0) || (!parseInt(diffLvl) && diffLvl !== '')) ?
              {content: "Enter a level between 1 - 10"} : null }/>
          </Form.Group>
        <Button type='submit' onClick={startGame}>Submit</Button>
      </Form>
      <br />
      {list}
    </div>
  )
}

export default App
