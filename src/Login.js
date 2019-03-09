import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router-dom';
import axios from "axios"

import ButtonNavigation from './ButtonNavigation';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


const formValid = ({ formErrors, ...rest }) => {
  let valid = true

  //validate form errors being empty
  Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false)
  })

  //validate the form was filled out
  Object.values(rest).forEach(val => {
      val === null && (valid = false)
  })

  return valid
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      email: null,
      password: null,
      logged_in: false,
      token: null,
      formErrors: {
        email: "",
        password: "",
        logged_in: false,
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    //{username, password})

    axios.post("/login",

        {
            email: this.state.email,
            password: this.state.password,

        }
    ).then((response) => {
       this.props.history.push('/user')
       localStorage.setItem("grapefruit-jwt", `Bearer ${response.data.data.token}`);

    })


}


handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    let formErrors = this.state.formErrors

    switch (name) {
        case "email":
            formErrors.email =
                value.length < 6
                    ? 'minimum 6 characters required' : ""
            break;
        case "password":
            formErrors.password =
                value.length < 6
                    ? 'minimum 6 characters required' : ""
            break;
        default:
            break;

    }

    this.setState({ formErrors, [name]: value })

}

  render() {
    const { formErrors } = this.state

    const { classes } = this.props;
    return (
      <div className = "Login">
     <ButtonNavigation />
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <h1>
            Login
        </h1>
          <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
              className={formErrors.email.length > 0 ? "error" : null}
              id="email" 
              name="email" 
              autoComplete="email" 
              autoFocus 
              onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Password</InputLabel>
              <Input 
              className={formErrors.password.length > 0 ? "error" : null}
              id="password" 
              name="password" 
              type="password" 
              autoComplete="current-password"
              onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </FormControl>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Login
          </Button>
          </form>
        </Paper>
      </main>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Login));