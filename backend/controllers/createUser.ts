import { User } from "../models/user";
import { Item } from "../models/item";
import bcrypt from "bcrypt";

export const createUser = async (
  email: string,
  name: string,
  password: string,
  isAdmin: boolean,
  boughtItem: (typeof Item)[],
  cartItem: (typeof Item)[]
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const hashedPW = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    name,
    password: hashedPW,
    isAdmin,
    boughtItem,
    cartItem,
  });
  await newUser.save();
  return {
    _id: newUser._id,
    email: newUser.email,
    name: newUser.name,
    isAdmin: newUser.isAdmin,
    boughtItem: newUser.boughtItem,
    cartItem: newUser.cartItem,
  };
};
