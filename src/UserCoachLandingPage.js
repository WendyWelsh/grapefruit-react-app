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


class UserCoachLandingPage extends React.Component {
  constructor(props) {
    super(props)

    this.directToMacroForm = this.directToMacroForm.bind(this)
    this.directToWorkoutForm = this.directToWorkoutForm.bind(this)
  }
    state = {
      anchorEl: null,
    };
    
    
    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    directToMacroForm() {
      this.props.history.push("/macroform");
    }
    directToWorkoutForm() {
      this.props.history.push("/workoutform");
    }
  render() {
    return (
      <div className="UserCoachLandingPage">
        <Grid container>
          <Grid item sm>

            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button variant="outlined" color="inherit">
                Client Messages
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button onClick={this.directToWorkoutForm} variant="outlined" color="inherit" component={Link} to="/workoutform" >
                Client Workouts
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button onClick={this.directToMacroForm} variant="outlined" color="inherit">
                Client Macro Track
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button onClick={this.directToMacroForm} variant="outlined" color="inherit">
                Client Macro Log
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button onClick={this.directToMacroForm} variant="outlined" color="inherit">
                Client Workout Log
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default UserCoachLandingPage;