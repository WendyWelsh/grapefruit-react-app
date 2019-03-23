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
  borderRadius: '10em',
  boxShadow: '2px 2px 0.5px white',
  fontSize: '16px',
  fontWeight: 'bold',
  fontFamily: 'Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif',
  border: '9px',
  color: 'red'
}

const paper = {
  padding: 180, 
  marginLeft: '10px', 
  maxWidth: '150px',
  textAlign: 'center',
  margin: 'auto',
  borderRadius: '8px',
  height: 'auto',
  backgroundColor: 'lightgray',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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
