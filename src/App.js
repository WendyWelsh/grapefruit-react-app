import React, { Component } from 'react';
import './App.css';
import UserLandingPage from 'UserLandingPage.js';
import Login from './Login';
//import AccountForm from './AccountForm';
import WorkoutForm from './WorkoutForm';
//import MacroForm from './MacroForm';
// import WorkoutList from './WorkoutList'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3BF5EA',
      main: '#FF5B8E',
      dark: '#5B7EFF',
      contrastText: '#010302',
    },
    secondary: {
      light: '#5B7EFF',
      main: '#5B7DFF',
      dark: '#F56F1F',
      contrastText: 'black',
    },
    button: {
      backgroundColor: '#E8CB47',
      textColor: 'black',
      height: 50,
      width: 100,
      // borderRadius: 55,
      opacity: 50
    },
  },
});
  

class App extends Component {




  
  render() {
    return (
   <div>
    <MuiThemeProvider theme={theme}>
   {/* <WorkoutList /> */}
      <Login/>
      </MuiThemeProvider>
   </div>
    );
  }
}

export default App;
