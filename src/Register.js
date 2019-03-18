import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonNavigation from './ButtonNavigation';
import { withRouter } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import axios from "axios"

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
    opacity: "0.8",
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      password: null,
      email: null,
      role: '1',
      formErrors: {
        username: "",
        password: "",
        email: ""
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }



  //e.preventDefault() keeps page from refreshing after clicking submit
  handleSubmit(e) {
    e.preventDefault()

    //{username, email, password})
    axios.post("/create",
      {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,

      }
    ).then((response) => {
      localStorage.setItem("grapefruit-jwt", `Bearer ${response.data.data.token}`);
      if (response.data.role === 0) {
        this.props.history.push('/coach/clientlist')
      } else {
        this.props.history.push('/client')
      }


    })

  }

  handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    let formErrors = this.state.formErrors
    console.log("I'm working!")
    //switch is a cleaner else if statement
    //using ternary operator which is the ? so if value.length is less than 2 first string is executed if not second


    switch (name) {
      case "username":
        formErrors.username =
          value.length < 6
            ? 'minimum 6 characters required' : ""
        break;
      case "password":
        formErrors.password =
          value.length < 6
            ? 'minimum 6 characters required' : ""
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      default:
        break;

    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))

  }


  render() {
    const { classes } = this.props;
    const { formErrors } = this.state;
    return (
      <div className="Login">
        <ButtonNavigation />
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar} >
              <LockOutlinedIcon />
            </Avatar>
            <div>
              Register
            </div>
            <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">UserName</InputLabel>
                <Input
                  onChange={this.handleChange}
                  id="username"
                  name="username"
                  autoComplete="username"
                  className={formErrors.username.length > 0 ? "error" : null}
                  autoFocus
                />
                {formErrors.username.length > 0 && (
                  <span className="errorMessage">{formErrors.username}</span>
                )}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  className={formErrors.email.length > 0 ? "error" : null}
                  onChange={this.handleChange}
                  noValidate
                  autoFocus />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}

              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={formErrors.password.length > 0 ? "error" : null}
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </FormControl>


              <RadioGroup
                aria-label="role"
                name="role"
                value={this.state.role}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio color="primary" />}
                  label="Coach"

                />
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="Client"

                />
              </RadioGroup>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
          </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}


Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Register));