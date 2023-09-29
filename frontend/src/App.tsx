import "./App.css";
import React, { useEffect, useState, createContext } from "react";
import HomePage from "./pages/home-page/home";
import Shop from "./pages/shop-page/shop";
import ChosenShoppingPage from "./pages/shopping-page/chosen-shopping";
import CartPage from "./pages/cart-page/cart";
import Navbar from "./UI/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { array } from "./data/data";
import { createUserProfileDocument } from "./firebase/firebase.utils";

interface ShoppingData {
  // Define the structure of your data here
}

interface UserContext {
  data: ShoppingData;
  setData: React.Dispatch<React.SetStateAction<ShoppingData>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const ShoppingContext = createContext<any | undefined>(undefined);

function App() {
  const [data, setData] = useState<ShoppingData>(array);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const authentication = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userRef = await createUserProfileDocument(authUser);
        setUser(userRef);
      } else {
        setUser(null);
      }
    });
    return authentication;
  }, []);

  return (
    <div className="App">
      <ShoppingContext.Provider value={{ data, setData, user, setUser }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/React-Ecommerce-App/" element={<HomePage />} />
            <Route path="/React-Ecommerce-App/shop/" element={<Shop />} />
            <Route
              path="/React-Ecommerce-App/shop/:slug/"
              element={<ChosenShoppingPage />}
            />
            <Route path="/React-Ecommerce-App/cart/" element={<CartPage />} />
          </Routes>
        </Router>
      </ShoppingContext.Provider>
    </div>
  );
}

export default App;
