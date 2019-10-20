import React, {Fragment} from 'react';
import YouWin from './youWin.js'
import { Grid, Button } from 'semantic-ui-react'

function NextLevel(props) {
  const {allWords, winLvl, youWin} = props

  return (
    <Fragment>
      <YouWin allWords={allWords} winLvl={winLvl} />
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button onClick={()=>youWin()}>Continue</Button>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  )
}

export default NextLevel
