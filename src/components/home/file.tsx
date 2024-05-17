import React from "react";

type FileProps = {
  name: string;
  dateOfCreation: Date;
  type: string;
};

const File: React.FC<FileProps> = (props) => {
  return (
    <div className="file-item">
      <div className="file-item-select-bg bg-primary"></div>
      <label className="file-item-checkbox custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" />
        <span className="custom-control-label"></span>
      </label>
      <div className="file-item-icon far fa-file-archive text-secondary"></div>
      {/* <div
            className="file-item-img"
            style={{
              backgroundImage:
                "url(https://bootdey.com/img/Content/avatar/avatar1.png)",
            }}
          ></div> */}
      <a href="javascript:void(0)" className="file-item-name">
        {props.name}
      </a>
    </div>
  );
};

export default File;
