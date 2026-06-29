function Navbar({ currentPath, onNavigate }) {
  const links = [
    { path: "/", label: "Home" },
    { path: "/book", label: "Book Appointment" },
    { path: "/appointments", label: "Appointments" },
    { path: "/doctors", label: "Doctors" },
    { path: "/admin", label: "Admin" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="topbar">
      <button className="brand" onClick={() => onNavigate("/")}>
        <span className="brand-mark">H</span>
        <span>
          <strong>HealthDesk</strong>
          <small>Clinic Booking</small>
        </span>
      </button>

      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <button
            key={link.path}
            className={currentPath === link.path ? "active" : ""}
            onClick={() => onNavigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
