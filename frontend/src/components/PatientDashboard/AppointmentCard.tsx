import { useEffect, useState } from "react";
import { patientAPI } from "@/services/apiService";
import type { Physician } from "@/services/apiService";

const AppointmentCard = () => {
  const [formData, setFormData] = useState({
    date: "",
    StaffID: 0,
    time: "",
  });
  const [physicians, setPhysicians] = useState<Physician[]>([]);
  const [message, setMessage] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [data, setData] = useState<any>({});

  // Get physicians list
  useEffect(() => {
    patientAPI.getPhysicians().then((result) => {
      if (result.success) {
        setPhysicians(result.physicians);
      }
    });
  }, []);

  // Get the appointment info if available
  useEffect(() => {
    patientAPI.getAppointmentInfo().then((result) => {
      if (result.success && result.content) {
        setData(result.content);
        setIsScheduled(true);
      }
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.StaffID === 0) {
      setMessage("Please select a physician");
      return;
    }

    try {
      const result = await patientAPI.bookAppointment({
        StaffID: formData.StaffID,
        appointment_date: formData.date,
        appointment_time: formData.time,
      });

      if (result.success) {
        setIsScheduled(true);
        // Fetch updated appointment info
        const appointmentInfo = await patientAPI.getAppointmentInfo();
        if (appointmentInfo.success && appointmentInfo.content) {
          setData(appointmentInfo.content);
        }
        setMessage("");
      } else {
        setMessage(result.error || "Failed to book appointment");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center px-4 py-8">
      <div className="mb-10 md:mb-50 bg-blue-50 flex flex-col md:flex-row w-full max-w-2xl h-fit justify-center gap-8 md:gap-12 p-6 md:p-10 border rounded-2xl md:shadow-xl">
        {isScheduled ? (
          <div className="text-center">
            <h5 className="text-xl font-bold text-blue-600 mb-2">
              Appointment Scheduled
            </h5>
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span> {data.date}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Physician:</span> {data.physician || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Time:</span> {data.time}
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsScheduled(false)}
            >
              Reschedule
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h5 className="text-xl font-bold text-blue-600 mb-4">
              Schedule an Appointment
            </h5>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-medium"
                >
                  Pick the date:
                </label>
                <input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date"
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-gray-700 font-medium"
                >
                  Pick the time:
                </label>
                <input
                  id="time"
                  name="time"
                  value={formData.time}
                  type="time"
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="StaffID"
                  className="block text-gray-700 font-medium"
                >
                  Select a physician:
                </label>
                <select
                  id="StaffID"
                  name="StaffID"
                  value={formData.StaffID}
                  onChange={(e) => setFormData({ ...formData, StaffID: parseInt(e.target.value) })}
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value={0} disabled>
                    Choose a physician
                  </option>
                  {physicians.map((physician) => (
                    <option key={physician.StaffID} value={physician.StaffID}>
                      {physician.StaffName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Schedule
              </button>
              <p className=" text-red-500">{message}</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
