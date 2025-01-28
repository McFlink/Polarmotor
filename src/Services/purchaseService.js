import {
  addDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
  uploadImage,
  deleteImage,
} from "./firestoreService";

export const savePurchaseItem = async (item, description, image) => {
  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage("purchase-images", image, item);
    }

    const purchaseData = {
      item,
      description,
      image: imageUrl,
      createdAt: new Date(),
    };

    const purchaseId = await addDocument("purchases", purchaseData);

    console.log("Köpobjekt sparat med ID:", purchaseId);
    return purchaseId;
  } catch (error) {
    console.error("Ett fel uppstod när köpobjekt skulle sparas:", error);
  }
};

export const getPurchaseItems = async () => {
  return await getDocuments("purchases");
};

export const deletePurchaseItem = async (id, imageUrl) => {
  // Kolla om bild finns i objektet
  if (imageUrl) {
    await deleteImage(imageUrl);
  }
  return await deleteDocument("purchases", id);
};

export const updatePurchaseItem = async (id, updatedData) => {
  return await updateDocument("purchases", id, updatedData);
};
