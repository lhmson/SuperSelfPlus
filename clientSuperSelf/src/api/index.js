import axios from "axios";
import { backend_url } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({ baseURL: backend_url });

// API.interceptors.request.use(async (req) => {
//   let data = null;
//   try {
//     data = JSON.parse(await AsyncStorage.getItem("token"));
//     // alert(JSON.stringify(data));
//   } catch (error) {
//     alert("Cannot not get storage");
//     console.log("Error in storage", error);
//   }
//   if (token) {
//     req.headers.Authorization = `Bearer ${data.token}`;
//   }

//   return req;
// });

export default API;
