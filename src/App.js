import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import HomePage from './pages/home-page/home'
import Shop from './pages/shop-page/shop';
import ChosenShoppingPage from './pages/shopping-page/chosen-shopping';
import CartPage from './pages/cart-page/cart';
import Navbar from './UI/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { array } from './data/data';
import {createUserProfileDocument} from './firebase/firebase.utils';

export const ShoppingContext = createContext()

function App() {
  const [data, setData] = useState(array)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth();
    const authentication = onAuthStateChanged(auth, async (user) => {
      if (user){
        const userRef =  await createUserProfileDocument(user)
        setUser({...userRef})
      }else{
        setUser(null)
      }
    })
    return authentication
  }, [])

  return (
    <div className="App">
      <ShoppingContext.Provider value={{ data, setData, user, setUser }}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/React-Ecommerce-App/" element={<HomePage />} />
            <Route exact path="/React-Ecommerce-App/shop/" element={<Shop />} />
            <Route exact path="/React-Ecommerce-App/shop/:slug/" element={<ChosenShoppingPage />} />
            <Route exact path="/React-Ecommerce-App/cart/" element={<CartPage />} />
          </Routes>
        </Router>
      </ShoppingContext.Provider>
    </div>
  );
}

export default App;
