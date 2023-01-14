const express = require("express");
const { getData } = require("../controller/testController");
const dashboardRoute = require("./dashboardRoute");
const loginRoute = require("./loginRoute");
const taskRoute = require("./taskRoute");
const userRoute = require("./userRoute");
//const taskRoute = require("./taskRoute");
//const dashboardRoute = require("./dashboardRoute");
const route = express.Router();

route.use("/", loginRoute);
route.use("/", userRoute);
route.use("/", taskRoute);
route.use("/test",getData);
route.use("/", dashboardRoute);

module.exports = route;
