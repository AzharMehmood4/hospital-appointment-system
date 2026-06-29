import { useEffect, useMemo, useState } from "react";
import { deleteAppointment, getAppointments, updateAppointmentStatus } from "../services/api";

const statuses = ["All", "Pending", "Approved", "Rejected", "Completed"];

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await getAppointments({ search, status });
      setAppointments(res.data);
    } catch (error) {
      setMessage("Could not load appointments.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [status]);

  const filteredAppointments = useMemo(() => appointments, [appointments]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchAppointments();
  };

  const handleStatusUpdate = async (id, nextStatus) => {
    await updateAppointmentStatus(id, nextStatus);
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    fetchAppointments();
  };

  return (
    <main className="page-shell">
      <section className="section-heading">
        <span className="eyebrow">Clinic schedule</span>
        <h1>Appointments</h1>
        <p>Search, filter, approve, complete, or cancel appointment requests.</p>
      </section>

      <section className="toolbar">
        <form className="search-box" onSubmit={handleSearch}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search patient, doctor, or email"
          />
          <button className="primary-btn" type="submit">
            Search
          </button>
        </form>
        <div className="segmented">
          {statuses.map((item) => (
            <button key={item} className={status === item ? "active" : ""} onClick={() => setStatus(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      {message && <p className="notice">{message}</p>}

      <section className="appointments-list">
        {isLoading ? (
          <div className="empty-state">Loading appointments...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <h2>No appointments scheduled yet</h2>
            <p>Book your first appointment to start managing the clinic schedule.</p>
          </div>
        ) : (
          filteredAppointments.map((item) => (
            <article className="appointment-card" key={item._id}>
              <div>
                <span className={`status-pill ${item.status?.toLowerCase()}`}>{item.status}</span>
                <h3>{item.patientName}</h3>
                <p>{item.email} · {item.phone}</p>
                <p>{item.doctor} · {item.appointmentDate} at {item.appointmentTime}</p>
                {item.reason && <p className="reason">{item.reason}</p>}
              </div>
              <div className="appointment-actions">
                <select value={item.status} onChange={(event) => handleStatusUpdate(item._id, event.target.value)}>
                  {statuses.slice(1).map((nextStatus) => (
                    <option key={nextStatus} value={nextStatus}>
                      {nextStatus}
                    </option>
                  ))}
                </select>
                <button className="danger-btn" onClick={() => handleDelete(item._id)}>
                  Cancel
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Appointments;
