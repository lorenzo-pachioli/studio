'use client';
import "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword  } from "firebase/auth";
import {setData, getDataById} from "./operations";
import { IUser } from "@/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";

const provider = new GoogleAuthProvider();


const addUserToFirestore = async (user:IUser) => {
    
    const {uid} = user;
    const userExist = await getDataById("Users", uid);
    if (!userExist) {
      await setData("Users", uid, user);
    }
};

export const createUser = async (email:string, password:string) => {
  

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user;
  })
  .catch((error) => {
    return error;
  });
}

export default async function logInWithEmail (email: string, password: string) {

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user.displayName);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error logging in with email:", error);
    throw error;
  }
}

export const userAuth =  async () =>{

  try {
    const userCredentials = await signInWithPopup(auth, provider);

      const firebaseUser = userCredentials.user;
      const userToAdd: IUser = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || "",
        location: [], 
        email: firebaseUser.email || "",
        emailVerified: firebaseUser.emailVerified
    };
      
    addUserToFirestore(userToAdd);
    return userCredentials.user;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
};
    
export const loggedOut = async () => {
   signOut(auth);
};