const moment = require("moment");

const now = () => {
  return moment().utcOffset(0, false).toDate();
};

const addMinutes = (date, minutes) => {
  //return new Date(date.getTime() + minutes * 60000);
  return moment(date).add(minutes, "m").utcOffset(0, false).toDate(); //.toDate().toISOString();
};

const subtractMinutes = (date, minutes) => {
  return addMinutes(date, -minutes);
};
const subtractSeconds = (date, seconds) => {
  return moment(date).subtract(seconds, "s").utcOffset(0, false).toDate();
};

var dayInMilliseconds = 1000 * 60 * 60 * 24;
const runEveryDaySinceNow = (callback) => {
  setInterval(callback, dayInMilliseconds);
};

module.exports = {
  now,
  addMinutes,
  subtractMinutes,
  subtractSeconds,
  runEveryDaySinceNow,
};
