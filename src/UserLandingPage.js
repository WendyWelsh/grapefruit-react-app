import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,

  },
  input: {
    display: 'none',
  },
});


class UserLandingPage extends React.Component {
  constructor(props) {
    super(props)

    this.directToMessageBoard = this.directToMessageBoard.bind(this)
    this.directToMacroForm = this.directToMacroForm.bind(this)
    this.directToWorkoutForm = this.directToWorkoutForm.bind(this)
  }

  state = {
    anchorel: null,
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  directToMessageBoard() {
    this.props.history.push("/messageboard")
  }

  directToMacroForm() {
    this.props.history.push("/macroform")
  }

  directToWorkoutForm() {
    this.props.history.push("/workoutform")
  }

  render() {
    return (
      <div className="UserLandingPage">
        <Grid container>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 100, textAlign: 'center', }}>
              <Button onClick = {this.directToMessageBoard} variant="outlined" color="inherit">
                Coach Messages
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 100, textAlign: 'center' }}>
              <Button  onClick = {this.directToMacroForm} variant="outlined" color="inherit">
                Workout Log
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 100, textAlign: 'center' }}>
              <Button  onClick = {this.directToWorkoutForm} variant="outlined" color="inherit">
                Macro Track Log
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default UserLandingPage;