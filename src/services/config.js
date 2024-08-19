import axios from "axios";
import { getLocalToken } from "./helpers";

const requestAutorization = () => {
  const token = getLocalToken("cyber_token");
  return `Bearer ${token}`;
};
console.log(requestAutorization());
export const Custom = axios.create({
  baseURL: "https://bripan.greenmouseacademy.com.ng/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: requestAutorization(),
  },
});

export const CustomAdd = axios.create({
  baseURL: "https://bripan.greenmouseacademy.com.ng/api/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: requestAutorization(),
  },
});
