import { useEffect, useMemo, useState } from "react";
import { createAppointment, getAppointments } from "../services/api";
import { defaultTimes, doctors } from "../data/doctors";

const emptyForm = {
  patientName: "",
  email: "",
  phone: "",
  doctor: doctors[0].name,
  appointmentDate: "",
  appointmentTime: "",
  reason: "",
};

function BookAppointment({ queryDoctor, onNavigate }) {
  const [formData, setFormData] = useState(emptyForm);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (queryDoctor) {
      setFormData((current) => ({ ...current, doctor: queryDoctor }));
    }
  }, [queryDoctor]);

  useEffect(() => {
    getAppointments()
      .then((res) => setAppointments(res.data))
      .catch(() => setMessage("Could not load booked slots."));
  }, []);

  const bookedSlots = useMemo(() => {
    return appointments
      .filter(
        (item) =>
          item.doctor === formData.doctor &&
          item.appointmentDate === formData.appointmentDate
      )
      .map((item) => item.appointmentTime);
  }, [appointments, formData.appointmentDate, formData.doctor]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await createAppointment(formData);
      setMessage("Appointment booked successfully.");
      setFormData({ ...emptyForm, doctor: formData.doctor });
      const res = await getAppointments();
      setAppointments(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="section-heading">
        <span className="eyebrow">New appointment</span>
        <h1>Book Appointment</h1>
        <p>Collect patient details, choose a doctor, and reserve a confirmed clinic slot.</p>
      </section>

      <section className="booking-layout">
        <form className="form-panel" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Patient Name
              <input name="patientName" value={formData.patientName} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              Doctor
              <select name="doctor" value={formData.doctor} onChange={handleChange} required>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
            </label>
            <label>
              Time
              <select name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required>
                <option value="">Select time</option>
                {defaultTimes.map((time) => (
                  <option key={time} value={time} disabled={bookedSlots.includes(time)}>
                    {time}{bookedSlots.includes(time) ? " - booked" : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className="full-span">
              Reason
              <textarea name="reason" rows="4" value={formData.reason} onChange={handleChange} placeholder="Short reason for visit" />
            </label>
          </div>

          {message && <p className="notice">{message}</p>}

          <div className="form-actions">
            <button className="primary-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
            <button className="ghost-btn" type="button" onClick={() => onNavigate("/appointments")}>
              Appointments
            </button>
          </div>
        </form>

        <aside className="slots-panel">
          <span className="eyebrow">Booked slots</span>
          <h2>{formData.doctor}</h2>
          {!formData.appointmentDate ? (
            <p>Select a date to see unavailable times.</p>
          ) : bookedSlots.length === 0 ? (
            <p>All slots are currently available for this date.</p>
          ) : (
            <div className="slot-list">
              {bookedSlots.map((slot) => (
                <span key={slot}>{slot}</span>
              ))}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

export default BookAppointment;
