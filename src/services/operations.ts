import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {db} from "./firebase";
import { IUser } from "@/types";
import {collection, getDocs, getDoc, doc,  setDoc, CollectionReference, DocumentData  } from 'firebase/firestore/lite';

import {  } from 'firebase/firestore/lite';
 

export async function getUserColection(coll: string): Promise<any[]> {
  const users = collection(db, coll);
  const usersList = await getDocs(users);
  const data = usersList.docs.map(doc => {return {
    name:doc.data().name,
    uid:doc.data().uid,
    username:doc.data().username,
    color:doc.data().color, 
    photo:doc.data().photo
  }});
  return data;
}


const auth = getAuth();

export const getNullUser = (): IUser =>{
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

export async function setData(coll: string, id: string, data: any){
  const docRef = await setDoc(doc(db, coll, id), data);
  return docRef;
}

export async function getDataById(coll: string, id: string){
  const docSnap = await getDoc(doc(db, coll, id));
  const data = docSnap.data();
  return data;
}

export async function getCollectionRef(coll: string): Promise<CollectionReference<DocumentData>> {
  const docRef = collection(db, coll);
  return docRef;
}

export async function getCollections(coll:string): Promise<any[]> {
    
  const docRef = collection(db, coll);
  const docList = await getDocs(docRef);
  return docList.docs.map(doc => ({ ...doc.data() }));
}
