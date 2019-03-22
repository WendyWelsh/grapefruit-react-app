import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'


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

class DateSelector extends React.Component {
  constructor() {
    super()
    this.state = {
      dateTime: null,
      
    }
  }

  setDate = (event) => {
    this.props.updateDate(event.target.value)
  }
  render() {
    const { classes } = this.props;
    
  
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Week of"
          type="date"
          defaultValue={moment().format('YYYY-MM-DD')}
          className={classes.textField}
          onChange={this.setDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
}

DateSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateSelector);