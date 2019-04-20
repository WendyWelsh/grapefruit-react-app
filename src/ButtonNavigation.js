import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background,
    marginLeft: "auto",
    marginRight: "auto",
    width: 400,
    opacity: "0.8",
    paddingTop: "80px"
  }
});

class ButtonNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.directToLogin = this.directToLogin.bind(this);
    this.directToRegister = this.directToRegister.bind(this);
  }
  state = {
    value: 0
  };

  handleChange = value => {
    this.setState({ value });
  };

  directToRegister() {
    this.props.history.push("/register");
  }
  directToLogin() {
    this.props.history.push("/");
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs variant="fullWidth">
            <Button onClick={this.directToLogin}>Login</Button>
            <Button onClick={this.directToRegister}>Register</Button>
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

ButtonNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ButtonNavigation));
