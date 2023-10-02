import mongoose from "mongoose";
import { Item } from "./item";

const closetSchema = new mongoose.Schema({
  collection: String,
  imgSrc: String,
  closet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

export const Closet = mongoose.model("Closet", closetSchema);
