const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

// expects an object
const renderListOfDatesFromConference = (conference) => {
  console.log(conference);
  var results = [];
  var day = 1000 * 60 * 60 * 24;
  date1 = new Date(conference.start_date);
  date2 = new Date(conference.end_date);


  var diff = (date2.getTime() - date1.getTime()) / day;
  for (var i = 1; i <= diff + 1; i++) {
    var xx = date1.getTime() + day * i;
    var yy = new Date(xx);

    results.push(months[yy.getMonth() + 1] + ' ' + yy.getDate() + ', ' + yy.getFullYear());
  }
  return results;
};

module.exports = renderListOfDatesFromConference;