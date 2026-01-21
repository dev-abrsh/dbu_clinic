const Services = () => {
	return (
		<section id="services" className="py-16 bg-white">
			<div className="container mx-auto text-center">
				<h3 className="text-3xl font-bold mb-8">Our Services</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-6 border rounded-lg shadow-md bg-blue-50">
						<h4 className="text-xl font-bold mb-2">
							General Checkup
						</h4>
						<p>
							Comprehensive health checkups to ensure your
							well-being.
						</p>
					</div>
					<div className="p-6 border rounded-lg shadow-md bg-blue-50">
						<h4 className="text-xl font-bold mb-2">Pediatrics</h4>
						<p>Specialized care for children and adolescents.</p>
					</div>
					<div className="p-6 border rounded-lg shadow-md bg-blue-50">
						<h4 className="text-xl font-bold mb-2">
							Emergency Services
						</h4>
						<p>24/7 emergency care for urgent medical needs.</p>
					</div>
					<div className="p-6 border rounded-lg shadow-md bg-blue-50">
						<h4 className="text-xl font-bold mb-2">Dental Care</h4>
						<p>High-quality dental services for a healthy smile.</p>
					</div>
					<div className="p-6 border rounded-lg shadow-md bg-blue-50">
						<h4 className="text-xl font-bold mb-2">
							Laboratory Services
						</h4>
						<p>Accurate and timely diagnostic tests.</p>
					</div>
					<div className="p-6 border rounded-lg shadow-md bg-blue-50">
						<h4 className="text-xl font-bold mb-2">Pharmacy</h4>
						<p>On-site pharmacy for your convenience.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;
