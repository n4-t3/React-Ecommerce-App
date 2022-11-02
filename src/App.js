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
import db, {createUserProfileDocument} from './firebase/firebase.utils';
import { collection, getDocs, addDoc, doc } from 'firebase/firestore';

export const ShoppingContext = createContext()

function App() {
  const [data, setData] = useState(array)
  const [user, setUser] = useState(null)
  const [firebaseData, setFirebaseData] = useState(null)
  const usersCollectionRef = collection(db, "users")

  useEffect(() => {
    const auth = getAuth();
    const authentication = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null)
      createUserProfileDocument(user)
    })
    return authentication
  }, [])

  return (
    <div className="App">
      <ShoppingContext.Provider value={{ data, setData, user }}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/shop/" element={<Shop />} />
            <Route exact path="/shop/:slug/" element={<ChosenShoppingPage />} />
            <Route exact path="/cart/" element={<CartPage />} />
          </Routes>
        </Router>
      </ShoppingContext.Provider>
    </div>
  );
}

export default App;
