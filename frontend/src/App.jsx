import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Appointments from "./pages/Appointments";
import BookAppointment from "./pages/BookAppointment";
import DoctorDetails from "./pages/DoctorDetails";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";

function getLocationState() {
  return {
    path: window.location.pathname,
    search: window.location.search,
  };
}

function App() {
  const [location, setLocation] = useState(getLocationState);

  useEffect(() => {
    const handlePopState = () => setLocation(getLocationState());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, "", nextPath);
    setLocation(getLocationState());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const queryDoctor = useMemo(() => {
    return new URLSearchParams(location.search).get("doctor") || "";
  }, [location.search]);

  const page = useMemo(() => {
    if (location.path === "/") {
      return <Home onNavigate={navigate} />;
    }

    if (location.path === "/book") {
      return <BookAppointment queryDoctor={queryDoctor} onNavigate={navigate} />;
    }

    if (location.path === "/appointments") {
      return <Appointments />;
    }

    if (location.path === "/doctors") {
      return <Doctors onNavigate={navigate} />;
    }

    if (location.path.startsWith("/doctors/")) {
      return <DoctorDetails doctorId={location.path.split("/").pop()} onNavigate={navigate} />;
    }

    if (location.path === "/admin") {
      return <Admin />;
    }

    if (location.path === "/about") {
      return <About />;
    }

    return (
      <main className="page-shell">
        <div className="empty-state">
          <h1>Page not found</h1>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </main>
    );
  }, [location.path, queryDoctor]);

  return (
    <div className="app">
      <Navbar currentPath={location.path} onNavigate={navigate} />
      {page}
      <Footer />
    </div>
  );
}

export default App;
