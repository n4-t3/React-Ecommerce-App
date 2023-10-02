import { Closet } from "../models/closet";

export const createCloset = async (
  collection: string,
  imgSrc: string,
  closet: []
) => {
  const existingCloset = await Closet.findOne({ collection });
  if (existingCloset) {
    throw new Error("Closet with this email already exists");
  }
  const newCloset = new Closet({
    collection,
    imgSrc,
    closet,
  });
  await newCloset.save();
  return newCloset;
};
