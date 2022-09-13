const axios = require("axios");

const setResponseWithGetDataFrom = async (url, config, res) => {
  try {
    const response = await axios.get(url, config);
    res.json(response.data);
  } catch (err) {
    console.log(err); //or next(err) to log errors only in one place
  }
};

const setResponseWithGetJsonDataFrom = async (url, paramsObj, res) => {
  setResponseWithGetDataFrom(
    url,
    Object.assign(paramsObj, {
      headers: {
        Accept: "application/json", //for requesting in json or:   responseType: 'stream'
      },
    }),
    res
  );
};

module.exports = {
  setResponseWithGetDataFrom,
  setResponseWithGetJsonDataFrom,
};
