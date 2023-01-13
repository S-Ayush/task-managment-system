const express = require("express");
const loginRoute = require("./loginRoute");
const userRoute = require("./userRoute");
// const taskRoute = require("./taskRoute");
const dashboardRoute = require("./dashboardRoute");
const route = express.Router();

route.use("/", loginRoute);
route.use("/", userRoute);
// route.use("/", taskRoute);
route.use("/", dashboardRoute);

module.exports = route;
