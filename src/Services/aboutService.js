import { getDocumentById, updateDocument } from "./firestoreService";

const COLLECTION = "about";
const DOCUMENT_ID = "main";

export const getAboutInfo = async () => {
  return await getDocumentById(COLLECTION, DOCUMENT_ID);
};

export const updateAboutInfo = async (aboutText) => {
  return await updateDocument(COLLECTION, DOCUMENT_ID, { aboutus: aboutText });
};
