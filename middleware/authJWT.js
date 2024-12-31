import jwt from "jsonwebtoken";
import { customErrorHandler } from "../utils/errorHandler.util.js";

export const authJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return customErrorHandler(res, 404, "Access token missing");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    req.user = decode;
    next();
  } catch (error) {
    return customErrorHandler(res, 401, "Invalid authorization");
  }
};
