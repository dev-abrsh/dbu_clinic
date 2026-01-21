import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MedicalCardData from "@/models/MedicalCardData";
import photo from "./photo.jpg";

const MyMedicalCard = () => {
  // Hardcoded default data
  const defaultData: MedicalCardData = {
    profilePic: photo, // if you want a real picture, put the file name
    name: "Biruk",
    department: "Geology",
    email: "biruk@gmail.com",
    phone: "0920202020",
    age: 20,
    gender: "Male",
    bloodType: "O+",
  };

  const cardRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cardRef,
    documentTitle: "patient-card",
  });

  const data = defaultData; // use hardcoded data

  return (
    <div className="md:mb-40 mb-10 flex flex-col place-items-center justify-center px-4 py-8 w-full">
      <div
        ref={cardRef}
        className="mb-2 bg-blue-50 print:bg-white flex flex-col md:flex-row print:w-fit print:h-fit print:justify-center gap-8 md:gap-12 p-6 md:p-10 md:border md:rounded-2xl md:shadow-xl w-full max-w-2xl"
      >
        <div className="flex flex-col gap-6 print:lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-center text-xl font-bold text-blue-600 dark:text-white/90 lg:mb-6">
              Medical card
            </h2>
            <div className="w-24 h-24 md:w-30 md:h-30 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 mx-auto">
              <img
                src={data.profilePic}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid mt-4 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Fullname
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.name}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Department
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.department}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.phone}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Age
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.age}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Gender
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.gender}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Bloodtype
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.bloodType}
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handlePrint}
      >
        Print card
      </button>
    </div>
  );
};

export default MyMedicalCard;
