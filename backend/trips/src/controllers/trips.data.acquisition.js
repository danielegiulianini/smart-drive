const tripsService = require("../services/trips.dataAcquisition");

//extract VIN from topic
const addMeasurement = async (payload) => {
  //no need for destructuring (mongoose's strict option cut exceeding fields off)
  /*let params = {
        _id: payload.tokenUserId,
        surname: payload.surname,
        name: payload.name,
        gender: req.body.gender,
        language: req.body.language,
        email: req.body.email,
        city: req.body.city,
        country: req.body.country,
      };*/
  try {
    await tripsService.addMeasurement(payload);
  } catch (error) {
    //returning error to arduino? you can't (mqtt is not request/response)
    console.log(error);
  }
};

module.exports = addMeasurement;
