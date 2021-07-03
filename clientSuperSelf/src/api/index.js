import axios from "axios";
import { backend_url } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../constants/config";

const API = axios.create({ baseURL: BACKEND_URL });

API.interceptors.request.use(async (req) => {
  let data = null;
  try {
    data = JSON.parse(await AsyncStorage.getItem("superself_token"));
    // alert(JSON.stringify(data));
  } catch (error) {
    alert("Cannot not get storage");
    console.log("Error in storage", error.message);
  }
  if (data) {
    req.headers.Authorization = `Bearer ${data.token}`;
  }

  return req;
});

export default API;
