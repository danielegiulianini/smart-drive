/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const select = (obj, ...props) => filterObj(obj, (k) => props.includes(k));
const omit = (obj, ...props) => filterObj(obj, (k) => !props.includes(k));

module.exports = {
  pick,
  select,
  omit,
};
