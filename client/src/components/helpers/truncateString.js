module.exports = (string) => {
  if (string.length < 30) {
    return string;
  } else {
    return string.slice(0, 30) + '...';
  }
};