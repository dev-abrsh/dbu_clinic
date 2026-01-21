import { useEffect, useState } from "react";
import { MedicalCard } from "@/components/PatientDashboard/MedicalCard";
import MyMedicalCard from "@/components/PatientDashboard/MyMedicalCard";
import AppointmentCard from "@/components/PatientDashboard/AppointmentCard";

const PatientDashboard = () => {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    import("@/services/apiService").then(({ patientAPI }) => {
      patientAPI.checkCard().then((data) => {
        setAvailable(data.success && data.hasCard);
      });
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 mx-auto justify-center px-4 py-8 max-w-7xl">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        {available ? <MyMedicalCard /> : <MedicalCard />}
      </div>
      <div className="w-full lg:w-1/2">
        <AppointmentCard />
      </div>
    </div>
  );
};

export default PatientDashboard;
