import io from "socket.io-client";

// export const BACKEND_URL = "http://192.168.1.13:5000";

export const BACKEND_URL = "https://superselfapp.herokuapp.com/";

export const SOCKET = io(BACKEND_URL);
