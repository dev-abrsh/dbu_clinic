import { useEffect, useState } from "react";
import { doctorAPI } from "@/services/apiService";

interface Physician {
  physicianName: string;
  appointmentCount: number;
}

const PhysicianManagement = () => {
  const [physicians, setPhysicians] = useState<Physician[]>([]);
  const [newPhysician, setNewPhysician] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPhysicians();
  }, []);

  const fetchPhysicians = async () => {
    try {
      const data = await doctorAPI.getNumbers();
      if (data.success) {
        setPhysicians(data.physicians || []);
      }
    } catch (error) {
      console.error("Error fetching physicians:", error);
    }
  };

  const handleAddPhysician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhysician.trim()) {
      setMessage("Please enter a physician name");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const result = await doctorAPI.addPhysician(newPhysician.trim());
      if (result.success) {
        setNewPhysician("");
        setMessage("Physician added successfully");
        fetchPhysicians();
      } else {
        setMessage(result.error || "Failed to add physician");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhysician = async (physicianName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${physicianName}?`)) {
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const result = await doctorAPI.deletePhysician(physicianName);
      if (result.success) {
        setMessage("Physician deleted successfully");
        fetchPhysicians();
      } else {
        setMessage(result.error || "Failed to delete physician");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-blue-50 rounded-2xl shadow-2xl p-4 md:p-8 mt-8">
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6 text-center">
        Physician Management
      </h2>
      
      <form onSubmit={handleAddPhysician} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={newPhysician}
          onChange={(e) => setNewPhysician(e.target.value)}
          placeholder="Enter physician name"
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Physician"}
        </button>
      </form>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm md:text-base font-medium text-gray-700 uppercase">
                Physician Name
              </th>
              <th className="px-4 py-3 text-left text-sm md:text-base font-medium text-gray-700 uppercase">
                Appointments
              </th>
              <th className="px-4 py-3 text-left text-sm md:text-base font-medium text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {physicians.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  No physicians found
                </td>
              </tr>
            ) : (
              physicians.map((physician, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-sm md:text-base text-gray-800">
                    {physician.physicianName}
                  </td>
                  <td className="px-4 py-3 text-sm md:text-base text-gray-800">
                    {physician.appointmentCount}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDeletePhysician(physician.physicianName)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 text-sm md:text-base"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhysicianManagement;

