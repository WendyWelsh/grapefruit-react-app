import React, { Component } from 'react';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
// import AccountForm from './AccountForm';
import CoachList from './CoachList';
import ClientList from './ClientList';
import Login from './Login';
import './index.css';


class App extends Component {
  render() {
    return (
      <HashRouter>


        <div>
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
        </div>


      </HashRouter>
    );
  }
}


export default App;

// // import React, {Component} from "react";

// // class App extends Component {
// //   render() {
// return (
//     <div>
//       <h1>Simple SPA</h1>
//       <ul className="header">
//         <li><a href="/">Home</a></li>
//         <li><a href="/stuff">Stuff</a></li>
//         <li><a href="/contact">Contact</a></li>
//       </ul>
//       <div className="content">

//       </div>
//     </div>
// );
//   }

// export default App;