const express = require("express");
const dashboardRoute = express.Router();
const dashboardController = require("../controller/dashboardController");
const authorization = require("../middleware/authorization");
const bodyParser = require("body-parser");
dashboardRoute.use(bodyParser.json());

dashboardRoute.post(
  "/dashboard/task",
  authorization,
  dashboardController.dashboardTask
);
dashboardRoute.get(
  "/dashboard/status",
  authorization,
  dashboardController.StatusChart
);

module.exports = dashboardRoute;
