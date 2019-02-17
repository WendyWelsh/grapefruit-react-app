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

class WorkoutList extends React.Component {
    state = {
        muscleGroup: '',
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };



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
                    value={this.state.muscleGroup}
                    onChange={this.handleChange('muscleGroup')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Workout</InputAdornment>,
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
                    value={this.state.muscleGroup}
                    onChange={this.handleChange('muscleGroup')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Sets</InputAdornment>,
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
                    value={this.state.muscleGroup}
                    onChange={this.handleChange('muscleGroup')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Reps</InputAdornment>,
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
                    value={this.state.muscleGroup}
                    onChange={this.handleChange('muscleGroup')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">RPE</InputAdornment>,
                    }}
                >
                    {muscleGroup.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="outlined" size="large" color="primary" className={classes.margin}>
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
