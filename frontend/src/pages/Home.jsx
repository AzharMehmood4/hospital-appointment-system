import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
  });

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/");
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/", formData);

      alert("Appointment Booked Successfully");

      setFormData({
        name: "",
        date: "",
        time: "",
      });

      fetchAppointments();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10">
          Clinic Appointment System
        </h1>

        {/* Form */}

        <div className="bg-white p-6 rounded-xl shadow-md mb-10">

          <h2 className="text-2xl font-semibold mb-5">
            Book Appointment
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-3"
            >
              Book
            </button>
          </form>
        </div>

        {/* Appointment List */}

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-2xl font-semibold mb-5">
            All Appointments
          </h2>

          {appointments.length === 0 ? (
            <p>No Appointments Found</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p>
                      📅 {item.date}
                    </p>

                    <p>
                      ⏰ {item.time}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Home;