import React, { useEffect, useState } from "react";
import "../../styles/home.scss";
import { DocumentType } from "../../@types/document.type";
import Folder from "../../components/home/folder/folder";
import FileComponent from "../../components/home/file/file";
import AddDocumentModal from "../../components/modals/addDocument.modal";
import UpdateDocumentModal from "../../components/modals/updateDocument.modal";
import {
  getDocuments,
  archiveDocument,
  deleteDocument,
} from "../../services/document.service";

const Home: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>([]);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [showUpdateDocumentModal, setShowUpdateDocumentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = () => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      return JSON.parse(userInfoString);
    }
    return null;
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setIsLoading(true);
    const userInfo = getUserInfo();
    if (!userInfo || !userInfo.id) {
      console.error("User ID not found");
      setIsLoading(false);
      return;
    }

    try {
      const docs = await getDocuments(userInfo.id);
      console.log("Fetched documents:", docs);
      setDocuments(docs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchiveDocuments = async () => {
    try {
      const idsToRemove = selectedDocuments.map((doc) => doc.id);
      await Promise.all(idsToRemove.map((id) => archiveDocument(id)));
      await fetchDocuments(); // Rafraîchir les documents après l'archivage
      setSelectedDocuments([]);
    } catch (error) {
      console.error("Error archiving documents:", error);
    }
  };

  const handleDeleteDocuments = async () => {
    try {
      const idsToRemoveSet = new Set(selectedDocuments.map((doc) => doc.id));
      await Promise.all(selectedDocuments.map((doc) => deleteDocument(doc.id)));
      const filteredDocuments = documents.filter(
        (doc) => !idsToRemoveSet.has(doc.id)
      );
      setDocuments(filteredDocuments);
      setSelectedDocuments([]);
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };

  const handleShowAddDocumentModal = () => {
    setShowAddDocumentModal(true);
  };

  const handleShowUpdateDocumentModal = () => {
    setShowUpdateDocumentModal(true);
  };

  const addDocumentToList = (newDocument: DocumentType) => {
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
  };

  return (
    <div className="container flex-grow-1 light-style container-p-y">
      <div>Documents</div>
      <div className="container-m-nx container-m-ny bg-lightest mb-3">
        <hr className="m-0" />

        <div className="file-manager-actions container-p-x py-2">
          <div className="mb-1">
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={handleShowAddDocumentModal}
              title="addDocument"
            >
              <i className="ion ion-md-cloud-upload"></i>&nbsp; Upload
            </button>
          </div>
          {selectedDocuments.length > 0 && (
            <div>
              <div>
                <button
                  type="button"
                  className="btn btn-success mr-2"
                  onClick={handleArchiveDocuments}
                >
                  <i className="ion ion-md-archive"></i>&nbsp;{" "}
                  {`Archiver${selectedDocuments.length > 1 ? "s" : ""}`}
                </button>
              </div>
            </div>
          )}
          {selectedDocuments.length > 0 && (
            <div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={handleDeleteDocuments}
                >
                  <i className="ion ion-md-delete"></i>&nbsp;{" "}
                  {`Supprimer${selectedDocuments.length > 1 ? "s" : ""}`}
                </button>
              </div>
            </div>
          )}
          {selectedDocuments.length > 0 && (
            <div>
              <div>
                <button
                  type="button"
                  className="btn btn-success mr-2"
                  onClick={handleShowUpdateDocumentModal}
                >
                  <i className="ion ion-md-edit"></i>&nbsp;{" "}
                  {`Modifier${selectedDocuments.length > 1 ? "s" : ""}`}
                </button>
              </div>
            </div>
          )}
        </div>

        <hr className="m-0" />
        <ol className="breadcrumb text-big container-p-x py-3 m-0">
          <li className="breadcrumb-item active">/</li>
        </ol>
      </div>

      <div className="file-manager-container file-manager-col-view justify-content-center">
        {isLoading ? (
          <div className="loading-message">Chargement...</div>
        ) : (
          documents.map((doc: DocumentType) =>
            doc.type === "folder" ? (
              <Folder
                folderItem={doc}
                key={doc.id}
                selectedFolders={selectedDocuments}
                setSelectedFolders={setSelectedDocuments}
              />
            ) : (
              <FileComponent
                fileItem={doc}
                key={doc.id}
                selectedFiles={selectedDocuments}
                setSelectedFiles={setSelectedDocuments}
              />
            )
          )
        )}
      </div>

      {showAddDocumentModal && (
        <AddDocumentModal
          onClose={() => setShowAddDocumentModal(false)}
          addDocumentToList={addDocumentToList} // Passer la fonction pour mettre à jour la liste des documents
        />
      )}

      {showUpdateDocumentModal && (
        <UpdateDocumentModal
          onClose={() => setShowUpdateDocumentModal(false)}
        />
      )}
    </div>
  );
};

export default Home;