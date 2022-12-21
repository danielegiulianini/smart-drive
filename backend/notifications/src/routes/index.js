//used only if exposing rest endpoint (use case: showing a page of all the notifications for a user)
const express = require("express");
const NotificationsRoute = require("./notifications");

const router = express.Router();

const routes = [
  {
    path: "/notifications",
    route: NotificationsRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
