import React, { Component } from "react";
import "./App.css";
import UserLandingPage from './UserLandingPage';
import CoachList from "./CoachList";
import ClientList from "./ClientList";
import Login from "./Login";
import "./index.css";
//import AccountForm from './AccountForm';
// import WorkoutForm from "./WorkoutForm";
//import MacroForm from './MacroForm';
// import WorkoutList from './WorkoutList'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

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
      <Router>
        <div>
          <MuiThemeProvider theme={theme}>
            <NavBar />
            <div className="content">
              <Route exact path="/Login" component={Login} />
              <Route path="/clientlist" component={ClientList} />
              <Route path="/coachlist" component={CoachList} />
              <Route path="/workoutform" component={WorkoutForm} />
              <Route path="/userlandingpage" component={UserLandingPage} />
            </div>
          </MuiThemeProvider>
        </div>
        </Router>
    );
  }
}

export default App;
