import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import axios from 'axios';

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

class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    // const { formRowInput } = this.state;
    axios
      .post("/coach/clients/" + this.props.match.params.id + "/workout", {
        headers: {
          Authorization: localStorage.getItem("grapefruit-jwt")
        }
      })
      .then(response => {
        this.props.history.push('/coach/client/' + this.props.match.params.id)
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="workoutform">
        <Paper style={{ opacity: 0.95 }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Muscle Group</TableCell>
                <TableCell align="right">Workout</TableCell>
                <TableCell align="right">Sets</TableCell>
                <TableCell align="right">Reps</TableCell>
                <TableCell align="right">RPE</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.workouts.map(workout => (
                <TableRow key={workout.id}>
                  <TableCell component="th" scope="row">
                    {workout.muscleGroup}
                  </TableCell>
                  <TableCell align="right">{workout.workout}</TableCell>
                  <TableCell align="right">{workout.sets}</TableCell>
                  <TableCell align="right">{workout.reps}</TableCell>
                  <TableCell align="right">{workout.rpe}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button
          onClick={this.handleSubmit}
          variant="outlined"
          size="large"
          color="primary"
          className={classes.margin}
        >
          Submit Workout
        </Button>
      </div>
    );
  }
}

WorkoutForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(WorkoutForm));
