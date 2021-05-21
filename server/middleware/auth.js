import jwt from "jsonwebtoken";
import { verifyJwt } from "../utils/verifyAuth.js";

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: "You must log in to do it" });
    }
    const token = authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // google id > 500

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = verifyJwt(token);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    // get req userId to use when come next auth
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "You have not signed in" });
  }
};

export default auth;
