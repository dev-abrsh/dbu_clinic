import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { doctorAPI } from "@/services/apiService";

interface Appointment {
  id?: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
}

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [physicianStats, setPhysicianStats] = useState<
    {
      physicianName: string;
      appointmentCount: number;
    }[]
  >([]);
  const [newPhysician, setNewPhysician] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const { loggedIn, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!loggedIn || role !== "admin") {
    //   navigate("/signin");
    //   return;
    // }
    const fetchAppointments = async () => {
      try {
        const data = await doctorAPI.getAppointments();
        if (data.success) {
          setAppointments(data.content || []);
        }
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    const fetchPhysicianStats = async () => {
      try {
        const data = await doctorAPI.getNumbers();
        if (data.success) {
          setPhysicianStats(data.physicians || []);
        }
      } catch {
        // handle error
      }
    };
    fetchAppointments();
    fetchPhysicianStats();
  }, [loggedIn, role, navigate]);

  const handleAddPhysician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhysician.trim()) return;
    setActionLoading(true);
    try {
      const result = await doctorAPI.addPhysician(newPhysician.trim());
      if (result.success) {
        setNewPhysician("");
        // Refresh list
        const data = await doctorAPI.getNumbers();
        if (data.success) {
          setPhysicianStats(data.physicians || []);
        }
      }
    } catch {
      // handle error
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePhysician = async (physicianName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${physicianName}?`))
      return;
    setActionLoading(true);
    try {
      const result = await doctorAPI.deletePhysician(physicianName);
      if (result.success) {
        // Refresh list
        const data = await doctorAPI.getNumbers();
        if (data.success) {
          setPhysicianStats(data.physicians || []);
        }
      }
    } catch {
      // handle error
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-blue-50 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Admin Dashboard</h1>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          All Appointments
        </h2>
        {loading ? (
          <div className="text-blue-700">Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="text-gray-500">No appointments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 text-sm md:text-base">Patient</th>
                  <th className="p-2 text-sm md:text-base">Physician</th>
                  <th className="p-2 text-sm md:text-base">Date</th>
                  <th className="p-2 text-sm md:text-base">Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, idx) => (
                  <tr key={appt.id ?? idx} className="border-b">
                    <td className="p-2 text-sm md:text-base">{appt.patientName}</td>
                    <td className="p-2 text-sm md:text-base">{appt.doctorName}</td>
                    <td className="p-2 text-sm md:text-base">{appt.date}</td>
                    <td className="p-2 text-sm md:text-base">{appt.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Physician stats section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-4 md:p-6 mt-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-blue-700">
          Physicians &amp; Appointment Counts
        </h2>
        {/* Add Physician Form */}
        <form onSubmit={handleAddPhysician} className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={newPhysician}
            onChange={(e) => setNewPhysician(e.target.value)}
            placeholder="Add new physician name"
            className="border p-2 rounded flex-1"
            disabled={actionLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={actionLoading}
          >
            Add Physician
          </button>
        </form>
        {physicianStats.length === 0 ? (
          <div className="text-gray-500">No physicians found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 text-sm md:text-base">Physician</th>
                  <th className="p-2 text-sm md:text-base">Appointments</th>
                  <th className="p-2 text-sm md:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {physicianStats.map((doc, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2 text-sm md:text-base">{doc.physicianName}</td>
                    <td className="p-2 text-sm md:text-base">{doc.appointmentCount}</td>
                    <td className="p-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 text-sm md:text-base"
                        onClick={() => handleDeletePhysician(doc.physicianName)}
                        disabled={actionLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
