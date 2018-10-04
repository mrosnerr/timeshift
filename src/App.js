import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import Timeshifter from './Timeshifter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MetaTags>
          <title>Timeshift</title>
          <meta name="description" content="A utility for deriving dates and times across timezones" />
        </MetaTags>
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
