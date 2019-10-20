import React, {Fragment} from 'react';
import { Grid, Header} from 'semantic-ui-react'

function YouWin(props) {
  const {allWords, winLvl} = props

  return (
    <Fragment>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h3'>You win, damnit!</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h6'>The Word Was: {allWords[winLvl-1].toUpperCase()}</Header>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  )
}

export default YouWin
