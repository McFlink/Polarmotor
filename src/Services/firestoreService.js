import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

// iamgeUrl:en innehåller metadata och tokens också.
export const deleteImage = async (imageUrl) => {
  const storage = getStorage(); // SKapar en instans av Storage-tjänsten. Hämta referens till firebase storage-tjänsten.
  const imageRef = ref(storage, imageUrl); // Skapa referens till den specifika filen.
  await deleteObject(imageRef);
};
