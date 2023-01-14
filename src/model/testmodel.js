const mongoose = require("mongoose");
const taskschema = new mongoose.Schema({
    task_name: String,
    task_description: String,
    created_at: { type: Date, default: Date.now, required: true },
    created_by: mongoose.Schema.Types.ObjectId,
    duration: Number,
    assign_to: mongoose.Schema.Types.ObjectId,
    start_task: { type: Date },
    end_task: { type: Date },
    total_time: Number,
    assignId: mongoose.Schema.Types.ObjectId,
    task_status: String,
});
const taskModel = new mongoose.model("task", taskschema);

module.exports = taskModel;
