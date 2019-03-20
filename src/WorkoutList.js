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
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import DateSelector from './DateSelector';

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
            date: '',
            workoutMuscleGroup: '',
            workout: '',
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


    };


    handleSubmit = () => {
        let selectedWorkout = {
            date: this.state.date,
            muscleGroup: this.state.workoutMuscleGroup,
            workout: this.state.workout,
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





    render() {
        console.log(this.getExercisesByMuscles())


        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Grid container>

                    <Grid item sm>
                        <Paper style={{ padding: 2,  margin: 10, textAlign: 'left', opacity: 0.9 }}>
                            <Button  color="inherit">
                                <h1>{this.state.client.username}</h1>
                            </Button>
                        </Paper>
                        <form className={classes.container} noValidate autoComplete="off">
                         <DateSelector 
                         value={this.state.date}  
                         onChange={this.handleChange('date')} />
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
                            onClick={this.handleSubmit}
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

            </div>
        );
    }
}

WorkoutList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withRouter(withStyles(styles)(WorkoutList));
