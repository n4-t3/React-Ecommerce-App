import { createContext } from "react";

interface User {
  email: string;
  displayName: string;
  uid: string;
  boughtItem?: [];
  cartItem?: [];
}

interface Closet {
  id: number;
  item: string;
  imgSrc: string;
  closet: { id: number; name: string; imgSrc: string; price: number }[];
}

interface Context {
  data: Closet[];
  setData: React.Dispatch<React.SetStateAction<Closet[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const ShoppingContext = createContext({} as Context);
