import jwt from "jsonwebtoken";
const jwtSecret = "test";

export const decodeJwt = (token) => {
  return jwt.decode(token);
};

export const verifyJwt = (token) => {
  let result = null;

  if (token) {
    try {
      result = jwt.verify(token, jwtSecret);
    } catch (error) {
      /* console.log("Jwt verification error:", error); */
    }
  }
  return result;
};
