import axios from "axios";

import { backend_url } from "react-native-dotenv";

const API = axios.create({ baseURL: "http://192.168.1.6:5000" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("user")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("user")).token
//     }`;
//   }

//   return req;
// });

export default API;
