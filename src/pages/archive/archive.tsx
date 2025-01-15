import React, { useEffect, useState } from "react";
import "../../styles/home.scss";
import { DocumentType } from "../../@types/document.type";
import Folder from "../../components/home/folder/folder";
import FileComponent from "../../components/home/file/file";
import AddDocumentModal from "../../components/modals/addDocument.modal";
import {
  deleteDocument,
  getArchives,
} from "../../services/document.service";
import UpdateDocumentModal from "../../components/modals/updateDocument.modal";

const Archive: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>(
    []
  );
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [showUpdateDocumentModal, setShowUpdateDocumentModal] = useState(false);

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
    const userInfo = getUserInfo();
    if (!userInfo || !userInfo.id) {
      console.error("User ID not found");
      return;
    }

    try {
      const docs = await getArchives(userInfo.id);
      console.log("Fetched documents:", docs);
      setDocuments(docs);
    } catch (error) {
      console.error("Error fetching documents:", error);
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

  return (
    <div className="container flex-grow-1 light-style container-p-y">
      <div>Archives</div>
      <div className="container-m-nx container-m-ny bg-lightest mb-3">
        <hr className="m-0" />

        <div className="file-manager-actions container-p-x py-2">
          <div className="mb-1">
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={handleShowAddDocumentModal}
            >
              <i className="ion ion-md-cloud-upload"></i>&nbsp; Upload
            </button>
          </div>
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
        {documents.map((doc: DocumentType) =>
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
        )}
      </div>

      {showAddDocumentModal && (
        <AddDocumentModal 
          onClose={() => setShowAddDocumentModal(false)} 
          addDocumentToList={(newDocument: DocumentType) => setDocuments([...documents, newDocument])} 
        />
      )}

      {showUpdateDocumentModal && (
        <UpdateDocumentModal onClose={() => setShowAddDocumentModal(false)} />
      )}
    </div>
  );
};

export default Archive;
