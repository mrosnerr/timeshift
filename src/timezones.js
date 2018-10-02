import moment from 'moment-timezone';

const userTimezoneName = moment.tz.guess();
const timezoneNames = moment.tz.names();
const timezones = [];

for (let i = 0; i < timezoneNames.length; i++) {
  const timezoneName = timezoneNames[i];

  timezones.push({
    value: timezoneName,
    label: timezoneName,
  });
}

const userTimezone = timezones.find((timezone) => {
  return timezone.value === userTimezoneName;
});

export {
  timezones,
  userTimezone,
}

