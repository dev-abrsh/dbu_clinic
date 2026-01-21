import { useEffect, useState } from "react";
import Appointment from "@/components/DoctorDashboard/Appointment";
import Card from "@/components/DoctorDashboard/Card";
import PatientLIst from "@/components/DoctorDashboard/PatientLIst";
import PhysicianManagement from "@/components/DoctorDashboard/PhysicianManagement";
import { doctorAPI } from "@/services/apiService";

const DoctorDashboard = () => {
	const [stats, setStats] = useState({ patients: 0, appointments: 0 });

	useEffect(() => {
		doctorAPI.getNumbers().then((data) => {
			if (data.success) {
				const totalPatients = data.physicians.reduce((acc: number, p: any) => acc + (p.appointmentCount || 0), 0);
				const totalAppointments = data.physicians.reduce((acc: number, p: any) => acc + (p.appointmentCount || 0), 0);
				setStats({ patients: totalPatients, appointments: totalAppointments });
			}
		});
	}, []);

	return (
		<div className="flex flex-col items-center min-h-screen px-4 py-8">
			<div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 justify-center items-start">
				<div className="flex flex-col gap-8 w-full lg:w-4/5">
					<div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 place-items-center">
						<Card title="Total patients seen" num={stats.patients} />
						<Card title="Total appointments" num={stats.appointments} />
					</div>
					<PatientLIst />
					<PhysicianManagement />
				</div>
				<div className="w-full lg:w-1/5 flex justify-center lg:justify-end">
					<div
						className="w-full max-w-md lg:max-w-none"
						style={{ maxHeight: "600px", overflowY: "auto" }}
					>
						<Appointment />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDashboard;
