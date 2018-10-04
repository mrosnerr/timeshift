import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
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
        <Grid container>
          <Hidden xsDown>
            <TableRow key={this.props.id}>
              <TableCell style={{width: 300, padding: '2em', textAlign: 'center'}}>
                {timezoneSelector}
              </TableCell>
              <TableCell style={{width: 300, padding: '2em', textAlign: 'center'}}>
                {datetimeSelector}
              </TableCell>
              <TableCell style={{width: 100, padding: '2em', textAlign: 'center'}}>
                <Remove style={{ fontSize: 30 }} onClick={this.removeHandler}/>
              </TableCell>
            </TableRow>
          </Hidden>
          <Hidden smUp>
              <Grid container spacing={12}
                justify="left"
                alignItems="center"
                style={{
                  height: '100px',
                  marginTop: '10px',
                  marginLeft: '15px',
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                <Grid item xs={8} container>
                  <Grid item xs={12}>
                    {timezoneSelector}
                  </Grid>
                  <Grid item xs={12}>
                    {datetimeSelector}
                  </Grid>
                </Grid>
                <Grid item xs={4} container
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                  <Grid item xs={12}>
                    <Remove style={{ fontSize: 30 }} onClick={this.removeHandler}/>
                  </Grid>
                </Grid>
              </Grid>
          </Hidden>
        </Grid>
    )
  }
}

export default DateTimezonePair;
