const express=require("express")
const loginRoute=express.Router();
const loginController=require("../controller/loginController")
const bodyParser=require("body-parser")

loginRoute.use(bodyParser.json())
loginRoute.post("/login",loginController.loginData)

module.exports=loginRoute;