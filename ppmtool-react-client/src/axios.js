import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:8080/",
  baseURL: "https://svars8-ppmtool.herokuapp.com/",
});

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    instance.defaults.headers.common["Authorization"] = token;
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common["Authorization"];
  }
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    console.log("interceptor token:" + token);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
