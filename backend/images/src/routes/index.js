const express = require('express');
const ImageRoute = require('./images');

const router = express.Router();

const routes = [
  {
    path: '/images',
    route: ImageRoute,
  }
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;