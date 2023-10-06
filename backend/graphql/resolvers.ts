import { createUser } from "../controllers/createUser";
import { Request } from "express";
import isEmail from "validator/lib/isEmail";
import { login } from "../controllers/login";
import { addToBoughtItems } from "../controllers/addToBoughtItems";
import { addToCart } from "../controllers/addToCart";
import { removeFromCart } from "../controllers/removeFromCart";
import { Types } from "mongoose";
import { createCloset } from "../controllers/createCloset";
import { createItem } from "../controllers/createItem";

interface UserInput {
  userInput: {
    email: string;
    name: string;
    password: string;
  };
}

interface CustomRequest extends Request {
  isAuth?: boolean;
  isAdmin?: boolean;
  userId?: string;
}

export const resolvers = {
  async loginResolver(
    { email, password }: { email: string; password: string },
    req: CustomRequest
  ) {
    const loginResponse = await login(email, password);
    return loginResponse;
  },
  async createUserResolver({ userInput }: UserInput, req: CustomRequest) {
    if (!isEmail(userInput.email)) {
      throw new Error("Please enter a valid email");
    }
    const createdUser = await createUser(
      userInput.email,
      userInput.name,
      userInput.password,
      false,
      [],
      []
    );
    return { ...createdUser, _id: createdUser._id.toString() };
  },
  async addToBoughtItemsResolver(
    { itemId }: { itemId: string },
    req: CustomRequest
  ) {
    if (req.isAuth) {
      if (req.userId) {
        const itemIdObject = new Types.ObjectId(itemId);
        const userIdObject = new Types.ObjectId(req.userId);
        const addToBoughtItemsResponse = await addToBoughtItems(
          userIdObject,
          itemIdObject
        );
        return {
          ...addToBoughtItemsResponse,
          _id: addToBoughtItemsResponse._id.toString(),
        };
      }
      throw new Error("User not found");
    }
  },
  async addToCartResolver({ itemId }: { itemId: string }, req: CustomRequest) {
    if (req.isAuth) {
      if (req.userId) {
        const itemIdObject = new Types.ObjectId(itemId);
        const userIdObject = new Types.ObjectId(req.userId);
        const addToCartResponse = await addToCart(userIdObject, itemIdObject);
        return { ...addToCartResponse, _id: addToCartResponse._id.toString() };
      }
      throw new Error("User not found");
    }
  },
  async removeFromCartResolver(
    { itemId }: { itemId: string },
    req: CustomRequest
  ) {
    if (req.isAuth) {
      if (req.userId) {
        const itemIdObject = new Types.ObjectId(itemId);
        const userIdObject = new Types.ObjectId(req.userId);
        const removeFromCartResponse = await removeFromCart(
          userIdObject,
          itemIdObject
        );
        return {
          ...removeFromCartResponse,
          _id: removeFromCartResponse._id.toString(),
        };
      }
      throw new Error("User not found");
    }
  },
  async createClosetResolver(
    { collectionName, imgSrc }: { collectionName: string; imgSrc: string },
    req: CustomRequest
  ) {
    if (!req.isAuth || !req.isAdmin || !req.userId) {
      throw new Error("User not authorized");
    }
    const createClosetResponse = await createCloset(collectionName, imgSrc, []);

    return {
      ...createClosetResponse,
      _id: createClosetResponse._id.toString(),
    };
  },
  async createItemResolver(
    {
      collectionName,
      name,
      imgSrc,
      price,
    }: { collectionName: string; name: string; imgSrc: string; price: number },
    req: CustomRequest
  ) {
    if (!req.isAuth || !req.isAdmin || !req.userId) {
      throw new Error("User not authorized");
    }
    const createItemResponse = await createItem(
      collectionName,
      name,
      imgSrc,
      price
    );
    return {
      ...createItemResponse,
      _id: createItemResponse._id.toString(),
    };
  },
};
