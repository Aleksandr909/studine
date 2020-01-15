import React from "react";
import { handleFileSelect } from "../store/actions/fileWorker";

export const HomePage = () => {
  return (
    <div>
      <h6>Работа с расписанием</h6>
      <div className="file-field input-field" style={{ marginRight: 20 }}>
        <div className="waves-effect btn waves-light blue">
          Загрузить <i className="material-icons">cloud_download</i>
          <input type="file" onChange={event => handleFileSelect(event)} />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            placeholder="Upload one or more files"
          />
        </div>
      </div>
      <button className="waves-effect waves-light btn red darken-4">
        Удалить <i className="material-icons">delete</i>
      </button>
    </div>
  );
};
