import React, { useEffect, useRef, useState } from "react";
import { FolderType } from "../../@types/folder.type";
import { useNavigate } from "react-router-dom";

type FolderProps = {
  folderItem: FolderType;
  selectedFolders: FolderType[];
  setSelectedFolders: React.Dispatch<React.SetStateAction<FolderType[]>>;
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
    setIsChecked(selectedFolders.some((folder) => folder.id === folderItem.id));
  }, [selectedFolders, folderItem.id]);

  const handleCheck = () => {
    if (!isChecked) {
      setSelectedFolders((prev) => [...prev, folderItem]);
    } else {
      setSelectedFolders((prev) =>
        prev.filter((folder) => folder.id !== folderItem.id)
      );
    }
  };

  return (
    <div
      className="file-item"
      ref={folderCard}
      onClick={() => navigate(`/${folderItem.id}/${folderItem.name}`)}
      onMouseEnter={() => {
        if (folderCard.current)
          folderCard.current.style.backgroundColor = "#ECECEC";
      }}
      onMouseLeave={() => {
        if (folderCard.current)
          folderCard.current.style.backgroundColor = "#fff";
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
      <div className="file-item-icon far fa-folder text-secondary"></div>
      <a href="#" className="file-item-name">
        {folderItem.name}
      </a>
    </div>
  );
};

export default Folder;
