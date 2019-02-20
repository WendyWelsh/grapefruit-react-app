import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';

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

const muscleGroup = [
    {
        value: 'Chest',
        label: 'Chest',
    },
    {
        value: 'Back',
        label: 'Back',
    },
    {
        value: 'Legs',
        label: 'Legs',
    },
    {
        value: 'Shoulders',
        label: 'Shoulders',
    },
    {
        value: 'Calves',
        label: 'Calves',
    },
    {
        value: 'Biceps',
        label: 'Biceps',

    },
    {
        value: 'Cardio',
        label: 'Cardio',
    },
    {
        value: 'Glutes',
        label: 'Glutes',
    },
];
const workout = [
    {
        value: 'Bench press',
        label: 'Bench press',
    },
    {
        value: 'Incline Press',
        label: 'Incline Press',
    },
    {
        value: 'Flys',
        label: 'Flys',
    },
    {
        value: 'Pushups',
        label: 'Pushups',
    },
    {
        value: 'Dips',
        label: 'Dips',
    },
    {
        value: 'Decline Press',
        label: 'Decline Press',
    },
];

const sets = [
    {value: '1',label: '1',},
    {value: '2',label: '2',},
    {value: '3',label: '3',},
    {value: '4',label: '4',},
    {value: '5',label: '5',},
    {value: '6',label: '6',},
    {value: '7',label: '7',},
    {value: '8',label: '8',},
    {value: '9',label: '9',},
    {value: '10',label: '10',},
]
const reps = [
    {value: '1',label: '1',},
    {value: '2',label: '2',},
    {value: '3',label: '3',},
    {value: '4',label: '4',},
    {value: '5',label: '5',},
    {value: '6',label: '6',},
    {value: '7',label: '7',},
    {value: '8',label: '8',},
    {value: '9',label: '9',},
    {value: '10',label: '10',},
]
const rpe = [
    {value: '1',label: '1',},
    {value: '2',label: '2',},
    {value: '3',label: '3',},
    {value: '4',label: '4',},
    {value: '5',label: '5',},
    {value: '6',label: '6',},
    {value: '7',label: '7',},
    {value: '8',label: '8',},
    {value: '9',label: '9',},
    {value: '10',label: '10',},
]

class WorkoutList extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            muscleGroup: '',
            workout: '',
            sets: '',
            reps: '',
            rpe: '',
            
        };
      

    };
    handleClick = () => {
       console.log("you clicked the FN button!!")
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }

        render() {
            const { classes } = this.props;

            return (
                <div className={classes.root}>
                    <TextField
                        select
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        value={this.state.muscleGroup}
                        onChange={this.handleChange('muscleGroup')}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Muscle Group</InputAdornment>,
                        }}
                    >
                        {muscleGroup.map(option => (
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
                        {workout.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
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
                        {sets.map(option => (
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
                        {reps.map(option => (
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
                        {rpe.map(option => (
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


export default withStyles(styles)(WorkoutList);
