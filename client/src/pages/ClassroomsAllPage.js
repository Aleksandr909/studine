import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  classroomsAllAddRow,
  classroomsAllDeleteRow,
  classroomsAllNamesHandler
} from "../store/actions/classroomsAll";
import { classroomsSave } from "../store/actions/localStorage";

export const ClassroomsAllPage = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const dispatch = useDispatch();
  const classroomsAll = useSelector(state => state.app.classrooms);

  return (
    <div>
      <h6>На данной странице вы можете добавлять или изменять аудитории.</h6>
      <div>
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>№ Аудитории</td>
              <td>Вместимость</td>
              <td>Основная дисциплина</td>
            </tr>
          </thead>
          <tbody id="group_table">
            {classroomsAll.map((classroom, classroomIndex) => (
              <tr key={`tr+${classroomIndex}`}>
                <td>{classroomIndex + 1}</td>
                <td>
                  <input
                    type="text"
                    id="number"
                    name="Name"
                    value={classroom.name}
                    onChange={event =>
                      dispatch(
                        classroomsAllNamesHandler(
                          event,
                          classroomIndex,
                          classroomsAll
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="MaxPeople"
                    value={classroom.maxPeople}
                    onChange={event =>
                      dispatch(
                        classroomsAllNamesHandler(
                          event,
                          classroomIndex,
                          classroomsAll
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="MainLesson"
                    value={classroom.mainLesson}
                    onChange={event =>
                      dispatch(
                        classroomsAllNamesHandler(
                          event,
                          classroomIndex,
                          classroomsAll
                        )
                      )
                    }
                  />
                </td>
                <td
                  className="btn-floating btn-small waves-effect waves-light red center"
                  style={{ marginTop: 20 }}
                  onClick={() =>
                    dispatch(
                      classroomsAllDeleteRow(classroomIndex, classroomsAll)
                    )
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
        onClick={() => dispatch(classroomsAllAddRow(classroomsAll))}
        className="waves-effect waves-light btn"
        style={{ marginRight: 10 }}
        id="new_line"
        name="button"
      >
        <i className="material-icons">add</i>
      </button>
      <button
        onClick={() => dispatch(classroomsSave(classroomsAll))}
        className="waves-effect waves-light btn"
        id="add"
        name="button"
      >
        Сохранить <i className="material-icons">cloud_download</i>
      </button>
    </div>
  );
};
