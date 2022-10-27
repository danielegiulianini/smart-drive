const Profile = require("../models/users");
const { omit } = require("../utils/jsObjectUtils");

const list = async (query) => {
  //add filtering, sorting, paginating
  const orderByColumn = query.order_by_column || "created_at";
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

  return (
    Profile.find(selection, { lean: true })
      .sort({ [orderByColumn]: orderByDirection }) //ECMAScript 2015 (ES6)'s Computed property names
      //.skip(limit * page)
      .limit(limit)
  );
};

const add = async (profile) => {
  console.log(`Adding profile: ${JSON.stringify(profile)}`);
  return Profile.findOne({
    _id: profile._id,
  })
    .then((result) => {
      if (result) {
        throw new TypeError(`The profile ${profile._id} already exists`);
      }
    })
    .then(() => Profile.create(profile)); //The create() function is a thin wrapper around the save() function.
};

const get = async (userId) => {
  console.log(`Getting profile by ID: ${userId}`);
  return Profile.findById(userId);
};

//this is a rebus: an api for every possible update (one for image, one for username etc.) or one-for-all (suited if resending all the attributes all the times)
const edit = async (userId, params) => {
  console.log(`Updating user ${userId} with data: ${JSON.stringify(params)}`);

  //must use a dto here for avoiding user auto-push points!

  return Profile.findOneAndUpdate(
    {
      _id: userId,
    },
    params,
    {
      new: true, //returning updated user
    }
  );
};

const remove = async (userId) => {
  return Profile.deleteOne({
    _id: userId,
  });
};

module.exports = {
  list,
  add,
  get,
  edit,
  remove,
};
