const express = require("express");
const userRoute = express.Router();
const userController = require("../controller/usersController");
const authorization = require("../middleware/authorization");
const bodyParser = require("body-parser");
userRoute.use(bodyParser.json());

userRoute.get("/get", authorization, userController.getData);
userRoute.post("/post", authorization, userController.insertData);
userRoute.put("/update/:id", authorization, userController.updateData);
userRoute.delete("/delete/:id", authorization, userController.deleteData);

module.exports = userRoute;
