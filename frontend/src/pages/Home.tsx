import About from "@/components/Home/About";
import Services from "@/components/Home/Services";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10">
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
            Welcome to DBU Clinic
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your health is our top priority. We provide quality healthcare
            services with compassion, professionalism, and advanced technology.
            Book appointments, view your medical records, and connect with our
            expert doctors online.
          </p>
          <div className="flex gap-4">
            <a
              href="/services"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Our Services
            </a>
            <a
              href="/contact"
              className="bg-white border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Hospital"
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>
      </main>

      {/* Include About and Services sections */}

      <Services />

      <section className="bg-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://img.freepik.com/free-photo/african-american-black-doctor-man-with-stethoscope-isolated-white-background_231208-2222.jpg?ga=GA1.1.600728696.1742386826&semt=ais_items_boosted&w=740"
              alt="Expert African Doctor"
              className="w-24 h-24 rounded-full mb-4 object-cover shadow"
            />
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              Expert Doctors
            </h3>
            <p className="text-gray-600">
              Our team consists of highly qualified and experienced medical
              professionals.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://media.istockphoto.com/id/1310342557/photo/ct-scanner-equipment-in-the-hospital.jpg?s=612x612&w=0&k=20&c=sm-AsDRvXw8pSAbl6ApFYnaVfKuM0M9A-ZrVVaLq74Q="
              alt="CT Scan Equipment"
              className="w-24 h-24 rounded-full mb-4 object-cover shadow"
            />
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              Modern Facilities
            </h3>
            <p className="text-gray-600">
              State-of-the-art equipment and comfortable environment for your
              care.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              alt="24/7 Support"
              className="w-24 h-24 rounded-full mb-4 object-cover shadow bg-white p-4"
            />
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              We are here for you any time, any day. Your health matters to us.
            </p>
          </div>
        </div>
      </section>

      <About />

      <footer className="bg-blue-900 py-4 mt-10 h-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-white">
          <span className="text-center w-full md:w-auto">
            &copy; {new Date().getFullYear()} DBU Clinic. All rights reserved.
          </span>
          <div className="flex gap-4 mt-2 md:mt-0 justify-center w-full md:w-auto">
            <a
              href="mailto:eyobedteshome@gmail.com"
              className="hover:underline"
            >
              Email
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
