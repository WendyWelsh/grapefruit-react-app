import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import AccountForm from './AccountForm';
//import WorkoutForm from './WorkoutForm';
//import MacroForm from './MacroForm';
import WorkoutList from './WorkoutList'
class App extends Component {
  render() {
    return (
   <div>
   <WorkoutList />
    
   </div>
    );
  }
}

export default App;
