const express = require("express");
const TripRoute = require("./trips");

const router = express.Router();

const routes = [
  {
    path: "/trips",
    route: TripRoute,
  },
];
routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
