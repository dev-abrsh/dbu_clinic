import signin from "../../assets/signin.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { authAPI } from "@/services/apiService";

export const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn, setRole, setUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    try {
      const data = await authAPI.signin(formData);

      if (data.success) {
        setLoggedIn(true);
        const userRole = data.role || "patient";
        setRole(userRole);
        setUser({
          id: data.PatientID,
          name: data.PatientName,
          email: formData.email,
          role: userRole
        });
        
        // Navigate based on role
        if (userRole === "doctor") {
          navigate("/Doctor_dashboard");
        } else if (userRole === "admin") {
          navigate("/admins_dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setMessage(data.error || "Invalid credentials.");
      }
    } catch (error: any) {
      const errorMsg = error?.error || error?.response?.data?.error || error?.message || "An error occurred while submitting the form.";
      setMessage(errorMsg);
      console.error("Signin error:", error);
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center min-h-[70vh] px-4 py-8">
      <div className="bg-blue-50 flex flex-col md:flex-row w-full max-w-4xl md:h-[65vh] md:mt-4 justify-center gap-8 md:gap-12 p-6 md:p-10 md:border md:rounded-2xl md:shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="inline-flex flex-col justify-center items-center gap-2"
        >
          <h2 className="text-black shadow-blue-700 ml-1 place-self-start sm:mb-5">
            Sign in to your account
          </h2>
          <div className="mt-0">
            <label
              htmlFor="email"
              className="text-sm/6 block font-medium text-gray-900"
            >
              Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              className="mt-2 flex items-center rounded-md bg-white p-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
              onChange={handleChange}
            />
          </div>
          <div className="mt-0">
            <label
              htmlFor="password"
              className="text-sm/6 block font-medium text-gray-900"
            >
              Password<span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
              onChange={handleChange}
            />
          </div>
          <p className=" text-red-500">{message}</p>
          <button
            type="submit"
            className="shadow-black rounded-md flex text-white border-none p-4 h-6 justify-center items-center gap-2 hover:shadow-sm hover:scale-[1.1] bg-blue-700"
          >
            Log in
          </button>
        </form>
        <img
          className="md:block hidden w-75 h-100 shrink-0 "
          src={signin}
          alt="Sign in"
        />
      </div>
    </div>
  );
};
