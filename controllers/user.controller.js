import {
  createUser,
  getUserByEmail,
} from "../controllerUtils/user.controllerUtils.js";
import { customErrorHandler } from "../utils/errorHandler.util.js";
import bcrypt from "bcrypt";
import { signJWT } from "../utils/jwt.util.js";

export const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const userExists = await getUserByEmail(data.email);
    if (userExists) {
      return customErrorHandler(res, 401, "User already exists");
    }
    const user = await createUser(data);
    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    req.error = error;
    console.log("Failed to register user:", error);
    return customErrorHandler(res, undefined, undefined, error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return customErrorHandler(res, 404, "User not found");
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return customErrorHandler(res, 401, "Invalid credentials");
    }
    const token = signJWT({ id: user._id, email: user.email, name: user.name });
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      access_token: token,
      user,
    });
  } catch (error) {
    req.error = error;
    console.log("Failed to login user:", error);
    return customErrorHandler(res, undefined, undefined, error);
  }
};
