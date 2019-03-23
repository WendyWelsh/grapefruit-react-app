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
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import DateSelector from './DateSelector';
import moment from 'moment';

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
            clientWorkouts: []

        };
// this.handleSubmit=this.handleSubmit.bind(this)
// this.updateDate=this.updateDate.bind(this)

    };


    updateDate = (newDate) => {
        console.log(newDate)
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


    componentDidMount() {

        axios.get('/coach/clients/' + this.props.match.params.id,
            {
                headers: {
                    Authorization: localStorage.getItem('grapefruit-jwt')
                }
            }).then((response) => {
                this.setState({ client: response.data.data[0].client })
                console.log(response)

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

    submitWorkoutForm = () => {
        console.log(this.props)
        const { formRowInput } = this.state;
        let clientId = this.props.match.params.id
        let exercises = this.state.clientWorkouts
        console.log(this.state)
       axios
         .post("/workouts", {date: this.state.date, clientId, exercises},
           
          {
           headers: {
             Authorization: localStorage.getItem("grapefruit-jwt")
           }
         })
         .then(response => {
           //this.props.history.push('/coach/client/' + this.props.match.params.id)
           console.log(response.data)
         });
     };





    render() {
        console.log(this.getExercisesByMuscles())


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
                  
                        <WorkoutForm 
                        workouts={this.state.clientWorkouts} 
                        clientId={this.props.match.params.id}/>
                         
                        </Grid>
                        
                        </Grid>
                        <Button
                        onClick={this.submitWorkoutForm}
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

WorkoutList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withRouter(withStyles(styles)(WorkoutList));
