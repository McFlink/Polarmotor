import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Add to database
export const addDocument = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
};

// Get all documents from database
export const getDocuments = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update document in database
export const updateDocument = async (collectionName, id, updatedData) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, updatedData);
};

// Delete document from database
export const deleteDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

// Upload image to storage
export const uploadImage = async (folder, Image, imageName) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${folder}/${imageName}`);
  await uploadBytes(storageRef, Image);
  return await getDownloadURL(storageRef);
};

// try {
//   let imageUrl = null;
//   if (image) {
//     const storage = getStorage();
//     const storageRef = ref(storage, `images/${item}`);
//     await uploadBytes(storageRef, image);
//     imageUrl = await getDownloadURL(storageRef);
//   }

//   const docRef = await addDoc(collection(db, "sales"), {
//     item,
//     price,
//     description,
//     image: imageUrl,
//     createdAt: new Date(),
//   });

//   console.log("Säljobjekt sparat med ID:", docRef.id);
// } catch (error) {
//   console.error("Ett fel uppstod när säljobjekt skulle sparas:", error);
// }
