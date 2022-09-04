const tripsService = require("../services/trips");

const create = async (req, res) => {
  try {
    const trip = await tripsService.add(req.body);
    res.status(201).json(trip); //todo actions to be refactored since reused
  } catch (err) {
    res.status(400).json(err);
  }
};


//frontend sending all the trips data or only the pair (patch)

const close = async (req, res) => {
  try {
    const trip = await tripsService.add(req.body);
    res.status(201).json(trip); //todo actions to be refactored since reused
  } catch (err) {
    res.status(400).json(err);
  }
};

const get = async (req, res) => {
  tripsService
    .get(userId)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(400).json(err));
  try {
    const trip = await tripsService.add(req.body);
    res.status(201).json(trip); //todo actions to be refactored since reused
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAll = async (req, res) => {
  tripsService
    .get(userId)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(400).json(err));
  try {
    const trip = await tripsService.add(req.body);
    res.status(201).json(trip); //todo actions to be refactored since reused
  } catch (err) {
    res.status(400).json(err);
  }
};




//no possibility to edit or delete trip externally ...

module.exports = {
  create,
  close,
  get,
  getAll,
};
