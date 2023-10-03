import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (user) {
    const validPW = await bcrypt.compare(password, user.password);
    if (validPW) {
      const JWTSECRET = process.env.JWTSECRET!;
      const token = jwt.sign({ userId: user._id.toString() }, JWTSECRET, {
        expiresIn: "1h",
      });
      return { userId: user._id.toString(), token };
    } else {
      throw new Error("Invalid password");
    }
  } else {
    throw new Error("Invalid username");
  }
};
