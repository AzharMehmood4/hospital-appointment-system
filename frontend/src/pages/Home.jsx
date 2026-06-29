import DoctorCard from "../components/DoctorCard";
import { doctors } from "../data/doctors";

function Home({ onNavigate }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Clinic appointment system</span>
          <h1>Book trusted doctors without waiting in line.</h1>
          <p>
            Manage patient visits, doctor schedules, appointment status, and daily clinic activity from one clean dashboard.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => onNavigate("/book")}>
              Book Appointment
            </button>
            <button className="ghost-btn" onClick={() => onNavigate("/appointments")}>
              View Appointments
            </button>
          </div>
        </div>
        <div className="hero-panel" aria-label="Clinic summary">
          <div className="hero-date">
            <span>Today</span>
            <strong>Open</strong>
          </div>
          <div className="mini-grid">
            <div>
              <span>Doctors</span>
              <strong>{doctors.length}</strong>
            </div>
            <div>
              <span>Slots</span>
              <strong>32</strong>
            </div>
            <div>
              <span>Support</span>
              <strong>24/7</strong>
            </div>
          </div>
          <div className="next-visit">
            <span className="status-dot"></span>
            <div>
              <strong>Fast scheduling</strong>
              <p>Doctor-specific double booking protection is enabled.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Available doctors</span>
          <h2>Choose a specialist</h2>
        </div>
        <div className="doctor-grid">
          {doctors.slice(0, 3).map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onView={(id) => onNavigate(`/doctors/${id}`)}
              onBook={(doctorName) => onNavigate(`/book?doctor=${encodeURIComponent(doctorName)}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
