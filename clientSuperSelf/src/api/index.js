import axios from "axios";
import { backend_url } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({ baseURL: "http://192.168.1.3:5000" });

API.interceptors.request.use(async (req) => {
  let data = null;
  try {
    data = JSON.parse(await AsyncStorage.getItem("superself_token"));
    // alert(JSON.stringify(data));
  } catch (error) {
    alert("Cannot not get storage");
    console.log("Error in storage", error);
  }
  if (data) {
    req.headers.Authorization = `Bearer ${data.token}`;
  }

  return req;
});

export default API;
