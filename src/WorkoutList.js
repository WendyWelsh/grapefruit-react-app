import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from "react-router-dom"
import Button from '@material-ui/core/Button';
import { workoutMuscleGroup, workoutSets, workoutReps, workoutRPE, allWorkouts } from './WorkoutStorage'
import WorkoutForm from './WorkoutForm'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateSelector from './DateSelector';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import axios from 'axios';
let host;
if (process.env.NODE_ENV === 'production') {
    host = 'https://grapefruit-server.herokuapp.com'
} else { host = 'http://localhost:3000' }

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        opacity: 0.8,
    },
    margin: {
        margin: theme.spacing.unit,
        
    },
    textField: {
        flexBasis: 200,
    },
});

class WorkoutList extends React.Component {
    constructor(prop) {
        super(prop)
       
        this.state = {
            date: moment().format('YYYY-MM-DD'),
            workoutMuscleGroup: '',
            exerciseName: '',
            sets: '1',
            reps: '1',
            rpe: '1',
            allWorkouts: allWorkouts,
            filteredWorkOuts: [],
            client: {
                username: "",
                date: []
            },
            clientWorkouts: [],
            open: false,
        };
// this.handleSubmit=this.handleSubmit.bind(this)
// this.updateDate=this.updateDate.bind(this)
this.deleteWorkout = this.deleteWorkout.bind(this);

    };


    updateDate = (newDate) => {
        this.setState({date: newDate})

    }

    addWorkout = () => {
        let selectedWorkout = {
            date: this.state.date,
            muscleGroup: this.state.workoutMuscleGroup,
            exerciseName: this.state.exerciseName,
            sets: this.state.sets,
            reps: this.state.reps,
            rpe: this.state.rpe
        }
        let newArray = this.state.clientWorkouts.slice();
        newArray.push(selectedWorkout);
        this.setState({ clientWorkouts: newArray })


    }
    deleteWorkout(item) {
        let oldArray = this.state.clientWorkouts;
        oldArray.splice(item, 1);
        this.setState({ clientWorkouts: oldArray });
      }

    componentDidMount() {

        axios.get(`${host}/coach/clients/` + this.props.match.params.id,
            {
                headers: {
                    Authorization: localStorage.getItem('grapefruit-jwt')
                }
            }).then((response) => {
                this.setState({ client: response.data.data[0].client })
            })

    }

    handleChange = prop => event => {
        
        this.setState({ [prop]: event.target.value });
        


    }

    getExercisesByMuscles() {
        return this.state.allWorkouts.reduce((allWorkouts, workout) => {
            const { workoutMuscleGroup } = workout

            allWorkouts[workoutMuscleGroup] = allWorkouts[workoutMuscleGroup]
                ? [...allWorkouts[workoutMuscleGroup], workout]
                : [workout]
            return allWorkouts
        }, {})

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    submitWorkoutForm = () => {
        let clientId = this.props.match.params.id
        let exercises = this.state.clientWorkouts
       axios
         .post(`${host}/workouts`, {date: this.state.date, clientId, exercises},
           
          {
           headers: {
             Authorization: localStorage.getItem("grapefruit-jwt")
           }
         })
         .then(response => {
           //this.props.history.push('/coach/client/' + this.props.match.params.id)
         });

         this.setState({ 
            date: moment().format('YYYY-MM-DD'),
            workoutMuscleGroup: '',
            exerciseName: '',
            sets: '1',
            reps: '1',
            rpe: '1',
            allWorkouts: allWorkouts,
            filteredWorkOuts: [],
            client: {
                username: "",
                date: []
            },
            clientWorkouts: []
        });
        
    };





    render() {


        const { classes } = this.props;

        return (
            <div className={classes.root}>
            
                    <Typography 
                    style={{ marginLeft: 7, paddingTop: 30}}              
                    variant="display1"
                    gutterBottom>
                    {this.state.client.username} 
                    </Typography>
                <Grid container>
                    <Grid item sm>
                        <form className={classes.container} noValidate autoComplete="off">
                         <DateSelector 
                         value={this.state.date}
                         updateDate={this.updateDate}
                          />
                        <TextField className={classes.root}
                            select
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            value={this.state.workoutMuscleGroup}
                            onChange={this.handleChange('workoutMuscleGroup')}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Muscle Group</InputAdornment>,
                            }}
                        >
                            {workoutMuscleGroup.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            value={this.state.exerciseName}
                            onChange={this.handleChange('exerciseName')}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Exercise Name</InputAdornment>,
                            }}
                        >
                            {allWorkouts.map(exerciseName => (
                                <MenuItem key={exerciseName.title} value={exerciseName.title}>
                                    {exerciseName.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            value={this.state.sets}
                            onChange={this.handleChange('sets')}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Sets</InputAdornment>,
                            }}
                        >
                            {workoutSets.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            value={this.state.reps}
                            onChange={this.handleChange('reps')}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Reps</InputAdornment>,
                            }}
                        >
                            {workoutReps.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            value={this.state.rpe}
                            onChange={this.handleChange('rpe')}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">RPE</InputAdornment>,
                            }}
                        >
                            {workoutRPE.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                       
                        <Button
                            onClick={this.addWorkout}
                            variant="outlined"
                            size="large"
                            color="primary"
                            className={classes.margin}>
                            ADD
                          
                        </Button>
                        
                        </form>
                    </Grid>
                </Grid>
             
                <Grid container>
                    <Grid item sm>
                    
                    <Button
                        onClick={()=>{this.submitWorkoutForm(); this.handleClickOpen()}}
                        variant="outlined"
                        size="large"
                        color="primary"
                        className={classes.margin}
                    >
                        Submit Workout
                    </Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle>Good Work!</DialogTitle>
                     <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have submitted a new workout for your client.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Right On!
                    </Button>
                    </DialogActions>
                    </Dialog>
                    <WorkoutForm
                        workouts={this.state.clientWorkouts}
                        clientId={this.props.match.params.id}
                        deleteWorkout={this.deleteWorkout}
                    />
                         
                    </Grid>
                        
                </Grid>
                        
            </div>
        );
    }
}

WorkoutList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withRouter(withStyles(styles)(WorkoutList));