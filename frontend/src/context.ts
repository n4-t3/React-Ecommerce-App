import { createContext } from "react";

interface Data {
  id: number;
  item: string;
  imgSrc: string;
  closet: Closet[];
}

interface Context {
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const ShoppingContext = createContext({} as Context);
