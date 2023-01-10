const mongoose = require('mongoose')
const express = require("express")
const app = express();
const route = require('./src/routes/index');
const bodyParser=require("body-parser")
app.use(bodyParser.json())

const cookieparser=require("cookie-parser")
app.use(cookieparser())
const cors=require("cors");

app.use(
  cors({
    credentials: true, 
  })
  );
app.use("/", route)

mongoose.connect('mongodb://localhost:27017/crud')
  .then(() => {
    console.log("connection done")
  }).catch((error) => {
    console.log("connection error", error)
  });
  
  
app.listen(9000, () => console.log("port on : 9000"))
