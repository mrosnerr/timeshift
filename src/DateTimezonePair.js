import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import { Remove } from '@material-ui/icons';
import { DateTime } from 'luxon';
import { timezones, userTimezone } from './timezones';

class DateTimezonePair extends Component {
  componentWillMount() {
    const cached = localStorage.getItem(this.props.id);
    const timezone = cached ? JSON.parse(cached) : userTimezone;
    this.setState({
     timezone
    });
  }

  updateHandler = (timezone, localtime) => {
    this.setState({ timezone });
    localStorage.setItem(this.props.id, JSON.stringify(timezone));

    const utcTime = DateTime.fromISO(
      localtime,
      { zone: timezone.value }
    ).toUTC();

    if (!this.props.readOnly && utcTime.isValid) {
      this.props.updateHandler(utcTime);
    }
  }

  removeHandler = () => {
    localStorage.removeItem(this.props.id);
    this.props.removeHandler(this.props.id)
  }

  render() {
    const utc = this.props.utc;
    const zonedTime = utc.setZone(this.state.timezone.value)
    const localTime = zonedTime.toFormat(`yyyy-MM-dd'T'T`);

    return (
      <TableRow key={this.props.id}>
        <TableCell style={{width: 300, padding: '2em', textAlign: 'center'}}>
          <Select
            style={{fontSize: '16px'}}
            value={this.state.timezone}
            onChange={(tz) => this.updateHandler(tz, localTime)}
            options={timezones}
          />
        </TableCell>
        <TableCell style={{width: 300, padding: '2em', textAlign: 'center'}}>
          <TextField
            style={{fontSize: '16px'}}
            type="datetime-local"
            disabled={this.props.readOnly}
            value={localTime}
            onChange={(e) => this.updateHandler(
              this.state.timezone,
              e.target.value
            )}
          />
        </TableCell>
        <TableCell style={{width: 100, padding: '2em', textAlign: 'center'}}>
          <Remove style={{ fontSize: 30 }} onClick={this.removeHandler}/>
        </TableCell>
      </TableRow>
    )
  }
}

export default DateTimezonePair;
