import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import Hidden from '@material-ui/core/Hidden';
import ViewWeb from './ViewWeb';
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
        <Hidden xsDown>
          <ViewWeb />
        </Hidden>
      </div>
    );
  }
}

export default App;
