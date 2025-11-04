import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getColleges = () => API.get("/colleges");
export const addCollege = (data) => API.post("/colleges", data);
