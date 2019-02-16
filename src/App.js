import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import AccountForm from './AccountForm';
import WorkoutForm from './WorkoutForm';
//import MacroForm from './MacroForm';
class App extends Component {
  render() {
    return (
   <div>
     <WorkoutForm />
   </div>
    );
  }
}

export default App;
