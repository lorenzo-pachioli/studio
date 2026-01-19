'use client';
import "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { setData, getDataById } from "./operations";
import { IUser } from "@/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { decrypt, deleteSession, verifySession } from "./statelessSession";

const provider = new GoogleAuthProvider();


const addUserToFirestore = async (user: IUser) => {

  const session = await verifySession();
  if (!session.isAuth) {
    return null;
  }
  const cookie = await decrypt(session.cookie);
  if (!cookie || !cookie.uid) {
    return null;
  }

  const userExist = await getDataById("Users", cookie.uid);
  if (!userExist) {
    await setData("Users", cookie.uid, user);
  }
};

export const createUser = async (email: string, password: string) => {


  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      return error;
    });
}

export default async function logInWithEmail(email: string, password: string) {


  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Login Error",
      description: "An error occurred while logging in with email.",
    });
  }
}

export const userAuth = async () => {

  try {
    const userCredentials = await signInWithPopup(auth, provider);

    const firebaseUser = userCredentials.user;
    const userToAdd: IUser = {
      uid: userCredentials.user.uid,
      displayName: firebaseUser.displayName || "",
      photoURL: firebaseUser.photoURL || "",
      addresses: [],
      email: firebaseUser.email || "",
      emailVerified: firebaseUser.emailVerified || false,
      boughtProducts: [],
      boughtServices: [],
      openCart: []
    };

    addUserToFirestore(userToAdd);
    return userCredentials.user;
  } catch (err: unknown) {
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: "An error occurred during authentication.",
    });
  }
};

export const loggedOut = async () => {
  deleteSession();
  signOut(auth);
};