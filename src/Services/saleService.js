import {
  addDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
  uploadImage,
  deleteImage,
} from "./firestoreService";

export const saveSaleItem = async (item, price, description, image) => {
  // Ta bort mellanslag osv
  const sanitizedItem = item
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");

  // Unik timestamp på varje bildnamn
  const timeStamp = new Date().getTime();
  const imageName = `${sanitizedItem}_${timeStamp}`;

  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage("sales-images", image, imageName);
    }

    const saleData = {
      item,
      price,
      description,
      image: imageUrl,
      createdAt: new Date(),
    };

    const saleId = await addDocument("sales", saleData);

    console.log("Säljobjekt sparat med ID:", saleId);
    return saleId;
  } catch (error) {
    console.error("Ett fel uppstod när säljobjekt skulle sparas:", error);
  }
};

export const getSaleItems = async () => {
  return await getDocuments("sales");
};

export const deleteSaleItem = async (id, imageUrl) => {
  // Kolla om bild finns i objektet
  if (imageUrl) {
    await deleteImage(imageUrl);
  }
  return await deleteDocument("sales", id);
};

export const updateSaleItem = async (id, updatedData) => {
  return await updateDocument("sales", id, updatedData);
};
