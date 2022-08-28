const { createSchema } = require("./../utils/models.utils");

const profileSchema = createSchema("Profile", "Profiles", (mongoose) => ({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  email: {
    //added
    type: String,
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
  //ecoscore? (here on in other microservice?)
  //level?
  //badges?
}));

module.exports = profileSchema;
