import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import ga from './ga';
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
    if (timezone !== this.state.timezone) {
      this.setState({ timezone });
      localStorage.setItem(this.props.id, JSON.stringify(timezone));
      try {
        ga.event({
            category: 'Timezone',
            action: 'Select',
            label: timezone || '',
        });
      } catch (err) {
        console.log(err);
      }
    }

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

    const timezoneSelector = (
      <Select
        style={{fontSize: '16px'}}
        value={this.state.timezone}
        onChange={(tz) => this.updateHandler(tz, localTime)}
        options={timezones}
      />
    )

    const datetimeSelector = (
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
    )

    return (
      <Grid container spacing={8}
        justify="center"
        alignItems="center"
        alignContent="center"
        className="row"
      >
        <Grid item sm={6} xs={12} className="timezone">
          {timezoneSelector}
        </Grid>
        <Grid item sm={5} xs={12} className="datetime">
          {datetimeSelector}
        </Grid>
        <Grid item sm={1} xs={2} className="remove">
          <Remove className="icon" onClick={this.removeHandler}/>
        </Grid>
      </Grid>
    )
  }
}

export default DateTimezonePair;
