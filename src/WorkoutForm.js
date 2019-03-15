import axios from 'axios'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import WorkoutList from './WorkoutList'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  { id: 'Chest', numeric: false, disablePadding: true, label: 'Chest' },
  { id: 'Sets', numeric: true, disablePadding: false, label: 'Sets' },
  { id: 'Reps', numeric: true, disablePadding: false, label: 'Reps' },
  { id: 'RPE', numeric: true, disablePadding: false, label: 'RPE' },

];

class WorkoutForm extends React.Component {
  constructor(props) {
    super(props)
    
  }
  componentDidMount() {
    // axios.get('/coach/clients/' + this.props.match.params.id,
    //   {
    //     headers: {
    //       Authorization: localStorage.getItem('grapefruit-jwt')
    //     }
    //   }).then((response) => {
    //     this.setState({ client: response.data.data[0].client })
    //     console.log(response)

    //   })
    
  }

handleSubmit = () => {

  const { formRowInput } = this.state

}




  render() {
    const { classes } = this.props;

    return (
      <div>
        
        
        <Paper className={classes.root}>
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
              {this.props.workouts.map(workout=> (
                <TableRow key={workout.id}>
                  <TableCell component="th" scope="row">
                    {workout.muscleGroup}
                  </TableCell>
                  <TableCell align="right">{workout.workout}</TableCell>
                  <TableCell align="right">{workout.sets}</TableCell>
                  <TableCell align="right">{workout.reps}</TableCell>
                  <TableCell align="right">{workout.rpe}
                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            
          </Table>
        </Paper>
        <Button 
        variant="outlined" 
        size="large" 
        color="primary" 
        className={classes.margin}>
        
          Submit Workout
    </Button>
      </div>
    );
  }
}

WorkoutForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(WorkoutForm));