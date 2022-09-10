const { createSchema } = require("./../utils/models.utils");

//model name (used for ?), collection name
const profileSchema = createSchema("Profile", "Profiles", (mongoose) => ({
  email: {
    //added
    type: String,
    unique: true, // `email` must be unique
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  language: {
    type: String,
  },
  city: {
    //added
    type: String,
  },
  country: {
    //added
    type: String,
  },
  profilePictureUri: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  },
  vehicles: [{ type: String }], //actually can put this association in vehicles since I must fetch from it too

  //ecoscore? (here on in other microservice?) (default to 0)
  //level?(default to 0)
  //badges?(default to empty (!= null))
}));

module.exports = profileSchema;
