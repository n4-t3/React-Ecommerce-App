import { Item } from "../models/item";
import { User } from "../models/user";
import { Types } from "mongoose";

export const removeFromCart = async (
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
  var index = user.cartItem.indexOf(itemId);
  if (index >= 0 && index < user.cartItem.length) {
    user.cartItem.splice(index, 1);
  }
  await user.save();
  return user;
};
