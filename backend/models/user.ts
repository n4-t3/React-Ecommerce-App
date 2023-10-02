import mongoose from "mongoose";
import { Item } from "./item";

const userSchema = new mongoose.Schema({
  email: String,
  displayName: String,
  isAdmin: Boolean,
  boughtItem: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  cartItem: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

export const User = mongoose.model("User", userSchema);
