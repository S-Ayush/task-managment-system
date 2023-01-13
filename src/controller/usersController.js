const express = require("express");
const userList = require("../model/userModel");
const { sendResponse } = require("../helpers/helpers");

const insertData = async (req, res) => {
  try {
    const data = new userList({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      designation: req.body.designation,
    });
    var result = await data.save();
    res.json(result);
  } catch (error) {
    res.send(error.message);
  }
};

const getData = (req, res) => {
  try {
    userList.find((err, val) => {
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

const updateData = (req, res) => {
  userList.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        designation: req.body.designation,
      },
    },
    { new: true },
    (err, data) => {
      if (data == null) {
        res.send("nothing found");
      } else {
        res.send(data);
      }
    }
  );
};

const deleteData = (req, res) => {
  userList.deleteOne({ _id: req.params.id }, (err, val) => {
    if (err) {
      console.log(err);
    } else {
      res.json(val);
    }
  });
};

module.exports = { insertData, getData, updateData, deleteData };
