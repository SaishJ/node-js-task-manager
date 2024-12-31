import jwt from "jsonwebtoken";

export const authJWT = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || "", (err, decode) => {
      if (err) {
        res
          .status(401)
          .json({ success: false, message: "User is not authorized" });
      }
      req.user = decode.user;
      next();
    });

    if (!token) {
      res.status(404).json({ success: false, message: "Token is missing" });
    }
  }
};
