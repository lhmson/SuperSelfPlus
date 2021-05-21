import jwt from "jsonwebtoken";

export const decodeJwt = (token) => {
  return jwt.decode(token);
};

export const verifyJwt = (token) => {
  let result = null;

  if (token) {
    try {
      result = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (error) {
      /* console.log("Jwt verification error:", error); */
    }
  }
  return result;
};
