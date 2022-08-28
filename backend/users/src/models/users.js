const { createSchema } = require('./../utils/models.utils');

const mongoose = require('mongoose');

const profileSchema = createSchema('User', 'Users', mongoose => ({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  gender: {
    type: String,
  },
  language: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  profilePictureUri: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  }
}));

module.exports = mongoose.model('Profile', profileSchema);