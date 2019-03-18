import React, { Component } from "react";
import "./App.css";
import UserLandingPage from './UserLandingPage';
import CoachLandingPage from './CoachLandingPage';
import CoachList from "./CoachList";
import ClientList from "./ClientList";
import Login from "./Login";
import Register from "./Register";
import "./index.css";
import AccountForm from './AccountForm';
import MacroForm from './MacroForm';
import CoachWorkoutSelector from './CoachWorkoutSelector';
import WorkoutList from './WorkoutList'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import MessageBoard from "./MessageBoard";
import WorkoutForm from "./WorkoutForm";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#9242f4",
      main: "#607D8B", // slate blue
      dark: "#90A4AE", //med blue
      contrastText: "#010302"
    },
    secondary: {
      light: "#5B7EFF",
      main: "#5B7DFF",
      dark: "#F56F1F",
      contrastText: "black"
    },
    button: {
      backgroundColor: "#B0BEC5", //light grey
      textColor: "black",
      height: 50,
      width: 100,
      // borderRadius: 55,
      opacity: 50
    }
  }
});


class App extends Component {

  handleClick = event => {

  }

  render() {
    return (
      <Router>
        <div>
          <MuiThemeProvider theme={theme}>
            <NavBar />
            <div className="content">
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/coach/clientlist" component={ClientList} />
              {/* <Route path="/client/coachlist" component={CoachList} /> */}
              <Route path="/coach/client/:id/workout" component={WorkoutList} />
              <Route path="/macroform" component={MacroForm} />
              <Route path="/coachworkoutselector" component={CoachWorkoutSelector} />
              {/* <Route path="/messageboard" component={MessageBoard}/> */}
              <Route path="/client" component={UserLandingPage} />
              <Route exact path="/coach/client/:id" component={CoachLandingPage} />
            </div>
          </MuiThemeProvider>
        </div>
        </Router>
    );
  }
}

export default App;
