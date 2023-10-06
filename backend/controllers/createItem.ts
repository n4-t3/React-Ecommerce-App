import { Closet } from "../models/closet";
import { Item } from "../models/item";

export const createItem = async (
  collectionName: string,
  name: string,
  imgSrc: string,
  price: number
) => {
  const newItem = new Item({
    name,
    imgSrc,
    price,
  });
  await newItem.save();
  const closet = await Closet.findOne({ collectionName });
  if (!closet) {
    throw new Error("Closet not found");
  }
  closet.closet.push(newItem._id);
  await closet.save();
  return newItem;
};
