import { useState } from "react";
import { contactAPI } from "@/services/apiService";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [responseMessage, setResponseMessage] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const result = await contactAPI.sendMessage(formData);
			if (result.success) {
				setResponseMessage("Thank you for reaching out! We will get back to you soon.");
				setFormData({ name: "", email: "", message: "" });
			} else {
				setResponseMessage(result.error || "Failed to send message. Please try again.");
			}
		} catch (error: any) {
			setResponseMessage(error.response?.data?.error || "An error occurred. Please try again.");
		}
	};

	return (
		<div className="flex flex-col place-items-center justify-center mb-10 px-4 py-8">
			<div className="bg-blue-50 flex flex-col md:flex-row w-full max-w-4xl md:h-[65vh] p-6 md:p-25 justify-center gap-8 md:gap-12 md:border md:rounded-2xl md:shadow-xl">
				<form
					onSubmit={handleSubmit}
					className="inline-flex flex-col justify-center items-center gap-4"
				>
					<h2 className="text-black shadow-blue-700 ml-5">
						Contact Us
					</h2>
					<div>
						<label
							htmlFor="name"
							className="text-sm/6 block font-medium text-gray-900"
						>
							Full Name<span className="text-red-600">*</span>
						</label>
						<input
							id="name"
							type="text"
							name="name"
							value={formData.name}
							placeholder="Enter your full name"
							className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
							onChange={handleChange}
						/>
					</div>
					<div>
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
							value={formData.email}
							placeholder="Enter your email"
							className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
							onChange={handleChange}
						/>
					</div>
					<div>
						<label
							htmlFor="message"
							className="text-sm/6 block font-medium text-gray-900"
						>
							Message<span className="text-red-600">*</span>
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							placeholder="Enter your message"
							className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-24"
							onChange={handleChange}
						/>
					</div>
					<p className={responseMessage.includes("error") || responseMessage.includes("Failed") ? "text-red-500" : "text-green-500"}>{responseMessage}</p>
					<button
						type="submit"
						className="shadow-black rounded-md flex text-white border-none hover:shadow-sm hover:scale-[1.1] bg-blue-700 p-4 h-6 justify-center items-center gap-2"
					>
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
};

export default Contact;
