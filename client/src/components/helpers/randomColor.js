module.exports = () => {
  var colors = ['#ff2d55', '#5856d6', '#007aff', '#5ac8fa', '#ffcc00', '#ff9500', '#ff3b30', '#4cd964'];
  return colors[Math.floor(Math.random() * (colors.length -1 + 1))];
}