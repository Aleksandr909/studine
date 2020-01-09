import React from "react";

export const HomePage = () => {
  return (
    <div>
      <h6>Работа с расписанием</h6>
      <button
        className="waves-effect waves-light btn blue"
        style={{ marginRight: 20 }}
      >
        Загрузить <i className="material-icons">cloud_download</i>
      </button>
      <button className="waves-effect waves-light btn red darken-4">
        Удалить <i className="material-icons">delete</i>
      </button>
    </div>
  );
};
