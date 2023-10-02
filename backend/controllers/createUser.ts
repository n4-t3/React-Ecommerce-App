import { User } from "../models/user";

export const createUser = async (
  email: string,
  displayName: string,
  isAdmin: boolean,
  boughtItem: [],
  cartItem: []
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const newUser = new User({
    email,
    displayName,
    isAdmin,
    boughtItem,
    cartItem,
  });
  await newUser.save();
  return newUser;
};
