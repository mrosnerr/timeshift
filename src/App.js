import React, { Component } from 'react';
import ga from './ga';
import Timeshifter from './Timeshifter';
import './App.css';

class App extends Component {
  render() {
    ga.pageview('/');
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Timeshift</h1>
        </header>
        <p className="App-intro">
          A utility for deriving dates + times across timezones
        </p>
        <Timeshifter />
      </div>
    );
  }
}

export default App;
