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

const ranges = [
    {
        value: '0-20',
        label: '0 to 20',
    },
    {
        value: '21-50',
        label: '21 to 50',
    },
    {
        value: '51-100',
        label: '51 to 100',
    },
];

class WorkoutList extends React.Component {
    state = {
        weight: '',
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
                    value={this.state.weightRange}
                    onChange={this.handleChange('weightRange')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Muscle Group</InputAdornment>,
                    }}
                >
                    {ranges.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    value={this.state.weightRange}
                    onChange={this.handleChange('weightRange')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Workout</InputAdornment>,
                    }}
                >
                    {ranges.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    value={this.state.weightRange}
                    onChange={this.handleChange('weightRange')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Sets</InputAdornment>,
                    }}
                >
                    {ranges.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    value={this.state.weightRange}
                    onChange={this.handleChange('weightRange')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Reps</InputAdornment>,
                    }}
                >
                    {ranges.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    value={this.state.weightRange}
                    onChange={this.handleChange('weightRange')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">RPE</InputAdornment>,
                    }}
                >
                    {ranges.map(option => (
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
