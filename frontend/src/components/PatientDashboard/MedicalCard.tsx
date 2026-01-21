import medicalCard from "../../assets/medical-card.png";
import { useState } from "react";
import { patientAPI } from "@/services/apiService";

export const MedicalCard = () => {
  const [formData, setFormData] = useState({
    department: "",
    phone: "",
    gender: "",
    birthdate: "",
    bloodType: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await patientAPI.createMedicalCard(formData);
      if (data.success) window.location.reload();
      else setMessage(data.error || "Submission failed");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="bg-blue-50 w-full max-w-5xl rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-8">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Get Your Medical Card
          </h2>

          {/* Fields */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6 flex-1">
              <div>
                <label className="label">Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="" disabled>
                    Select your department
                  </option>
                  <option>Civil Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Electrical Engineering</option>
                  <option>Software Engineering</option>
                  <option>Food Science and Nutrition</option>
                  <option>Geology</option>
                </select>
              </div>

              <div>
                <label className="label">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter phone number"
                />
              </div>

              {/* BLOOD TYPE MOVED HERE */}
              <div>
                <label className="label">Blood Type *</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="" disabled>
                    Select blood type
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6 flex-1">
              <div>
                <label className="label">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div>
                <label className="label">Birthdate *</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* BUTTON MOVED BELOW */}
          <button
            type="submit"
            className="mx-auto mt-4 bg-blue-700 text-white px-10 py-3 rounded-lg hover:scale-105 duration-200"
          >
            Get Card
          </button>

          {message && <p className="text-red-500 text-center">{message}</p>}
        </form>

        {/* Image */}
        <img
          src={medicalCard}
          alt="Medical Card"
          className="hidden md:block w-60 self-center"
        />
      </div>
    </div>
  );
};
