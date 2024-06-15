import { DocumentType } from "../@types/document.type";
import { instance } from "../api/axios.config";

// Get all documents
export const getDocuments = async (): Promise<DocumentType[]> => {
  try {
    const response = await instance.get<DocumentType[]>("/document");
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

// Get all archives
export const getArchives = async (): Promise<DocumentType[]> => {
  try {
    const response = await instance.get<DocumentType[]>("/document/arvhives");
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
export const updateDocument = async (documentId: number, document: Partial<DocumentType>): Promise<DocumentType> => {
  try {
    const response = await instance.put<DocumentType>(`/document/update/${documentId}`, document);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

// Delete document
export const deleteDocument = async (documentId: number): Promise<void> => {
  try {
    await instance.delete(`/document/delete/${documentId}`);
  } catch (error: any) {
    throw error.response;
  }
};
