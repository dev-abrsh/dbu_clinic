import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "patient" | "doctor";
};

export const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Frontend validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("All fields are required");
      return;
    }

    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost/IP2_project-main/IP2_project-main/dbu_clinic/Backend/API/signup.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        navigate("/signin");
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          Create an Account
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            minLength={8}
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            minLength={8}
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={formData.role === "patient"}
                onChange={handleChange}
              />
              Patient
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={formData.role === "doctor"}
                onChange={handleChange}
              />
              Doctor
            </label>
          </div>
        </div>

        {/* Error message */}
        {message && (
          <p className="text-red-600 text-sm text-center">{message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
// export default sign;