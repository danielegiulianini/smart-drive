const express = require("express");
const VehiclesRoute = require("./vehiclesModels");
const UserVehiclesRoute = require("./userVehicles");


const router = express.Router();

const routes = [
  {
    path: "/vehicles",
    route: VehiclesRoute,
  },
  {
    path: "/vehicles",
    route: UserVehiclesRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
