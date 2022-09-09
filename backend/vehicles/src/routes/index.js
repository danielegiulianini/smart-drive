const express = require("express");
const VehiclesRoute = require("./vehiclesModels");

const router = express.Router();

const routes = [
  {
    path: "/vehicles",
    route: VehiclesRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
