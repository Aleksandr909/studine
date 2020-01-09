import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupsNamesHandler, deleteRow, addRow } from "../store/actions/groups";
import { groupSave } from "../store/actions/localStorage";

export const GroupsPage = () => {
  let groups = useSelector(state => state.app.groups);
  const dispatch = useDispatch();

  return (
    <div>
      <h6>Список групп, обучаемых в учебном заведении.</h6>
      <table>
        <thead>
          <tr>
            <td>№</td>
            <td>Имя группы</td>
            <td>Начало учебного семестра</td>
            <td>Удалить</td>
          </tr>
        </thead>
        <tbody id="group_table">
          {groups.map((elem, index) => (
            <tr key={`tr+${index}`}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="Name"
                  value={elem.name}
                  onChange={event =>
                    dispatch(groupsNamesHandler(event, index, groups))
                  }
                ></input>
              </td>
              <td>
                <input
                  type="date"
                  name="Date"
                  value={elem.date}
                  onChange={event =>
                    dispatch(groupsNamesHandler(event, index, groups))
                  }
                ></input>
              </td>
              <td
                className="btn-floating btn-small waves-effect waves-light red center"
                style={{ marginTop: 20 }}
                onClick={() => dispatch(deleteRow(index, groups))}
              >
                <i className="material-icons">remove</i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => dispatch(addRow(groups))}
        className="waves-effect waves-light btn"
        style={{ marginRight: 10 }}
        id="new_line"
        name="button"
      >
        <i className="material-icons">add</i>
      </button>
      <button
        onClick={() => dispatch(groupSave(groups))}
        className="waves-effect waves-light btn"
        id="add"
        name="button"
      >
        Сохранить <i className="material-icons">cloud_download</i>
      </button>
    </div>
  );
};
