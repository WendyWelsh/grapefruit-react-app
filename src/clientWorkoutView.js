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
import moment from 'moment';
// import 'moment-timezone';
import axios from 'axios'
import Typography from "@material-ui/core/Typography";


let host;
if (process.env.NODE_ENV === 'production') {
    host = 'https://grapefruit-server.herokuapp.com/'
} else { host = 'http://localhost:3000' }

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
   
  },
  table: {
    minWidth: 700
  }

});

const paper= {
  opacity: "0.85",
}

class clientWorkoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullWorkout: []
    }

  }

  componentDidMount() {

    axios.get(`${host}/workouts`,
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
  
          <Table className={classes.table}>
           

            <TableBody>

            
              {this.state.fullWorkout.map(workout => (
                <Paper style={{ opacity: 0.8, padding: 20, }}>
                    <Typography
                                style={{ margin: 4 }}
                                variant="h6"
                                gutterBottom align='left'>
                                Workout For: {moment(workout.date).format('LL')}
                            </Typography>
                {/* <h3>Workout For: {moment(workout.date).format('LL')}</h3> */}
                <TableHead>

                
                <TableCell align="right">Muscle Group</TableCell>
                <TableCell align="right">Exercise Name</TableCell>
                <TableCell align="right">Sets</TableCell>
                <TableCell align="right">Reps</TableCell>
                <TableCell align="right">RPE</TableCell>
  
              </TableHead>
                  {workout.exercises.map(exercise => (

                    <TableRow>
                     

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
                        {exercise.repetitions}
                      </TableCell>

                      <TableCell align="right">
                        {exercise.rpe}
                      </TableCell>


                    </TableRow>
                  ))}
                </Paper>
              ))}


            </TableBody>
          </Table>

       

      </div>
    );
  }
}

clientWorkoutView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(clientWorkoutView));
