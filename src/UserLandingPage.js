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


class UserLandingPage extends Component {
  render() {
    return (
      <Grid container>
        <Grid item sm>
          
          <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
            <Button variant="outlined" color="inherit">
              Messages
              </Button>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper style={{ padding: 20, margin: 20, textAlign: 'center'  }}>
            <Button variant="outlined" color="inherit" component={Link} to="/workoutform" >
              Workouts
              </Button>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper style={{ padding: 20, margin: 20, textAlign: 'center'  }}>
            <Button variant="outlined" color="inherit">
              Macro Track
              </Button>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default UserLandingPage;
