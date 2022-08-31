const express = require('express');
const ProfileRoute = require('./profile');

const router = express.Router();

const routes = [
  {
    path: '/profiles',
    route: ProfileRoute,
  }
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;