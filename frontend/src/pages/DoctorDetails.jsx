import { doctors } from "../data/doctors";

function DoctorDetails({ doctorId, onNavigate }) {
  const doctor = doctors.find((item) => item.id === Number(doctorId));

  if (!doctor) {
    return (
      <main className="page-shell">
        <div className="empty-state">
          <h1>Doctor not found</h1>
          <button className="primary-btn" onClick={() => onNavigate("/doctors")}>
            Back to Doctors
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="doctor-detail">
        <div className="doctor-avatar large">{doctor.name.replace("Dr. ", "").charAt(0)}</div>
        <div>
          <span className="eyebrow">{doctor.specialization}</span>
          <h1>{doctor.name}</h1>
          <p>{doctor.bio}</p>
          <div className="detail-grid">
            <div>
              <span>Experience</span>
              <strong>{doctor.experience}</strong>
            </div>
            <div>
              <span>Clinic Room</span>
              <strong>{doctor.room}</strong>
            </div>
          </div>
          <div className="slot-list wide">
            {doctor.availability.map((slot) => (
              <span key={slot}>{slot}</span>
            ))}
          </div>
          <button className="primary-btn" onClick={() => onNavigate(`/book?doctor=${encodeURIComponent(doctor.name)}`)}>
            Book with {doctor.name}
          </button>
        </div>
      </section>
    </main>
  );
}

export default DoctorDetails;
