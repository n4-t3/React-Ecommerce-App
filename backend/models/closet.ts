import mongoose from "mongoose";
import { Item } from "./item";

const closetSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  closet: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    required: true,
  },
});

export const Closet = mongoose.model("Closet", closetSchema);
