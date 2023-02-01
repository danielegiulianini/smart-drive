const ProfileService = require("../services/users");
const AchievementsService = require("../services/achievements");

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
    //profilePictureUri: req.body.profilePictureUri,
  };


  ProfileService.add(params)
    .then((profile) => res.status(201).json(profile)) //todo actions to be refactored since reused
    .catch((err) => res.status(400).json(err));
};

const get = (req, res) => {
  const userId = req.params.userId; //same identifier contained in routes file

  ProfileService.get(userId)
    .then((profile) => res.status(200).json(profile))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

const edit = (req, res) => {
  const userId = req.params.userId; //same identifier contained in routes file
  console.log("edit request for users received");

  const params = req.body;

  ProfileService.edit(userId, params)
    .then((profile) => res.status(200).json(profile))
    //should use a dto here (response containing sensitive info! not, actually)
    .catch((err) => res.status(400).json(err));
};

const list = (req, res) => {
  //params to be filtered before DB interaction for safety reason (in validation middleware)

  ProfileService.list(req.query)
    .then((profiles) => res.status(200).json(profiles))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  get,
  edit,
  list,
};
