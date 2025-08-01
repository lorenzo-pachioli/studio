import { db } from "./firebase";
import { ICartItem, IOrders, IUser } from "@/types";
import { collection, getDocs, getDoc, doc, setDoc, CollectionReference, DocumentData } from 'firebase/firestore/lite';

import { } from 'firebase/firestore/lite';


export async function getUserColection(coll: string): Promise<any[]> {
  const users = collection(db, coll);
  const usersList = await getDocs(users);
  const data = usersList.docs.map(doc => {
    return {
      name: doc.data().name,
      uid: doc.data().uid,
      username: doc.data().username,
      color: doc.data().color,
      photo: doc.data().photo
    }
  });
  return data;
}

export const getNullUser = (): IUser => {
  const newUser: IUser = {
    uid: "",
    displayName: "",
    photoURL: "",
    addresses: [],
    email: "",
    emailVerified: false,
    boughtProducts: [],
    boughtServices: []
  };
  return newUser;
}

export async function setData(coll: string, id: string, data: any) {
  const docRef = await setDoc(doc(db, coll, id), data);
  return docRef;
}

export async function getDataById(coll: string, id: string) {
  const docSnap = await getDoc(doc(db, coll, id));
  const data = docSnap.data();
  return data;
}

export async function getCollectionRef(coll: string): Promise<CollectionReference<DocumentData>> {
  const docRef = collection(db, coll);
  return docRef;
}

export async function getCollections(coll: string): Promise<any[]> {

  const docRef = collection(db, coll);
  const docList = await getDocs(docRef);
  return docList.docs.map(doc => ({ ...doc.data() }));
}

export async function getUserById(id: string): Promise<IUser> {
  const docSnap = await getDoc(doc(db, "users", id));
  const data = docSnap.data();
  if (data) {
    const newUser = {
      uid: data.uid,
      displayName: data.displayName, // Use provided name if available
      photoURL: data.photoURL || "",
      email: data.email,
      emailVerified: data.emailVerified || false,
      addresses: data.addresses || [],
      boughtProducts: data.boughtProducts || [],
      boughtServices: data.boughtServices || [],
    };
    return newUser;
  } else {
    return getNullUser();
  }
}

export async function getCartItemById(id: string): Promise<ICartItem> {
  const docSnap = await getDoc(doc(db, "cart_items", id));
  const data = docSnap.data() as ICartItem;
  return data;
}

export async function getOrderById(id: string): Promise<IOrders | null> {
  const docSnap = await getDoc(doc(db, "Orders", id));
  const data = docSnap.data() as IOrders;
  return data ? data : null;
}