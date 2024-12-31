import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await UserModel.create({ ...data, password: hashedPassword });
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};
