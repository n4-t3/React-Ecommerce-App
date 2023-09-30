import "./App.css";
import { useEffect, useState } from "react";
import HomePage from "./pages/home-page/home";
import Shop from "./pages/shop-page/shop";
import ChosenShoppingPage from "./pages/shopping-page/chosen-shopping";
import CartPage from "./pages/cart-page/cart";
import Navbar from "./UI/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { array } from "./data/data";
import { createUserProfileDocument } from "./firebase/firebase.utils";
import { ShoppingContext } from "./context";

interface User {
  email: string;
  displayName: string;
  uid: string;
}

function App() {
  const [data, setData] = useState(array);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const authentication = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user as User);
        setUser({ ...(userRef as User) });
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
