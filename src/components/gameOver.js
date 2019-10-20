import React, {Fragment} from 'react';
import YouWin from './youWin.js'
import { Grid, Header, Button } from 'semantic-ui-react'

function GameOver(props) {
  const { allWords, winLvl, gameOver } = props
  return(
    <Fragment>
      <YouWin allWords={allWords} winLvl={winLvl} />
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <img alt="you win disco" src="http://delinear.info/images/th3n04h/discoball%202%20NTP.gif" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h1'>Oh Snap! You Won the Game!</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Header as='h2'>Sorry, there isn't a prize though.</Header>
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
          <Header as='h6'>That's why there's a cheat ;)</Header>
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
