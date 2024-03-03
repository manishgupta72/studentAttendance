const { model, Schema } = require("mongoose");

const attendanceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
  date: {
    type: Array,
    required: true,
  },
});

const attendance = model("Attendance", attendanceSchema);
module.exports = attendance;
