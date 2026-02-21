import axios from "axios";

const API_URL = "https://otp-sytem.onrender.com/api/otp";

export const generateOtp = (digits) => {
  return axios.post(`${API_URL}/generate`, {
    digits: digits
  });
};
