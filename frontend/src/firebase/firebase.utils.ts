import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBRB1IFgomJVqqivA-bPAIW2-oQ6FYQadM",
  authDomain: "react-ecomerce-app-beb21.firebaseapp.com",
  projectId: "react-ecomerce-app-beb21",
  storageBucket: "react-ecomerce-app-beb21.appspot.com",
  messagingSenderId: "707004291621",
  appId: "1:707004291621:web:6bb1667f7da62e1d35fdcc",
};

interface Element {
  id: number;
  name: string;
  imgSrc: string;
  price: number;
}

interface UserAuth {
  email: string;
  displayName: string;
  uid: string;
}
const app = initializeApp(config);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOutWithGoogle = () => signOut(auth);

export const addCartToCloud = async (uid: string) => {
  if (localStorage.getItem("cart")) {
    const localCart = JSON.parse(localStorage.getItem("cart")!);
    const userDataRef = doc(db, "users", `${uid}`);
    await updateDoc(userDataRef, {
      cartItem: arrayUnion(...localCart),
    });
    localStorage.removeItem("cart");
  }
};

export const addCartElementToCloud = async (
  uid: string,
  element: Element[]
) => {
  const userDataRef = doc(db, "users", `${uid}`);
  await updateDoc(userDataRef, {
    cartItem: arrayUnion(...element),
  });
};

export const removeCartElementFromCloud = async (
  uid: string,
  element: Element[]
) => {
  const userDataRef = doc(db, "users", `${uid}`);
  await updateDoc(userDataRef, {
    cartItem: arrayRemove(...element),
  });
};

export const addBoughtToCloud = async (uid: string, items: Element[]) => {
  const userDataRef = doc(db, "users", `${uid}`);
  await updateDoc(userDataRef, {
    boughtItem: arrayUnion(...items),
  });
};

export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, "users", `${uid}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const createUserProfileDocument = async (
  userAuth: UserAuth | null,
  AdditionalData = { cartItem: [], boughtItem: [] }
) => {
  if (!userAuth) return;
  const docRef = doc(db, "users", `${userAuth.uid}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    addCartToCloud(userAuth.uid);
    return docSnap.data();
  } else {
    const { email, displayName, uid } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(doc(db, "users", `${userAuth.uid}`), {
        uid,
        email,
        displayName,
        createdAt,
        ...AdditionalData,
      });
      addCartToCloud(userAuth.uid);
      return { email, displayName, createdAt, ...AdditionalData };
    } catch (error: any) {
      console.log("error creating user", error.message);
    }
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
export default db;
