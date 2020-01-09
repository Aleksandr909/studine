import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectHandler,
  discAddRow,
  discNamesHandler,
  discDeleteRow
} from "../store/actions/disciplines";
import { groupSave } from "../store/actions/localStorage";

export const DisciplinesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.M.AutoInit();
  });
  const groups = useSelector(state => state.app.groups);
  const selectedGroupIndex = useSelector(
    state => state.app.disciplinesSelectedGroup
  );
  const selectedGroupValue = groups[selectedGroupIndex];

  return (
    <div>
      <h6>
        После ввода списка групп на специальное странице на данной странице
        необходимо ввести список дисциплин у каждой группы. Дисциплины могут
        автоматически добавляться после добавления расписания.
      </h6>
      <div className="input-field col s12">
        <select
          defaultValue="0"
          onChange={event => dispatch(selectHandler(event.target.value))}
        >
          <option value="" disabled>
            Выберите группу
          </option>
          {groups.map((elem, index) => (
            <option key={elem.name + index} value={index}>
              {elem.name}
            </option>
          ))}
        </select>
        <label>Выберите группу</label>
      </div>
      <div>
        <p>Дисциплины</p>
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>Дисциплина</td>
              <td>Количество часов</td>
              <td>Удалить</td>
            </tr>
          </thead>
          <tbody id="group_table">
            {selectedGroupValue.disciplines.map((elem, index) => (
              <tr key={`tr+${index}`}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    name="Name"
                    value={elem.name}
                    onChange={event =>
                      dispatch(
                        discNamesHandler(
                          event,
                          index,
                          selectedGroupIndex,
                          groups
                        )
                      )
                    }
                  ></input>
                </td>
                <td>
                  <input
                    type="number"
                    name="Hours"
                    value={elem.hours}
                    onChange={event =>
                      dispatch(
                        discNamesHandler(
                          event,
                          index,
                          selectedGroupIndex,
                          groups
                        )
                      )
                    }
                  ></input>
                </td>
                <td
                  className="btn-floating btn-small waves-effect waves-light red center"
                  style={{ marginTop: 20 }}
                  onClick={() =>
                    dispatch(discDeleteRow(index, selectedGroupIndex, groups))
                  }
                >
                  <i className="material-icons">remove</i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => dispatch(discAddRow(groups, selectedGroupIndex))}
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
    </div>
  );
};
