import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {withRouter} from "react-router-dom"
import Button from '@material-ui/core/Button';
import {workoutMuscleGroup,workoutSets,workoutReps,workoutRPE,allWorkouts} from './WorkoutStorage'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
});


// const workout = [
//     {
//         value: 'Bench press',
//         label: 'Bench press',
//     },
//     {
//         value: 'Incline Press',
//         label: 'Incline Press',
//     },
//     {
//         value: 'Flys',
//         label: 'Flys',
//     },
//     {
//         value: 'Pushups',
//         label: 'Pushups',
//     },
//     {
//         value: 'Dips',
//         label: 'Dips',
//     },
//     {
//         value: 'Decline Press',
//         label: 'Decline Press',
//     },
// ];



class WorkoutList extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            workoutMuscleGroup: '',
            workout: '',
            sets: '',
            reps: '',
            rpe: '',
            allWorkouts: allWorkouts,
            filteredWorkOuts: []
            
        };
      

    };
    handleClick = () => {
       console.log("you clicked the FN button!!")
    }

    handleChange = prop => event => {  
        this.setState({ [prop]: event.target.value });
        this.getExercisesByMuscles();
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

        render() {
            console.log(this.getExercisesByMuscles())
            
            const { classes } = this.props;

            return (
                <div className={classes.root}>
                    <TextField
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
                        value={this.state.workout}
                        onChange={this.handleChange('workout')}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Workout</InputAdornment>,
                        }}
                    >
                        {allWorkouts.map(workout => (
                            <MenuItem key={workout.title} value={workout.title}>
                                {workout.title}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        value={workoutSets}
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
                        value={workoutReps}
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
                        value={workoutRPE}
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
                    <Button onClick={this.handleClick} variant="outlined" size="large" color="primary" className={classes.margin}>
                        SUBMIT
                </Button>
              
                </div>
            );
        }
    }

    WorkoutList.propTypes = {
        classes: PropTypes.object.isRequired,
    };


export default withRouter(withStyles(styles)(WorkoutList));
