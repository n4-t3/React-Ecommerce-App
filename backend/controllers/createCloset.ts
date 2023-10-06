import { Closet } from "../models/closet";
import { Item } from "../models/item";
export const createCloset = async (
  collectionName: string,
  imgSrc: string,
  closet: (typeof Item)[]
) => {
  const existingCloset = await Closet.findOne({ collectionName });
  if (existingCloset) {
    throw new Error("Closet with this collection name already exists");
  }
  const newCloset = new Closet({
    collectionName,
    imgSrc,
    closet,
  });
  await newCloset.save();
  return newCloset;
};
