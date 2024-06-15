import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fileData } from "../../fakeData/file";
import { FileType } from "../../@types/file.type";
import FileComponent from "../../components/home/file/file";

const File: React.FC = () => {
  const { id, folderName } = useParams();
  const [files, setFiles] = useState<FileType[] | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const data = fileData.filter((file) => file.folder.id === +id);
      setFiles(data);
    }
  }, [id]);

  const handleDeleteFile = () => {
    if (files) {
      const idsToRemoveSet = new Set(selectedFiles.map((folder) => folder.id));
      const filteredFileData = files.filter(
        (file) => !idsToRemoveSet.has(file.id)
      );
      setFiles(filteredFileData);
      setSelectedFiles([]);
    }
  };

  return (
    <div className="container flex-grow-1 light-style container-p-y">
      <div className="container-m-nx container-m-ny bg-lightest mb-3">
        <hr className="m-0" />

        <div className="file-manager-actions container-p-x py-2">
          <div className="mb-1">
            <button type="button" className="btn btn-primary mr-2">
              <i className="ion ion-md-cloud-upload"></i>&nbsp; Upload
            </button>
          </div>
          {selectedFiles.length > 0 && (
            <div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={handleDeleteFile}
                >
                  <i className="ion ion-md-trash"></i>&nbsp;{" "}
                  {`Delete${selectedFiles.length > 1 ? "s" : ""}`}
                </button>
              </div>
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
          >{`/${folderName}/`}</li>
        </ol>
      </div>

      <div className="file-manager-container file-manager-col-view justify-content-center">
        {files?.length
          ? files?.map((file: FileType, index: number) => (
              <FileComponent
                fileItem={file}
                key={index}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            ))
          : 
          <div>
            No File
          </div>
          }
      </div>
    </div>
  );
};

export default File;
