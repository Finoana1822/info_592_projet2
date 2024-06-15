import React, { useEffect, useState } from "react";
import "../../styles/home.scss";
import { folderData } from "../../fakeData/folder";
import { FolderType } from "../../@types/folder.type";
import Folder from "../../components/home/folder/folder";
import AddDocumentModal from "../../components/modals/addDocument.modal";

const Home: React.FC = () => {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<FolderType[]>([]);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);

  useEffect(() => {
    setFolders(folderData);
  }, []);

  const handleDeleteFolder = () => {
    const idsToRemoveSet = new Set(selectedFolders.map((folder) => folder.id));
    const filteredFolderData = folders.filter(
      (folder) => !idsToRemoveSet.has(folder.id)
    );
    setFolders(filteredFolderData);
    setSelectedFolders([]);
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
            <button type="button" className="btn btn-primary mr-2" onClick={handleShowAddDocumentModal}>
              <i className="ion ion-md-cloud-upload"></i>&nbsp; Upload
            </button>
          </div>
          {selectedFolders.length > 0 && (
            <div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={handleDeleteFolder}
                >
                  <i className="ion ion-md-trash"></i>&nbsp;{" "}
                  {`Delete${selectedFolders.length > 1 ? "s" : ""}`}
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
        {folders.map((folder: FolderType) => (
          <Folder
            folderItem={folder}
            key={folder.id}
            selectedFolders={selectedFolders}
            setSelectedFolders={setSelectedFolders}
          />
        ))}
      </div>

      {showAddDocumentModal && (
        <AddDocumentModal onClose={() => setShowAddDocumentModal(false)} />
      )}
    </div>
  );
};

export default Home;
