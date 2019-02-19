import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
//import AccountForm from './AccountForm';
//import WorkoutForm from './WorkoutForm';
//import MacroForm from './MacroForm';
// import WorkoutList from './WorkoutList'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5AD5CD',
      main: '#52C2BB',
      dark: '#5AD5CE',
      contrastText: '#010302',
    },
    secondary: {
      light: '#CE7AD9',
      main: '#A04BA8',
      dark: '#A033A8',
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
