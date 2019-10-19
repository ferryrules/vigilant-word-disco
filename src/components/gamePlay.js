import React, {Fragment} from 'react';
import { Grid } from 'semantic-ui-react'

function GamePlay(props) {
  const { allWords } = props
  let level = 0
  // console.log(allWords);
  const thisLvl = allWords[level].split('')
  const thisWord = thisLvl.map(w=>{
    return (
      <Grid.Column width={1} textAlign='center'>
        _____
      </Grid.Column>
    )
  })
  return (
    <Fragment>
      <Grid.Row textAlign='center'>
        <Grid.Column textAlign='center'>
          LEVEL: {`${level}`}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column></Grid.Column>
        {thisWord}
        <Grid.Column></Grid.Column>
      </Grid.Row>
    </Fragment>
  )
}

export default GamePlay
