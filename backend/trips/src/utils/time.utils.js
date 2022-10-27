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

module.exports = {
  now,
  addMinutes,
  subtractMinutes,
  subtractSeconds,
};
