import DoctorCard from "../components/DoctorCard";
import { doctors } from "../data/doctors";

function Doctors({ onNavigate }) {
  return (
    <main className="page-shell">
      <section className="section-heading">
        <span className="eyebrow">Medical team</span>
        <h1>Doctors</h1>
        <p>Browse available specialists and open a doctor profile before booking.</p>
      </section>

      <section className="doctor-grid">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onView={(id) => onNavigate(`/doctors/${id}`)}
            onBook={(doctorName) => onNavigate(`/book?doctor=${encodeURIComponent(doctorName)}`)}
          />
        ))}
      </section>
    </main>
  );
}

export default Doctors;
