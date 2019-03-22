import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MessageBoard from "./MessageBoard";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,

  },
  input: {
    display: 'none',
  },
});

const buttonStyle = {
  borderRadius: '10%',
}

const paper = {
  padding: 150, 
  marginLeft: '10px', 
  maxWidth: '150px',
  textAlign: 'center',
  margin: 'auto',
  
}


class UserLandingPage extends React.Component {
  constructor(props) {
    super(props)

    this.directToMessageBoard = this.directToMessageBoard.bind(this)
    this.directToMacroForm = this.directToMacroForm.bind(this)
    this.directToWorkoutForm = this.directToWorkoutForm.bind(this)
  }

  state = {
    anchorel: null,
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  directToMessageBoard() {
    this.props.history.push("/messageboard")
  }

  directToMacroForm() {
    this.props.history.push("/macroform")
  }

  directToWorkoutForm() {
    this.props.history.push("/workoutform")
  }

  render() {
    return (
      <div className="UserLandingPage">
         {/* <Grid container>
    */}
          {/* <Grid item xs={6} sm={3}>
           */} 
            <Paper style={paper}>
            <Button style={buttonStyle} onClick = {this.directToWorkoutForm} variant="outlined" color="inherit">
                Workout Log
              </Button>
              <Button style={buttonStyle} onClick = {this.directToMacroForm} variant="outlined" color="inherit">
                Macro Track Log
              </Button>
            </Paper>
          {/* </Grid> */}
        {/* </Grid> */}
        <MessageBoard sender="Wendy" receiver="Matt"/>
      </div>
    )
  }
}

export default UserLandingPage;