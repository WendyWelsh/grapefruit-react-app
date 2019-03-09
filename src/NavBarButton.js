import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withRouter} from "react-router-dom"




class NavBarButton extends React.Component {
  constructor(props) {
    super(props)

    // this.directToUserLandingPage = this.directToUserLandingPage.bind(this)
    this.directToWorkoutForm = this.directToWorkoutForm.bind(this)
    this.directToMacroForm = this.directToMacroForm.bind(this)
    this.directToClientList = this.directToClientList.bind(this)
    this.directToCoachList = this.directToCoachList.bind(this)
  }
  state = {
    anchorEl: null,
  };
  
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  // directToUserLandingPage() {
  //   this.props.history.push("/UserLandingPage");
  // }
  directToWorkoutForm() {
    this.props.history.push("/workoutform");
  }
  directToMacroForm() {
    this.props.history.push("/macroform");
  }
  directToClientList() {
    this.props.history.push("/coach/clientlist");
  }
  directToCoachList() {
    this.props.history.push("/client/coachlist");
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
    {/* <MenuItem onClick={this.directToUserLandingPage}>Home</MenuItem>*/}
          <MenuItem onClick={this.directToWorkoutForm}>Workouts</MenuItem>
          <MenuItem onClick={this.directToMacroForm}>Macros</MenuItem>
          <MenuItem onClick={this.directToClientList}>Clients</MenuItem>
          <MenuItem onClick={this.directToCoachList}>Coaches</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(NavBarButton);
