import React, { useEffect, useRef, useState } from "react";
import { DocumentType } from "../../../@types/document.type";

type FileProps = {
  fileItem: DocumentType;
  selectedFiles: DocumentType[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<DocumentType[]>>;
};

const FileComponent: React.FC<FileProps> = ({
  fileItem,
  selectedFiles,
  setSelectedFiles,
}) => {
  const fileCard = useRef<HTMLDivElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [fileExtension, setFileExtension] = useState<string>("");

  useEffect(() => {
    setIsChecked(selectedFiles.some((doc) => doc.id === fileItem.id));
  }, [selectedFiles, fileItem.id]);

  useEffect(() => {
    if (fileItem.path) {
      const extension = fileItem.path.split('.').pop(); // Obtenir l'extension du fichier
      if (extension) {
        setFileExtension(extension);
      }
    }
  }, [fileItem.path]);

  const handleCheck = () => {
    if (!isChecked) {
      setSelectedFiles((prev) => [...prev, fileItem]);
    } else {
      setSelectedFiles((prev) =>
        prev.filter((doc) => doc.id !== fileItem.id)
      );
    }
  };

  return (
    <div
      className="file-item"
      ref={fileCard}
      onMouseEnter={() => {
        if (fileCard.current)
          fileCard.current.style.backgroundColor = "#ECECEC";
      }}
      onMouseLeave={() => {
        if (fileCard.current) fileCard.current.style.backgroundColor = "#fff";
      }}
    >
      <div className="file-item-select-bg bg-primary"></div>
      <label className="file-item-checkbox custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          onChange={handleCheck}
          checked={isChecked}
        />
        <span className="custom-control-label"></span>
      </label>
      <div className={`file-item-icon far fa-file-${fileExtension} text-secondary`}></div>
      <a href="#" className="file-item-name">
        {fileItem.name.split(".")[0]}
      </a>
    </div>
  );
};

export default FileComponent;