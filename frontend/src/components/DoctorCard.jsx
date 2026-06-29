function DoctorCard({ doctor, onView, onBook }) {
  return (
    <article className="doctor-card">
      <div className="doctor-avatar">{doctor.name.replace("Dr. ", "").charAt(0)}</div>
      <div className="doctor-card-body">
        <span className="eyebrow">{doctor.specialization}</span>
        <h3>{doctor.name}</h3>
        <p>{doctor.experience} experience</p>
        <p>{doctor.room}</p>
      </div>
      <div className="doctor-actions">
        <button className="ghost-btn" onClick={() => onView(doctor.id)}>
          Details
        </button>
        <button className="primary-btn" onClick={() => onBook(doctor.name)}>
          Book
        </button>
      </div>
    </article>
  );
}

export default DoctorCard;
