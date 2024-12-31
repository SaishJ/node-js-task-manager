import jwt from "jsonwebtoken";
export const signJWT = (data) => {
  // Generate a JWT token
  return jwt.sign(data, process.env.JWT_SECRET || "", { expiresIn: "10d" });
};
