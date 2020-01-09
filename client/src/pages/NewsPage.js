import React from "react";

export const NewsPage = () => {
  return (
    <div>
      <h6>
        На данной странице вы можете создавать, просматривать и редактировать
        новости.
      </h6>
      <p>Заголовок</p>
      <textarea
        id="textarea1"
        placeholder="Краткое описание"
        className="materialize-textarea"
      />
      <p>Описание</p>
      <textarea
        id="textarea1"
        placeholder="Полное описание"
        className="materialize-textarea"
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input type="file" multiple />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            placeholder="Upload one or more files"
          />
        </div>
      </div>
    </div>
  );
};
