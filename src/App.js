import React, { Component } from 'react';
import { DateTime } from 'luxon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MetaTags from 'react-meta-tags';
import './App.css';
import DateTimezonePair from './DateTimezonePair';
import { PlaylistAdd } from '@material-ui/icons';

class App extends Component {
  constructor() {
    super();
    const cached = localStorage.getItem('records');
    const records = cached ? JSON.parse(cached) : [];
    console.log('records', records);
    this.state = {
      records,
      utc: DateTime.utc()
    };
  }

  componentDidMount() {
    if (this.state.records.length === 0) {
      this.addRecord();
      this.addRecord();
    }
  }

  addRecord = () => {
    const record = {}

    const records = this.state.records;

    records.push(record);

    this.setState({ records })
    localStorage.setItem('records', JSON.stringify(records));
  }

  updateHandler = (utc) => {
    this.setState({ utc });
  }

  removeHandler = (id) => {
    const records = this.state.records;

    records.splice(id, 1);

    this.setState({ records });
    localStorage.setItem('records', JSON.stringify(records));
  }

  render() {

    const rows = this.state.records.map((record, index) => {
      const readOnly = (index !== 0);

      return (
        <DateTimezonePair
          key={index}
          id={index}
          readOnly={readOnly}
          utc={this.state.utc}
          updateHandler={this.updateHandler}
          removeHandler={this.removeHandler}
        />
      )
    });

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
          <Table style={{ width: 700, margin: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{textAlign: 'center', fontSize: 20 }}>Timezone</TableCell>
              <TableCell style={{textAlign: 'center', fontSize: 20 }}>Date + Time</TableCell>
              <TableCell style={{textAlign: 'center', fontSize: 20 }}>Remove</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        <PlaylistAdd className='iconHover' style={{ fontSize: 30, height: 75 }} onClick={this.addRecord}/>
      </div>
    );
  }
}

export default App;
