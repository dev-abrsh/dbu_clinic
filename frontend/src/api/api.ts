const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost/IP2_project-main/IP2_project-main/dbu_clinic/Backend/API";

// Ensure the URL doesn't have trailing slash
const cleanApiUrl = API_BASE_URL.endsWith("/")
  ? API_BASE_URL.slice(0, -1)
  : API_BASE_URL;

export default cleanApiUrl;
