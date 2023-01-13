const jwt = require("jsonwebtoken");
const userModule = require("../model/userModel");

const authorization = (req, res, next) => {
  try {
    let accessToken = req.cookies.jwt;
    let refreshToken = req.headers.authorization;

    if (!accessToken) {
      res.status(401).json({ msg: "unauthorized" });
    }
    if (accessToken) {
      jwt.verify(accessToken, "secretKey", async (err, authData) => {
        if (err) {
          jwt.verify(refreshToken, "secretKey", (err, decoded) => {
            if (err) {
              res.status(401).json({ message: "access denied" });
            } else {
              next();
            }
          });
        } else {
          if (!refreshToken) {
            let refreshToken = jwt.sign({ authData }, "secretKey", {
              expiresIn: "20y",
            });
            req.refreshToken = refreshToken;
          }
          var user = await userModule.findOne({ name: authData.name });
          req.rootUser = user;
          next();
        }
      });
    }
  } catch (error) {
    console.log("middleware.error", error);
    res.send(error.message);
  }
};

module.exports = authorization;
