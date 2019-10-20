import React, {Fragment} from 'react';
import { Grid, Header, Button } from 'semantic-ui-react'

function NextLevel(props) {
  const {allWords, winLvl, youWin} = props

  return (
    <Fragment>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h3'>You win, damnit!</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h5'>
            The Word Was: {allWords[winLvl-1].toUpperCase()}
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button onClick={()=>youWin()}>Continue</Button>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  )
}

export default NextLevel
