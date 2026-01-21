import api from "./api"; // your Axios instance
import API_BASE_URL from "../api/api"; // base URL of your backend

// ----------------- TYPES -----------------
export interface SigninData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role?: string; // patient by default
}

export interface AppointmentData {
  StaffID: number;
  appointment_date: string;
  appointment_time: string;
}

export interface MedicalCardData {
  department: string;
  phone: string;
  birthdate: string;
  gender: string;
  bloodType: string;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface Physician {
  StaffID: number;
  StaffName: string;
}

// ----------------- AUTH APIs -----------------
export const authAPI = {
  // Signin
  signin: async (data: { email: string; password: string }) => {
    const response = await fetch(
      "http://localhost/IP2_project-main/IP2_project-main/dbu_clinic/Backend/API/signin.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    return response.json();
  },

  // Signup (no images)
  signup: async (data: SignupData) => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/signup.php`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role || "patient",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) throw error.response.data;
      throw { error: error.message || "Signup failed" };
    }
  },

  // Check current session
  checkSession: async () => {
    const response = await api.get(`${API_BASE_URL}/check_session.php`, {
      withCredentials: true,
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/logout.php`,
        {},
        { withCredentials: true },
      );
      return response.data;
    } catch (error: any) {
      throw { error: error.message || "Logout failed" };
    }
  },
};

// ----------------- PATIENT APIs -----------------
export const patientAPI = {
  checkCard: async () => {
    const response = await api.get(`${API_BASE_URL}/checkCard.php`, {
      withCredentials: true,
    });
    return response.data;
  },

  createMedicalCard: async (data: MedicalCardData) => {
    const response = await api.post(`${API_BASE_URL}/medicalCard.php`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  },

  getAppointmentInfo: async () => {
    const response = await api.get(`${API_BASE_URL}/appointmentInfo.php`, {
      withCredentials: true,
    });
    return response.data;
  },

  bookAppointment: async (data: AppointmentData) => {
    const response = await api.post(`${API_BASE_URL}/appointment.php`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  },

  getPhysicians: async (): Promise<{
    success: boolean;
    physicians: Physician[];
  }> => {
    const response = await api.get(`${API_BASE_URL}/getPhysicians.php`, {
      withCredentials: true,
    });
    return response.data;
  },
};

// ----------------- DOCTOR APIs -----------------
export const doctorAPI = {
  getPatients: async () => {
    const response = await api.get(
      `${API_BASE_URL}/Doctor_dashboard/patients.php`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },

  getAppointments: async () => {
    const response = await api.get(
      `${API_BASE_URL}/Doctor_dashboard/appointmentD.php`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },

  getNumbers: async () => {
    const response = await api.get(
      `${API_BASE_URL}/Doctor_dashboard/numbers.php`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },

  addPhysician: async (physicianName: string) => {
    const response = await api.post(
      `${API_BASE_URL}/Doctor_dashboard/add_physician.php`,
      { physicianName },
      { withCredentials: true },
    );
    return response.data;
  },

  deletePhysician: async (physicianName: string) => {
    const response = await api.post(
      `${API_BASE_URL}/Doctor_dashboard/delete_physician.php`,
      { physicianName },
      { withCredentials: true },
    );
    return response.data;
  },
};

// ----------------- CONTACT API -----------------
export const contactAPI = {
  sendMessage: async (data: ContactData) => {
    const response = await api.post(`${API_BASE_URL}/contactUs.php`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  },
};
