import { DocumentType } from "../@types/document.type";
import { instance } from "../api/axios.config";

// Get all documents
export const getDocuments = async (userId: number): Promise<DocumentType[]> => {
  try {
    const response = await instance.get<DocumentType[]>(`/document?user_id=${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching documents:", error);
    throw error.response;
  }
};

// Get document by id
export const getDocumentById = async (id: number): Promise<DocumentType[]> => {
  try {
    const response = await instance.get<DocumentType[]>(`/document/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching documents:", error);
    throw error.response;
  }
};

// Get all archives
export const getArchives = async (userId: number): Promise<DocumentType[]> => {
  try {
    const response = await instance.get<DocumentType[]>(`/document/arvhives?user_id=${userId}`); 
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

// Create new document
export const createDocument = async (formData: FormData): Promise<DocumentType> => {
  try {
    const response = await instance.post<DocumentType>("/document/create", formData);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

// Clone document
export const cloneDocument = async (documentId: number): Promise<DocumentType> => {
  try {
    const response = await instance.post<DocumentType>(`/document/clone/${documentId}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

// Update document
export const updateDocument = async (documentId: number, formData: FormData): Promise<DocumentType> => {
  try {
    const response = await instance.put<DocumentType>(`/document/update/${documentId}`, formData);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

// Archive document
export const archiveDocument = async (documentId: number): Promise<void> => {
  try {
    await instance.delete(`/document/delete/${documentId}`);
  } catch (error: any) {
    throw error.response;
  }
};

// delete document
export const deleteDocument = async (documentId: number): Promise<void> => {
  try {
    await instance.delete(`/document/suppr-definitive/${documentId}`);
  } catch (error: any) {
    throw error.response;
  }
};
