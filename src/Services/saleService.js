import {
  addDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
  uploadImage,
} from "./firestoreService";

export const saveSaleItem = async (item, price, description, image) => {
  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage("sales-images", image, item);
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

export const deleteSaleItem = async (id) => {
  return await deleteDocument("sales", id);
};

export const updateSaleItem = async (id, updatedData) => {
  return await updateDocument("sales", id, updatedData);
};
