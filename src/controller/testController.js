const express = require("express");
const { sendResponse } = require("../helpers/helpers");
const testModel = require("../model/testmodel");

const getData = (req, res) => {
  try {
    testModel.find((err, val) => {
      if (err) {
        console.log(err);
      } else {
        sendResponse(req, res, val, 200);
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getData };
