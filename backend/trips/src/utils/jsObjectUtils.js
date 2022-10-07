const convertFromObjectToArrayOfPairs = (obj) =>
  // Object.keys(obj).map((key) => [key, obj[key]]);
  Object.entries(obj);

//return the key which has minimum value in the object provided
const getKeyWithMinimumValue = async () => {
  return Object.keys(obj).reduce((key, v) => (obj[v] < obj[key] ? v : key));
};

module.exports = {
  convertFromObjectToArrayOfPairs,
  getKeyWithMinimumValue,
};
