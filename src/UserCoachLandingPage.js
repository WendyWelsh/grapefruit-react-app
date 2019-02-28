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

// /**
//  * The example data is structured as follows:
//  *
//  * import image from 'path/to/image.jpg';
//  * [etc...]
//  *
//  * const tileData = [
//  *   {
//  *     img: image,
//  *     title: 'Image',
//  *     author: 'author',
//  *   },
//  *   {
// //  *     [etc...]
//  *   },
//  * ];
//  */
// function UserLandingPage(props) {
//   const { classes } = props;

class UserCoachLandingPage extends React.Component {
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
              <Button variant="outlined" color="inherit" component={Link} to="/workoutform" >
                Client Workouts
              </Button>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
              <Button variant="outlined" color="inherit">
                Client Macro Track
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default UserCoachLandingPage;