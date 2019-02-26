import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class UserLandingPage extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid sm></Grid>
          <Grid item sm={6}>
            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button variant="outlined" color="inherit">
                Messages
              </Button>
            </Paper>
          </Grid>
          <Grid sm></Grid>
        </Grid>
        <Grid container>
          <Grid sm></Grid>
          <Grid item sm={6}>
            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button variant="outlined" color="inherit">
                Workouts
              </Button>
            </Paper>
          </Grid>
          <Grid sm></Grid>
        </Grid>
        <Grid container>
          <Grid sm></Grid>
          <Grid item sm={6}>
            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button variant="outlined" color="inherit">
                Macro Track
              </Button>
            </Paper>
          </Grid>
          <Grid sm></Grid>
        </Grid>
      </div>
    )
  }
}

export default UserLandingPage;