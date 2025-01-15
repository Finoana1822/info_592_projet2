import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentType } from "../../@types/document.type";
import FileComponent from "../../components/home/file/file";
import { archiveDocument, deleteDocument, getDocuments } from "../../services/document.service";
import AddDocumentModal from "../../components/modals/addDocument.modal";

const File: React.FC = () => {
  const { id, folderName } = useParams<{ id: string; folderName: string }>();
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>([]);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const navigate = useNavigate();

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
      const docs = await getDocuments(userInfo.id);
      console.log("Documents received from API:", docs);
  
      // Filtrer les documents qui ont le bon parent_id ou sont à la racine (parent_id null)
      const filteredDocs = docs.filter((doc: DocumentType) => {
        return doc.parent_id === Number(id) || (doc.parent_id === null && doc.type === 'file');
      });
  
      console.log("Filtered documents:", filteredDocs);
      setDocuments(filteredDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  
  

  const handleArchiveDocuments = async () => {
    try {
      const idsToRemove = selectedDocuments.map((doc) => doc.id);
      await Promise.all(idsToRemove.map((id) => archiveDocument(id)));
      await fetchDocuments();
      setSelectedDocuments([]);
    } catch (error) {
      console.error("Error archiving documents:", error);
    }
  };

  const handleDeleteDocuments = async () => {
    try {
      const idsToRemoveSet = new Set(selectedDocuments.map((doc) => doc.id));
      await Promise.all(selectedDocuments.map((doc) => deleteDocument(doc.id)));
      const filteredDocuments = documents.filter((doc) => !idsToRemoveSet.has(doc.id));
      setDocuments(filteredDocuments);
      setSelectedDocuments([]);
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };

  const handleShowAddDocumentModal = () => {
    setShowAddDocumentModal(true);
  };

  return (
    <div className="container flex-grow-1 light-style container-p-y">
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
              <button
                type="button"
                className="btn btn-success mr-2"
                onClick={handleArchiveDocuments}
              >
                <i className="ion ion-md-archive"></i>&nbsp; Archiver
              </button>
              <button
                type="button"
                className="btn btn-danger mr-2"
                onClick={handleDeleteDocuments}
              >
                <i className="ion ion-md-delete"></i>&nbsp; Supprimer
              </button>
            </div>
          )}
        </div>

        <hr className="m-0" />
        <ol className="breadcrumb text-big container-p-x py-3 m-0">
          <li
            onClick={() => navigate("/")}
            className="breadcrumb-item active"
            style={{
              cursor: "pointer",
            }}
          >
            {`/${folderName}/`}
          </li>
        </ol>
      </div>

      <div className="file-manager-container file-manager-col-view justify-content-center">
        {documents.length > 0 ? (
          documents.map((doc: DocumentType) => (
            <FileComponent
              fileItem={doc}
              key={doc.id}
              selectedFiles={selectedDocuments}
              setSelectedFiles={setSelectedDocuments}
            />
          ))
        ) : (
          <div>No Document</div>
        )}
      </div>

      {showAddDocumentModal && (
        <AddDocumentModal 
          onClose={() => setShowAddDocumentModal(false)} 
          parentId={Number(id)} 
          addDocumentToList={(newDocument: DocumentType) => setDocuments([...documents, newDocument])} 
        />
      )}
    </div>
  );
};

export default File;