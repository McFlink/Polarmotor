import { getDocumentById, updateDocument } from "./firestoreService";

export const getContactInfo = async () => {
  return await getDocumentById("contact", "main");
};

export const updateContactInfo = async (updatedData) => {
  return await updateDocument("contact", "main", updatedData);
};
