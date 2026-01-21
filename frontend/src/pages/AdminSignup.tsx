import signin from "../assets/signin.png";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [profilePic, setProfilepic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const pic = e.dataTransfer.files[0];
      setProfilepic(pic);
      e.dataTransfer.clearData("Files");
      const imageURL = URL.createObjectURL(pic);
      setPreviewUrl(imageURL);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file[0]) {
      setProfilepic(file[0]);
      const imageURL = URL.createObjectURL(file[0]);
      setPreviewUrl(imageURL);
    } else {
      setProfilepic(null);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("user_data", JSON.stringify(formData));
      if (profilePic) {
        form.append("profilePic", profilePic);
      }
      // Use a dedicated admin signup endpoint if available, else fallback to signup.php
      const response = await axios.post(
        "http://localhost/IP2_project-main/dbu_clinic/backend/API/signup.php",
        form
      );
      if (response.data.success) {
        navigate("/signin");
      }
      setMessage(response.data.error);
    } catch {
      setMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center">
      <div className="mb-40 bg-blue-50 flex flex-row w-fit h-fit justify-center gap-12 p-10 md:border md:rounded-2xl md:shadow-xl">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="inline-flex flex-col justify-center items-center gap-2"
        >
          <h2 className="text-black shadow-blue-700 ml-5">Admin Signup</h2>
          <div>
            <label
              htmlFor="username"
              className="text-sm/6 block font-medium text-gray-900"
            >
              Full name<span className="text-red-600">*</span>
            </label>
            <input
              id="username"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your full name"
              className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
              onChange={handleChange}
            />
          </div>
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
              className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
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
              minLength={8}
              id="password"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
              onChange={handleChange}
            />
            <div className="mt-2 self-stretch justify-start text-slate-600 text-sm font-normal leading-tight">
              Must be at least 8 characters.
            </div>
          </div>
          <div className="mt-0">
            <label
              htmlFor="ConfirmPassword"
              className="text-sm/6 block font-medium text-gray-900"
            >
              Confirm Password<span className="text-red-600">*</span>
            </label>
            <input
              id="ConfirmPassword"
              type="password"
              minLength={8}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Reenter your password"
              className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
              onChange={handleChange}
            />
          </div>
          <div className="mt-0 ml-8">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Photo<span className="text-red-600">*</span>
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            >
              <div className="text-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto size-12 text-gray-300"
                  />
                ) : (
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300"
                  />
                )}
                <div className="h-4 mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-blue-500  focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1 hidden md:block">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <p className=" text-red-500">{message}</p>
          <button
            type="submit"
            className="shadow-black rounded-md flex text-white border-none hover:shadow-sm hover:scale-[1.1] bg-blue-700 p-4 h-6 justify-center items-center gap-2"
          >
            Register as Admin
          </button>
        </form>
        <img
          className="md:block hidden w-75 h-100 shrink-0 my-22"
          src={signin}
          alt="Sign Up"
        />
      </div>
    </div>
  );
};

export default AdminSignup;
