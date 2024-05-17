import React, { useEffect, useRef, useState } from "react";
import { FileType } from "../../@types/file.type";

type FileProps = {
  fileItem: FileType;
  selectedFiles: FileType[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
};

const FileComponent: React.FC<FileProps> = ({
  fileItem,
  selectedFiles,
  setSelectedFiles,
}) => {
  const fileCard = useRef<HTMLDivElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(selectedFiles.some((folder) => folder.id === fileItem.id));
  }, [selectedFiles, fileItem.id]);

  const handleCheck = () => {
    if (!isChecked) {
      setSelectedFiles((prev) => [...prev, fileItem]);
    } else {
      setSelectedFiles((prev) =>
        prev.filter((file) => file.id !== fileItem.id)
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
      <div className={`file-item-icon far fa-file-${fileItem.file.split('.')[1]} text-secondary`}></div>
      {/* <div
            className="file-item-img"
            style={{
              backgroundImage:
                "url(https://bootdey.com/img/Content/avatar/avatar1.png)",
            }}
          ></div> */}
      <a href="#" className="file-item-name">
        {fileItem.file.split(".")[0]}
      </a>
    </div>
  );
};

export default FileComponent;
