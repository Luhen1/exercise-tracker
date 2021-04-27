import React from 'react';
import { Link } from 'react-router-dom';

function navbar() {

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
        <Link to="/" className="navbar-brand">Fit Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/exercise/list" className="nav-link">Exercise</Link>
          </li>          
        </ul>
        </div>
      </nav>
    );
}

export default navbar;
