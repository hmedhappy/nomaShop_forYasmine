const dayjs = require('dayjs');
exports.now = dayjs().format();

/* function calcTime() {
  var offset = '+1.0';
  // create Date object for current location
  var d = new Date();
  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * offset);
  // return time as a string
  return nd;
}
exports.calcTime = calcTime; */
