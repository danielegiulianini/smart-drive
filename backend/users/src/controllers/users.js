const profileService = require("../services/users");

const create = async (req, res) => {
  //params contained in client's post request
  let params = {
    _id: req.body.tokenUserId,
    surname: req.body.surname,
    name: req.body.name,
    gender: req.body.gender,
    language: req.body.language,
    email: req.body.email,
    city: req.body.city,
    country: req.body.country,
  };

  profileService
    .add(params)
    .then((profile) => res.status(201).json(profile)) //todo actions to be refactored since reused
    .catch((err) => res.status(400).json(err));
};

const get = (req, res) => {
  const userId = req.params.userId;

  profileService
    .get(userId)
    .then((profile) => res.status(200).json(profile))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

const edit = (req, res) => {
  const userId = req.params.userId;

  //params to be filtered before DB interaction for safety reason
  const params = req.body;

  profileService
    .edit(userId, params)
    .then((profile) => res.status(200).json(profile))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  get,
  edit,
};
