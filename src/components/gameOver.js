import React, {Fragment} from 'react';
import { Grid, Header, Button } from 'semantic-ui-react'

function GameOver(props) {
  const { allWords, winLvl, gameOver } = props
  return(
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
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h1'>Oh Snap! You Won the Game!</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h2'>Sorry, There is no prize though.</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h3'>But you clearly don't need anything.</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h4'>I mean, I couldn't do it,</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h5'>And I built this thing.</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h6'>But I also built in a cheat ;)</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button onClick={()=>gameOver()}>Play Again?</Button>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  )
}

export default GameOver
