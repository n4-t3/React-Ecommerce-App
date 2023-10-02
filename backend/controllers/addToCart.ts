import { Item } from "../models/item";
import { User } from "../models/user";
import { Types } from "mongoose";

export const addToCart = async (
  uid: Types.ObjectId,
  itemId: Types.ObjectId
) => {
  const user = await User.findById(uid);
  if (!user) {
    throw new Error("User not found");
  }
  const item = await Item.findById(itemId);
  if (!item) {
    throw new Error("Item not found");
  }
  user.cartItem.push(item._id);
  await user.save();
  return user;
};
