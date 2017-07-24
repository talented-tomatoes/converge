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

    results.push(months[yy.getMonth() + 1] + ' ' + yy.getDate());
  }
  return results;
};

module.exports = renderListOfDatesFromConference;
