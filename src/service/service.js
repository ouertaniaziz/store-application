import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { signOut } from "firebase/auth";
export const addData = async (collectionData, collectionName) => {
  try {
    const data = await addDoc(collection(db, collectionName), collectionData);
    console.log("Document written with ID: ", data.id);
  } catch (error) {
    console.log("🚀 ~ file: signUp.jsx:54 ~ addData ~ error:", error);
  }
};

export const addDataWithCustomizedId = async (id, data) => {
  const docRef = doc(db, "user", id);
  await setDoc(docRef, data);

};
export const getDataWithCustomizedId = async (id) => {
  const docRef = doc(db, "user", id);
  const dataC = await getDoc(docRef);
  if (dataC.exists()) {
    return dataC.data();
  } else {
    return null;
  }
};
export const userSignOut = async (auth) => {
  await signOut(auth)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });
};
