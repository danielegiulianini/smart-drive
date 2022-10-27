exports.sortByProperty = (array, propertyName) => {
  return array.sort((a, b) =>
    a[propertyName] > b[propertyName]
      ? 1
      : b[propertyName] > a[propertyName]
      ? -1
      : 0
  );
};

exports.arrayFilledWith = (value, length) => {
  //identical to: Array(length).fill(value)
  arrayToFill = [];

  for (let i = 0; i < length; i++) {
    arrayToFill.push(value);
  }

  return arrayToFill;
};

exports.makeRepeated = (arr, repeats) =>
  [].concat(...Array.from({ length: repeats }, () => arr));
