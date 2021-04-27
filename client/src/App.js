import React from 'react';
import {  BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from './components/navbar/navbar';
import ListExercise from './components/exercise/ListExercise';
import EditExercise from './components/exercise/EditExercise';
import CreateExercise from './components/exercise/CreateExercise';

function App() {
  return (
    <Router>
      <div className="app">
          <Switch>
            <Route path="/exercise/list">
              <ListExercise/>
            </Route>
            <Route path="/exercise/create">
              <CreateExercise/>
            </Route>
            <Route path="/exercise/edit">
              <EditExercise/>
            </Route>
          <Route path="/">
            <Navbar/>
              </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
