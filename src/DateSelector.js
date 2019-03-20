import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 23,
    
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    
  },
  dense: {
    marginTop: 16,
},
  menu: {
    width: 200,
},
margin: {
  margin: theme.spacing.unit,
 },

});

function DateSelector(props) {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Week of"
        type="date"
        defaultValue="2019-03-01"
        className={classes.textField}
        onChange={props.onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

DateSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateSelector);