const taskModel = require("../model/taskModel");

// const task = require("../../src/model/taskModel");
const dashboardTask = async (req, res) => {
  const { result, dateFilter } = req.body;

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
                result !== undefined
                  ? {
                      created_at: {
                        $gte: new Date(result && result[dateFilter].startDate),
                        $lte: new Date(result && result[dateFilter].endDate),
                      },
                    }
                  : { result },
              ],
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
          },
          counts: {
            $push: {
              task_status: "$task_status",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    let date = [];
    let todo = [];
    let inProgress = [];
    let completed = [];
    let verified = [];
    let unverified = [];

    data.forEach((ele, index) => {
      date.push(ele._id);
      todo[index] = 0;
      inProgress[index] = 0;
      completed[index] = 0;
      verified[index] = 0;
      unverified[index] = 0;
      ele.counts.forEach((item) => {
        switch (item.task_status) {
          case "todo":
            todo[index] = todo[index] + 1;
            break;
          case "in progress":
            inProgress[index] = inProgress[index] + 1;
            break;
          case "completed":
            completed[index] = completed[index] + 1;
            break;
          case "verified":
            verified[index] = verified[index] + 1;
            break;
          case "unVerified":
            unverified[index] = unverified[index] + 1;
            break;
        }
      });
    });

    var xAxis = date;
    var series = [
      {
        name: "todo",
        data: todo,
      },
      {
        name: "in progress",
        data: inProgress,
      },
      {
        name: "completed",
        data: completed,
      },
      {
        name: "verified",
        data: verified,
      },
      {
        name: "unVerified",
        data: unverified,
      },
    ];

    res.json({ xAxis, series });
    // res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const StatusChart = async (req, res) => {
  try {
    var sData = await taskModel.aggregate([
      {
        $match: {
          [req.rootUser?.role === "admin" ? "created_by" : "assign_to"]:
            req.rootUser._id,
        },
      },
      {
        $group: {
          _id: "$task_status",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    var status = [];
    var statusCount = [];

    sData.map((item) => {
      status.push(item._id);
      statusCount.push(item.count);
    });
    var xAxis = status;
    var yAxis = statusCount;

    res.json({ xAxis, yAxis });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { dashboardTask, StatusChart };
