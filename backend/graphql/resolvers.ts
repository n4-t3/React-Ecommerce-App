import { createUser } from "../controllers/createUser";
import { Request } from "express";
import isEmail from "validator/lib/isEmail";
import { login } from "../controllers/login";

interface UserInput {
  userInput: {
    email: string;
    name: string;
    password: string;
  };
}
export const resolvers = {
  async createUserResolver({ userInput }: UserInput, req: Request) {
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
  async loginResolver(
    { email, password }: { email: string; password: string },
    req: Request
  ) {
    return login(email, password);
  },
};
