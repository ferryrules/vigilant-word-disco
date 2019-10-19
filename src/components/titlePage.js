import React, {useState, Fragment} from 'react';
import { Form, Button, Modal, Segment, Label, Grid, Icon, Header } from 'semantic-ui-react'

function TitlePage(props) {
  const { PROXY, API, diffLvl, setNewWords, newWords, setDiffLvl, setGamePlay } = props

  const [modal, setModal] = useState(false)

  let paramArr = []
  const paramSettings = () => {
    if (!!diffLvl) {
      paramArr.push(`difficulty=${diffLvl}`)
    }
  }

  const gameSettings = e => {
    paramSettings()
    let PARAMETERS = '?' + paramArr.join('&')
    fetch(PROXY+API+PARAMETERS)
    .then(r=>r.text())
    .then(words=>setNewWords(words.split(`\n`)))
    setModal(false)
    setNewWords(Array.from({length: 40}, () => newWords[Math.floor(Math.random() * newWords.length)]))
  }

  return (
    <Fragment>
      <br />
      <Grid.Row textAlign='center'>
        <Grid.Column textAlign='center'>
          <Button size='massive' onClick={()=>setGamePlay(true)}>Start Game</Button>
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
                <Button size='small' color='green' onClick={()=>setGamePlay(true)}>Start Game</Button>
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
    </Fragment>
  )
}

export default TitlePage
