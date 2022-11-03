import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

const config = {
    apiKey: `${process.env.REACT_APP_apiKey}`,
    authDomain: `${process.env.REACT_APP_authDomain}`,
    projectId: `${process.env.REACT_APP_projectId}`,
    storageBucket: `${process.env.REACT_APP_storageBucket}`,
    messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
    appId: `${process.env.REACT_APP_appId}`
}

const app = initializeApp(config)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider)
export const signOutWithGoogle = () => signOut(auth)

export const addCartToCloud = async (uid) => {
    if (localStorage.getItem('cart')) {
        const localCart = JSON.parse(localStorage.getItem('cart'))
        const userDataRef = doc(db, "users", `${uid}`);
        await updateDoc(userDataRef, {
            cartItem: arrayUnion(...localCart)
        });
        localStorage.removeItem('cart')
    }
}

export const addCartElementToCloud = async (uid, element) => {
    const userDataRef = doc(db, "users", `${uid}`);
    await updateDoc(userDataRef, {
        cartItem: arrayUnion(...element)
    });
}

export const removeCartElementFromCloud = async (uid, element) => {
    const userDataRef = doc(db, "users", `${uid}`);
    await updateDoc(userDataRef, {
        cartItem: arrayRemove(...element)
    });
}

export const addBoughtToCloud = async (uid, items) => {
    const userDataRef = doc(db, "users", `${uid}`);
    await updateDoc(userDataRef, {
        boughtItem: arrayUnion(...items)
    });
}

export const getUserProfile = async (uid) => {
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
}

export const createUserProfileDocument = async (userAuth, AdditionalData = { cartItem: [], boughtItem: [] }) => {
    if (!userAuth) return;
    const docRef = doc(db, "users", `${userAuth.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        addCartToCloud(userAuth.uid)
        return docSnap.data()
    } else {
        const { email, displayName, uid } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(doc(db, "users", `${userAuth.uid}`), { uid, email, displayName, createdAt, ...AdditionalData })
            addCartToCloud(userAuth.uid)
            return { email, displayName, createdAt, ...AdditionalData }
        } catch (error) {
            console.log('error creating user', error.message)
        }
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
export default db