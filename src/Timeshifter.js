import React, { Component } from 'react';
import { DateTime } from 'luxon';
import Grid from '@material-ui/core/Grid';
import DateTimezonePair from './DateTimezonePair';
import { PlaylistAdd } from '@material-ui/icons';

class Timeshifter extends Component {
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
      <Grid container
        direction="column"
        className="container"
      >
        <Grid item xs={12}>
          {rows}
        </Grid>
        <Grid item xs={12}>
          <PlaylistAdd className='icon' onClick={this.addRecord} />
        </Grid>
      </Grid>
    );
  }
}

export default Timeshifter;
