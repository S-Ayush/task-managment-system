const mongoose = require("mongoose");
const taskModel = require("../model/taskModel");
// const task = require("../model/taskModel");
// const task = require("../model/task.js");
const userList = require("../model/userModel");

const insertTask = async (req, res) => {
  try {
    const data = new taskModel({
      task_name: req.body.task_name,
      task_description: req.body.task_description,
      created_by: req.rootUser._id,
      duration: req.body.duration,
      assign_to: req.body.assign_to,
      assignId: req.body.assignId,
      task_status: "todo",
    });
    if (req.rootUser.role === "admin") {
      var result = await data.save();
      res.json(result);
    } else {
      res.json({ msg: "you have no access to insert data" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const assignData = async (req, res) => {
  let userData = await userList.find({ role: "user" });
  let adminData = await userList.find({ role: "admin" });
  if (req.rootUser.role === "admin") {
    res.json(userData);
  } else if (req.rootUser.role === "user") {
    res.json(adminData);
  } else {
    return false;
  }
};

const getTask = async (req, res) => {
  const { status, personName } = req.body;
  try {
    var data = await taskModel.aggregate([
      {
        $match: {
          $and: [
            {
              [req.rootUser?.role === "admin" ? "created_by" : "assign_to"]:
                req.rootUser._id,
            },
            {
              $or: [
                status !== undefined ? { task_status: status } : { status },
              ],
            },

            {
              $or: [
                { ...personName },
                {
                  [req.rootUser?.role === "admin" ? "assign_to" : "created_by"]:
                    {
                      $in: personName.map((item) =>
                        mongoose.Types.ObjectId(item)
                      ),
                    },
                },
              ],
            },
          ],
        },
      },
      {
        $lookup: {
          from: "logins",
          localField:
            req.rootUser?.role === "user" ? "created_by" : "assign_to",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $project: {
          [req.rootUser.role === "admin" ? "created_by" : "assign_to"]: 0,
        },
      },
    ]);

    var task = data.map((item) => {
      return {
        ...item,
        [req.rootUser.role === "user" ? "created_by" : "assign_to"]:
          item.result[0]?.name,
        assignId: item.result[0]?._id,
        result: undefined,
      };
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateTask = (req, res) => {
  try {
    if (req.rootUser.role === "admin") {
      taskModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            task_name: req.body.task_name,
            task_description: req.body.task_description,
            duration: req.body.duration,
            assign_to: req.body.assign_to,
          },
        },
        (err, data) => {
          if (data == null) {
            res.send("nothing found");
          } else {
            res.send(data);
          }
        }
      );
    } else {
      res.json({ msg: "you have no access to update data" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteTask = (req, res) => {
  try {
    if (req.rootUser.role === "admin") {
      taskModel.deleteOne({ _id: req.params.id }, (err, val) => {
        if (err) {
          console.log(err);
        } else {
          res.json(val);
        }
      });
    } else {
      res.json({ msg: "you have no access to delete data" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const startTask = (req, res) => {
  try {
    if (req.rootUser.role === "user") {
      taskModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { start_task: Date.now(), task_status: "in progress" } },
        (err, data) => {
          if (data == null) {
            res.status(400).send("nothing found");
          } else {
            res.status(200).send("task started......");
          }
        }
      );
    } else {
      res.send("you can not use this api");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const endTask = async (req, res) => {
  try {
    let task = await taskModel.findById(req.params.id);
    let startTime = task.start_task;
    let EndTime = new Date();
    let time = EndTime.getTime() - startTime?.getTime();

    if (!startTime || startTime?.getTime() >= EndTime.getTime()) {
      console.log("task is not started");
    } else {
      if (req.rootUser.role === "user") {
        taskModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              end_task: Date.now(),
              total_time: time / (1000 * 60).toString(),
              task_status: "completed",
            },
          },
          (err, data) => {
            if (data == null) {
              res.status(400).send("nothing found");
            } else {
              res.status(200).send("task ended........");
            }
          }
        );
      } else {
        res.send("you can not use this api");
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const verifyStatus = async (req, res) => {
  let id = req.params.id;
  var data = await taskModel.findByIdAndUpdate(
    { _id: id },
    { $set: { task_status: req.body.task_status } }
  );

  res.json(data);
};
module.exports = {
  insertTask,
  getTask,
  updateTask,
  deleteTask,
  startTask,
  endTask,
  assignData,
  verifyStatus,
};
