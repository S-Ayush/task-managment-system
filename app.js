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
  })
);
app.use("/", route);

app.use(
  express.static(
    path.join(__dirname, "task-management-system-frontend", "build")
  )
);
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/login", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "task-management-system-frontend",
      "build",
      "index.html"
    )
  );
});
mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(() => {
    console.log("connection done");
  })
  .catch((error) => {
    console.log("connection error", error);
  });

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`port on : ${PORT}`));
