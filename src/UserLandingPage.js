import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MessageBoard from "./MessageBoard";
import { Z_BLOCK } from "zlib";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    fontFamily: "Poiret One",
    

  },
  input: {
    display: "none"
  }
});

const buttonStyle = {
  borderRadius: "20px",
  // boxShadow: '2px 2px 0.5px white',
  border: "black solid 1px",
  fontSize: "20px",
  fontFamily: "Poiret One",
  color: "slate gray"
};

const paper = {
  filter: 'brightness(75%)',
  paddingTop: 90,
  paddingLeft: 120,
  paddingBottom: 90,
  paddingRight: 120,
  opacity: "0.85",
  maxWidth: "150px",
  textAlign: "center",
  margin: "auto",
  borderRadius: "20px",
  backgroundColor: "white",

  // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
};

class UserLandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.directToMessageBoard = this.directToMessageBoard.bind(this);
    this.directToMacroForm = this.directToMacroForm.bind(this);
    this.directToWorkoutForm = this.directToWorkoutForm.bind(this);
  }

  state = {
    anchorel: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  directToMessageBoard() {
    this.props.history.push("/messageboard");
  }

  directToMacroForm() {
    this.props.history.push("/macros");
  }

  directToWorkoutForm() {
    this.props.history.push("/workout");
  }

  render() {
    return (
      <div className="UserLandingPage">
        <div style={{ paddingTop: "10%" }}>
          <Paper style={paper}>
            <Button
              style={buttonStyle}
              onClick={this.directToWorkoutForm}
              variant="outlined"
              color="inherit"
              fontFamily="Poiret One"
            >
              Workout Log
            </Button>
            <div style={{paddingBottom:'50px'}}></div>
            <Button
              style={buttonStyle}
              onClick={this.directToMacroForm}
              variant="outlined"
              color="inherit"
              fontFamily="Poiret One"
            >
              Macro Track Log
            </Button>
          </Paper>
          <MessageBoard sender="Wendy" receiver="Matt" />
        </div>
      </div>
    );
  }
}

export default UserLandingPage;
