import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const saveSaleItem = async (item, price, description, image) => {
  try {
    let imageUrl = null;
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${item}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    const docRef = await addDoc(collection(db, "sales"), {
      item,
      price,
      description,
      image: imageUrl,
      createdAt: new Date(),
    });

    console.log("Säljobjekt sparat med ID:", docRef.id);
  } catch (error) {
    console.error("Ett fel uppstod när säljobjekt skulle sparas:", error);
  }
};
