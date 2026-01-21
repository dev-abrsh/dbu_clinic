import doctor from "../../assets/doctor.png";
const About = () => {
	return (
		<section id="about" className="py-16 bg-blue-50">
			<div className="container mx-auto flex flex-col md:flex-row items-center md:justify-around mb-30">
				<div className="ml-20">
					<img
						src={doctor}
						alt="About DBU Clinic"
						className="rounded-lg w-65 h-50"
					/>
				</div>
				<div className="md:w-1/2 md:mt-0">
					<h3 className="text-3xl font-bold mb-4">About Us</h3>
					<p className="text-lg mb-4">
						DBU Clinic is committed to delivering high-quality
						healthcare services to our community. Our team of
						experienced professionals ensures that every patient
						receives personalized care.
					</p>
					<p className="text-lg">
						We strive to create a welcoming environment where your
						health and well-being are our top priorities.
					</p>
				</div>
			</div>
		</section>
	);
};

export default About;
