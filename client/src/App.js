import React from 'react';
import {  BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Login from "./components/login/login.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import CreateExercise from './components/exercise/CreateExercise';
import AddExercise from './components/exercise/addexercise';


function App() {
  return (
    
    <Router>
      <div className="app">
          <Switch>
            <Route path="/exercise/create">
              <CreateExercise/>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            {/* this is the default route*/}
            <Route path="/ExerciseList">
              <AddExercise/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
