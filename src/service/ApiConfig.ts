import axios from "axios";

//Localhost
export const Api = () => {
  return axios.create({
    baseURL: "http://127.0.0.1:4000",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });
};
