import {
  addDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
  uploadImage,
  deleteImage,
} from "./firestoreService";

export const saveNewsArticle = async (title, content, image) => {
  // Ta bort mellanslag osv
  const sanitizedTitle = title
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");

  // Unik timestamp på varje bildnamn
  const timeStamp = new Date().getTime();
  const imageName = `${sanitizedTitle}_${timeStamp}`;
  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage("news-images", image, imageName);
    }

    const newsData = {
      title,
      content,
      image: imageUrl,
      createdAt: new Date(),
    };

    const newsId = await addDocument("news", newsData);

    console.log("Nyhetsartikel sparat med ID:", newsId);
    return newsId;
  } catch (error) {
    console.error("Ett fel uppstod när köpobjekt skulle sparas:", error);
  }
};

export const getNewsArticles = async () => {
  return await getDocuments("news");
};

export const deleteNewsArticle = async (id, imageUrl) => {
  // Kolla om bild finns i objektet
  if (imageUrl) {
    await deleteImage(imageUrl);
  }
  return await deleteDocument("news", id);
};

export const updateNewsArticle = async (id, updatedData) => {
  return await updateDocument("news", id, updatedData);
};
