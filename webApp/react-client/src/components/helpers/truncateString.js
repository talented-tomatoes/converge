module.exports = (string, num) => {
  if (string.length < num) {
    return string;
  } else {
    return string.slice(0, num) + '...';
  }
};