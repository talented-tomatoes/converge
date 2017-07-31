const months = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}

module.exports = (date) => {
  date = date.split('-');
  return months[Number(date[1])] + ' ' + Number(date[2]);
}

// console.log(months[Number(01)]);