import React, { useEffect, useRef, useState } from "react";
import { DocumentType } from "../../../@types/document.type";
import { useNavigate } from "react-router-dom";

type FolderProps = {
  folderItem: DocumentType;
  selectedFolders: DocumentType[];
  setSelectedFolders: React.Dispatch<React.SetStateAction<DocumentType[]>>;
};

const Folder: React.FC<FolderProps> = ({
  folderItem,
  selectedFolders,
  setSelectedFolders,
}) => {
  const folderCard = useRef<HTMLDivElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsChecked(selectedFolders.some((doc) => doc.id === folderItem.id));
  }, [selectedFolders, folderItem.id]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (!isChecked) {
      setSelectedFolders((prev) => [...prev, folderItem]);
    } else {
      setSelectedFolders((prev) =>
        prev.filter((doc) => doc.id !== folderItem.id)
      );
    }
  };

  return (
    <div
      className="file-item"
      ref={folderCard}
      onMouseEnter={() => {
        if (folderCard.current)
          folderCard.current.style.backgroundColor = "#ECECEC";
      }}
      onMouseLeave={() => {
        if (folderCard.current)
          folderCard.current.style.backgroundColor = "#fff";
      }}
      onClick={() => {
        navigate(`/${folderItem.id}/${folderItem.name}`);
      }}
    >
      <div className="file-item-select-bg bg-primary"></div>
      <label
        className="file-item-checkbox custom-control custom-checkbox"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="custom-control-input"
          onChange={handleCheck}
          checked={isChecked}
        />
        <span className="custom-control-label"></span>
      </label>
      <div className="file-item-icon far fa-folder text-secondary"></div>
      <a href="#" className="file-item-name">
        {folderItem.name}
      </a>
    </div>
  );
};

export default Folder;