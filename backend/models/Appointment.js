const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);