const express = require("express");
const loginList = require("../model/userModel");
const jwt = require("jsonwebtoken");

const loginData = async (req, res) => {
  try {
    const { name, password } = req.body;
    let LoginData = await loginList.findOne({ name, password });

    if (LoginData) {
      const accessToken = jwt.sign({ name }, "secretKey", { expiresIn: "30m" });
      const refreshToken = jwt.sign({ name }, "secretKey", {
        expiresIn: "20y",
      });

      res.cookie("jwt", accessToken);
      return res.json({ LoginData, accessToken, refreshToken });
    } else {
      return res.status(400).json({ error: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginData };
