'use strict';
const format = (number) => {
    return number > 9 ? '' + number: '0' + number;
};
export default const formatTime = (unixTime) => {
    if (unixTime == null) {
      return;
    }
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(parseInt(unixTime.toString().slice(0, 13)));
    const hours = format(date.getHours());
    const minutes = format(date.getMinutes());
    const seconds = format(date.getSeconds());
    const day = format(date.getDate());
    const month = MONTHS[date.getMonth()];
    return `${hours}:${minutes}:${seconds} - ${month} ${day}`;
}