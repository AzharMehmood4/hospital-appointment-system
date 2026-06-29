import { useEffect, useMemo, useState } from "react";
import { getAppointments } from "../services/api";
import { doctors } from "../data/doctors";

function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAppointments()
      .then((res) => setAppointments(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const uniquePatients = new Set(appointments.map((item) => item.email || item.patientName));

    return [
      { label: "Total Appointments", value: appointments.length },
      { label: "Pending", value: appointments.filter((item) => item.status === "Pending").length },
      { label: "Approved", value: appointments.filter((item) => item.status === "Approved").length },
      { label: "Completed", value: appointments.filter((item) => item.status === "Completed").length },
      { label: "Total Patients", value: uniquePatients.size },
      { label: "Total Doctors", value: doctors.length },
      { label: "Today's Appointments", value: appointments.filter((item) => item.appointmentDate === today).length },
      { label: "Rejected", value: appointments.filter((item) => item.status === "Rejected").length },
    ];
  }, [appointments]);

  return (
    <main className="page-shell">
      <section className="section-heading">
        <span className="eyebrow">Admin dashboard</span>
        <h1>Clinic Overview</h1>
        <p>Track activity, patient flow, doctor capacity, and appointment outcomes.</p>
      </section>

      {isLoading ? (
        <div className="empty-state">Loading dashboard...</div>
      ) : (
        <section className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Admin;
