import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavBarButton from './NavBarButton';
import { InputLabel } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,

    };
    this.directToLogin = this.directToLogin.bind(this)
  }
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  directToLogin() {
    this.props.history.push("/");
    localStorage.removeItem("grapefruit-jwt");
    console.log("pushed")
  };
  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className="logo" position="static">
          <Toolbar  >
            {/* <IconButton className="{classes.menuButton}" color="inherit" aria-label="Menu">       
         <NavBarButton/>
          </IconButton> */}
            {/* <div className="icon" ></div> */}
            <Typography className={classes.grow}>

              {/* Grapefruit */}
              {/* <GrapefruitLogo /> */}
              {/* <svgIcon width="568" height="150" viewBox="0 0 568 150" fill="none" xmlns="http://www.w3.org/2000/svg"
            ></svgIcon> */}

              {/* <img src='images/grapfruitlogo.jpg' variant="h6" color="inherit" width="80" height="50"/> */}

            </Typography>
            <Button
              onClick={this.directToLogin}
              color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavBar));