const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");

const validStatuses = ["Pending", "Approved", "Rejected", "Completed"];

// CREATE appointment
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      email,
      phone,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    if (
      !patientName ||
      !email ||
      !phone ||
      !doctor ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const existing = await Appointment.findOne({
      doctor,
      appointmentDate,
      appointmentTime,
    });
    if (existing) {
      return res.status(400).json({ message: "This doctor is already booked for that slot" });
    }

    const newAppointment = new Appointment({
      patientName,
      email,
      phone,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
    });

    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET all appointments
router.get("/", async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { patientName: { $regex: search, $options: "i" } },
        { doctor: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const data = await Appointment.find(query).sort({
      appointmentDate: 1,
      appointmentTime: 1,
      createdAt: -1,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE appointment status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid appointment status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
