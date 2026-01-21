import { useEffect, useState } from "react";

interface Patient {
  id: string;
  profilePic?: string;
  name?: string;
  gender?: string;
  age?: number | string;
  bloodType?: string;
}

const PatientLIst = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    import("@/services/apiService").then(({ doctorAPI }) => {
      doctorAPI.getPatients().then((data) => {
        if (data.success) {
          setPatients(data.content);
        }
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-fit w-full">
      <div className="w-full max-w-5xl bg-blue-50 rounded-2xl shadow-2xl p-4 md:p-8 mt-10">
        <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6 text-center">
          Patient List
        </h2>
        <div
          className="overflow-x-auto rounded-2xl"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <table className="min-w-full divide-y divide-gray-200 rounded-2xl">
            <thead className="bg-blue-200">
              <tr>
                <th className="px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">
                  Photo
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">
                  Gender
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">
                  Age
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">
                  Blood Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-2 md:px-4 py-2">
                    <div className="w-8 h-8 md:w-12 md:h-12 overflow-hidden border border-gray-200 rounded-full mx-auto">
                      <img
                        src={
                          patient.profilePic
                            ? `http://localhost/IP2_project-main/dbu_clinic/Backend/uploads/${patient.profilePic}`
                            : "/default-profile.png"
                        }
                        alt="profile"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-2 text-xs md:text-sm text-gray-800">{patient.name}</td>
                  <td className="px-2 md:px-4 py-2 text-xs md:text-sm text-gray-800">{patient.gender}</td>
                  <td className="px-2 md:px-4 py-2 text-xs md:text-sm text-gray-800">{patient.age}</td>
                  <td className="px-2 md:px-4 py-2 text-xs md:text-sm text-gray-800">
                    {patient.bloodType}
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientLIst;
