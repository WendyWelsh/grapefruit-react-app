import React, { Component } from "react";
import "./App.css";
// import UserLandingPage from 'UserLandingPage.js';
import { Route, NavLink, HashRouter } from "react-router-dom";
import CoachList from "./CoachList";
import ClientList from "./ClientList";
import Login from "./Login";
import "./index.css";
//import AccountForm from './AccountForm';
import WorkoutForm from "./WorkoutForm";
//import MacroForm from './MacroForm';
// import WorkoutList from './WorkoutList'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NavBar from "./NavBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#9242f4",
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
      backgroundColor: "#9242f4",
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
            <NavBar />
            {/* <h1>Home</h1>
            <ul className="header">
              <li><NavLink to="/">Login</NavLink></li>
              <li><NavLink to="/clientlist">ClientList</NavLink></li>
              <li><NavLink to="/coachlist">CoachList</NavLink></li>
              <li><NavLink to="/workoutform">WorkoutForm</NavLink></li>

            </ul> */}
            <div className="content">
              <Route exact path="/" component={Login} />
              <Route path="/clientlist" component={ClientList} />
              <Route path="/coachlist" component={CoachList} />
              <Route path="/workoutform" component={WorkoutForm} />
            </div>
          </MuiThemeProvider>
        </div>
       </HashRouter>
    );
  }
}

export default App;
