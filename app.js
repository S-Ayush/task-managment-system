const mongoose = require("mongoose");
const express = require("express");
const app = express();
const route = require("./src/routes/index");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const path = require("path");

const cookieparser = require("cookie-parser");
app.use(cookieparser());
const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use("/", route);

app.use(
  express.static(
    path.join(__dirname, "task-management-system-frontend", "build")
  )
);

app.get(["/","/login","/dashboard","/users","/tasks"], function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "task-management-system-frontend",
      "build",
      "index.html"
    )
  );
});
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://mansi:mansiii%40123@cluster0.az1at76.mongodb.net/crud?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connection done");
  })
  .catch((error) => {
    console.log("connection error", error);
  });

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`port on : ${PORT}`));

module.exports = app;
