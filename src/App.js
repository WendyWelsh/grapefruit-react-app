import React, { Component } from 'react';
import './App.css';
import UserLandingPage from 'UserLandingPage.js';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import CoachList from './CoachList';
import ClientList from './ClientList';
import Login from './Login';
import './index.css';
//import AccountForm from './AccountForm';
import WorkoutForm from "./WorkoutForm";
//import MacroForm from './MacroForm';
// import WorkoutList from './WorkoutList'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#3BF5EA",
      main: "#FF5B8E",
      dark: "#5B7EFF",
      contrastText: "#010302"
    },
    secondary: {
      light: "#5B7EFF",
      main: "#5B7DFF",
      dark: "#F56F1F",
      contrastText: "black"
    },
    button: {
      backgroundColor: "#E8CB47",
      textColor: "black",
      height: 50,
      width: 100,
      // borderRadius: 55,
      opacity: 50
    }
  }
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <MuiThemeProvider theme={theme}>
            <h1>Home</h1>
            <ul className="header">
              <li><NavLink to="/">Login</NavLink></li>
              <li><NavLink to="/clientlist">ClientList</NavLink></li>
              <li><NavLink to="/coachlist">CoachList</NavLink></li>
            </ul>
            <div className="content">
              <Route exact path="/" component={Login} />
              <Route path="/clientlist" component={ClientList} />
              <Route path="/coachlist" component={CoachList} />
            </div>
          </MuiThemeProvider>
        </div>
      </HashRouter>
    );
  }
}

export default App;
