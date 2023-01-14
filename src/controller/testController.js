const express = require("express");
const { sendResponse } = require("../helpers/helpers");
const taskModel = require("../model/taskModel");

const getData = (req, res) => {
  try {
    taskModel.find((err, val) => {
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
