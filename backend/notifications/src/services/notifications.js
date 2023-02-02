const Notification = require("../models/notifications");
const { omit } = require("../utils/jsObjectUtils");

//1. add a notification
const add = async (notification) => {
  console.log(`Adding notification: ${JSON.stringify(notification)}`);
  return Notification.create(notification); //The create() function is a thin wrapper around the save() function.
};

//2. edit a notification (for setting it as read)
const edit = async (notificationId, params) => {
  console.log(`Updating notification ${notificationId} with data: ${JSON.stringify(params)}`);

  return Notification.findOneAndUpdate(
    {
      _id: notificationId,
    },
    params,
    {
      new: true, //returning updated notification
    }
  );
};


//3. list all the notifications (all or unread) (of a user)
const list = async (query) => {
  //add filtering, sorting, paginating
  const orderByColumn = query.order_by_column || "createdAt";
  const orderByDirection = query.order_by_direction || "desc";
  //const page = query.page || 1;
  const limit = query.limit || 20;

  //remove the pagination and sorting letting filtering only (or directly pick the complementary of them)
  const selection = omit(
    query,
    "orderByColumn",
    "orderByDirection",
    "page",
    "limit"
  );
  console.log("la selection:");
  console.log(selection);

  return await Notification.find(selection)
    .sort({ [orderByColumn]: orderByDirection }) //ECMAScript 2015 (ES6)'s Computed property names
    //.skip(limit * page)
    .limit(limit);
};


const remove = async (userId) => {
  return Notification.deleteOne({
    _id: userId,
  });
};

module.exports = {
  list,
  add,
  edit,
  remove,
};
