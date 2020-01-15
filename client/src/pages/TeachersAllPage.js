import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  teachersAllAddRow,
  teachersAllDeleteRow,
  teachersAllNamesHandler
} from "../store/actions/teachersAll";
import { teachersSave } from "../store/actions/localStorage";

export const TeachersAllPage = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const dispatch = useDispatch();
  const teachersAll = useSelector(state => state.app.teachers);

  return (
    <div>
      <h6>На данной странице вы можете добавлять или изменять аудитории.</h6>
      <div>
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>ФИО</td>
              <td>Основная дисциплина</td>
            </tr>
          </thead>
          <tbody id="group_table">
            {teachersAll.map((teacher, teacherIndex) => (
              <tr key={`tr+${teacherIndex}`}>
                <td>{teacherIndex + 1}</td>
                <td>
                  <input
                    type="text"
                    name="Name"
                    value={teacher.name}
                    onChange={event =>
                      dispatch(
                        teachersAllNamesHandler(
                          event,
                          teacherIndex,
                          teachersAll
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="MainLesson"
                    value={teacher.mainLesson}
                    onChange={event =>
                      dispatch(
                        teachersAllNamesHandler(
                          event,
                          teacherIndex,
                          teachersAll
                        )
                      )
                    }
                  />
                </td>
                <td
                  className="btn-floating btn-small waves-effect waves-light red center"
                  style={{ marginTop: 20 }}
                  onClick={() =>
                    dispatch(teachersAllDeleteRow(teacherIndex, teachersAll))
                  }
                >
                  <i className="material-icons">remove</i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => dispatch(teachersAllAddRow(teachersAll))}
        className="waves-effect waves-light btn"
        style={{ marginRight: 10 }}
        id="new_line"
        name="button"
      >
        <i className="material-icons">add</i>
      </button>
      <button
        onClick={() => dispatch(teachersSave(teachersAll))}
        className="waves-effect waves-light btn"
        id="add"
        name="button"
      >
        Сохранить <i className="material-icons">cloud_download</i>
      </button>
    </div>
  );
};
