import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {db} from "./firebase";
import { IUser } from "@/types";
import {collection, getDocs, getDoc, doc,  setDoc } from 'firebase/firestore/lite';
 

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

export const getUser = (id: string): IUser =>{
  const newUser: IUser = {
          uid: "1",
          displayName: "Jhon Doe",
          photoURL: "https://placehold.co/150x150.png",
          location: [],
          email: "jhon@gmail.com",
          emailVerified: true
      };
      return newUser;
}

export async function setData(coll: string, id: string, data: any){
  const docRef = await setDoc(doc(db, coll, id), data);
  return docRef;
}

export async function getDataById(coll: string, id: string){
  const docRef = await getDoc(doc(db, coll, id));
  const data = docRef.data();
  return data;
}