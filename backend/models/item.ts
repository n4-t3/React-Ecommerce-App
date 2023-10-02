import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  imgSrc: String,
  price: Number,
});

export const Item = mongoose.model("Item", itemSchema);
