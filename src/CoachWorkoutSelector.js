import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import WorkoutSelectorDropdown from './WorkoutSelectorDropdown';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    card: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
        height: 400,
        textAlign: 'center',
        alignItems: 'center',
    },
});

class CoachWorkoutSelector extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Workout Week"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                        <WorkoutSelectorDropdown />
                    </CardContent>
                    <CardActions>
                        <Button size="large">Submit</Button>
                    </CardActions>
                </Card>
{/* 
                <Button variant="contained" size="large" color="primary" className={classes.margin}>
                    Submit
                </Button> */}
            </div>
        );
    }
}

CoachWorkoutSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CoachWorkoutSelector));