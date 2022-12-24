const NotificationService = require("../services/notifications");

const list = (req, res) => {
  //params to be filtered before DB interaction for safety reason (in validation middleware)

  NotificationService.list(req.query)
    .then((notifications) => res.status(200).json(notifications))
    .catch((err) => res.status(400).json(err));
};

const edit = (req, res) => {
  const notificationId = req.params.notificationId; //same identifier contained in routes file
  console.log("edit request for notifications received");
  //params to be filtered before DB interaction for safety reason
  const params = req.body;

  NotificationService.edit(notificationId, params)
    .then((notification) => res.status(200).json(notification))
    .catch((err) => res.status(400).json(err));
};

//add (for testing)
const create = async (req, res) => {
  //params contained in client's post request
  let params = {
    _id: req.body.notificationId,
    read: req.body.isRead,
  };

  console.log("la req ottenuta by notifications' create: ");
  console.log(req.body);

  console.log("i params ottenuti by notifications' create:");
  console.log(params);

  ProfileService.add(params)
    .then((notification) => res.status(201).json(notification)) //todo actions to be refactored since reused
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  edit,
  list,
};