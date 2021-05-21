import axios from "axios";

import { backend_url } from "react-native-dotenv";

const API = axios.create({ baseURL: backend_url });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("user")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("user")).token
//     }`;
//   }

//   return req;
// });

export default API;
