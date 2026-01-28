import axios from "axios";

const API_BASE = "http://localhost:5001/api/follow-ups";

export const getDoctorFollowUps = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_BASE}/doctor/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export const getPatientFollowUp = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_BASE}/patient/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
