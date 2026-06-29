function About() {
  return (
    <main className="page-shell">
      <section className="about-layout">
        <div>
          <span className="eyebrow">About the system</span>
          <h1>Built for practical clinic appointment management.</h1>
          <p>
            HealthDesk helps a clinic record patient contact details, assign doctors, reserve available time slots, prevent duplicate bookings, and manage appointment progress from pending to completed.
          </p>
        </div>
        <div className="about-panel">
          <h2>Included modules</h2>
          <ul>
            <li>Patient appointment booking</li>
            <li>Doctor directory and detail pages</li>
            <li>Search and status filters</li>
            <li>Admin dashboard statistics</li>
            <li>MongoDB appointment storage</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default About;
