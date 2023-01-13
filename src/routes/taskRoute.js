const express = require("express");
const taskRoute = express.Router();
const taskController = require("../controller/taskController");
const bodyParser = require("body-parser");
taskRoute.use(bodyParser.json());
const authorization = require("../middleware/authorization");

taskRoute.post("/insert", authorization, taskController.insertTask);
taskRoute.post("/getTask", authorization, taskController.getTask);
taskRoute.put("/updateTask/:id", authorization, taskController.updateTask);
taskRoute.delete("/deleteTask/:id", authorization, taskController.deleteTask);
taskRoute.put("/startTask/:id", authorization, taskController.startTask);
taskRoute.put("/endTask/:id", authorization, taskController.endTask);
taskRoute.get("/assignData", authorization, taskController.assignData);
taskRoute.put("/verify/:id", authorization, taskController.verifyStatus);

module.exports = taskRoute;
