//redirecting here to external service
//è UN PROBLEMA SE ALCUNE NON HA NNO IL PARAMS??? a questo ci vpensa il check null della validation del middleware!
const { setResponseWithGetJsonDataFrom } = require("../utils/axiosUtils");

//get years
const getYears = async (req, res) => {
  setResponseWithGetJsonDataFrom(
    "/https://www.fueleconomy.gov/ws/rest/vehicle/menu/year",
    {}, //no req.query's nor req.params' params
    res
  );
};

//get makes (filtering model too)
const getMakes = async (req, res) => {
  setResponseWithGetJsonDataFrom(
    "/https://www.fueleconomy.gov/ws/rest/vehicle/menu/make",
    {
      params: {
        //must use QUERY params to speak to fueleconomy
        year: req.query.year,
      },
    },
    res
  );
};

//get models (filtering year and makes too)
const getModels = async (req, res) => {
  setResponseWithGetJsonDataFrom(
    "/https://www.fueleconomy.gov/ws/rest/vehicle/menu/model",
    {
      params: {
        //must use QUERY params to speak to fueleconomy
        year: req.query.year,
        make: req.query.make,
      },
    },
    res
  );
};

//get series and vin (filtering year and and make and model too)
const getSeries = async (req, res) => {
  setResponseWithGetJsonDataFrom(
    "/https://www.fueleconomy.gov/ws/rest/vehicle/menu/model",
    {
      params: {
        //must use QUERY params to speak to fueleconomy
        year: req.query.year,
        make: req.query.make,
        model: req.query.model,
      },
    },
    res
  );
};

//get single detail filtered with vin
const getVehiclesDetails = async (req, res) => {
  setResponseWithGetJsonDataFrom(
    "/https://www.fueleconomy.gov/ws/rest/vehicle/" + req.params.vehicleId,
    //must use vehicle ID to speak to fueleconomy
    {},
    res
  );
};

module.exports = {
  getYears,
  getMakes,
  getModels,
  getSeries,
  getVehiclesDetails,
};
