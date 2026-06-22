const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");

// CREATE appointment
router.post("/", async (req, res) => {
  try {
    const { name, date, time } = req.body;

    // prevent double booking
    const existing = await Appointment.findOne({ date, time });
    if (existing) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const newAppointment = new Appointment({
      name,
      date,
      time,
    });

    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET all appointments
router.get("/", async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
});

// DELETE appointment
router.delete("/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;