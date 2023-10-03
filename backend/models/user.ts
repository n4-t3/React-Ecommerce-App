import mongoose from "mongoose";
import { Item } from "./item";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
  },
  boughtItem: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    required: true,
  },
  cartItem: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
