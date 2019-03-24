import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import axios from 'axios'

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    opacity: 0.9
  },
  table: {
    minWidth: 700
  }

});

class clientWorkoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullWorkout: []
    }

  }

  componentDidMount() {

    axios.get('/workouts',
      {
        headers: {
          Authorization: localStorage.getItem('grapefruit-jwt')
        }
      }).then((response) => {
        const fullWorkout = response.data;
        this.setState({ fullWorkout })


      })

  }

  render() {
    const { classes } = this.props;

    return (
      <div className="clientWorkoutView">
        <Paper style={{ opacity: 0.95 }}>
          <Table className={classes.table}>
            <TableHead>

              <TableCell>Date</TableCell>
              <TableCell align="right">Muscle Group</TableCell>
              <TableCell align="right">Exercise Name</TableCell>
              <TableCell align="right">Sets</TableCell>
              <TableCell align="right">Reps</TableCell>
              <TableCell align="right">RPE</TableCell>

            </TableHead>

            <TableBody>
              {this.state.fullWorkout.map(workout => (
                <>
                  {workout.exercises.map(exercise => (

                    <TableRow>
                      <TableCell component="th" scope="row">
                        {workout.date}
                      </TableCell>

                      <TableCell align="right">
                        {exercise.muscle_group}
                      </TableCell>

                      <TableCell align="right">
                        {exercise.name}
                      </TableCell>

                      <TableCell align="right">
                        {exercise.sets}
                      </TableCell>

                      <TableCell align="right">
                        {exercise.repititions}
                      </TableCell>

                      <TableCell align="right">
                        {exercise.rpe}
                      </TableCell>


                    </TableRow>
                  ))}
                </>
              ))}


            </TableBody>
          </Table>

        </Paper>

      </div>
    );
  }
}

clientWorkoutView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(clientWorkoutView));
