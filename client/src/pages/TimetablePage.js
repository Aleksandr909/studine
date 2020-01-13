import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHandler } from "../store/actions/disciplines";
import { groupSave } from "../store/actions/localStorage";
import {
  timetableDeleteRow,
  timetableNamesHandler
} from "../store/actions/timetable";

export const TimetablePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.M.AutoInit();
  });
  const groups = useSelector(state => state.app.groups);
  const selectedGroupIndex = useSelector(
    state => state.app.disciplinesSelectedGroup
  );
  const selectedGroupValue = groups[selectedGroupIndex];

  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ];

  return (
    <div>
      <h6>
        На данной странице вы можете вручную внести расписание и оно
        автоматически обновится в приложении.
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
        <p>Расписание</p>
        {selectedGroupValue.timetable.map((day, dayIndex) => (
          <div key={`day${day}dayIndex${dayIndex}`}>
            <p style={{ marginTop: 40 }}>{days[dayIndex]}</p>
            <table>
              <thead>
                <tr>
                  <td>№</td>
                  <td>Дисциплина</td>
                  <td>Преподаватель</td>
                  <td>Аудитория</td>
                  <td>Удалить</td>
                </tr>
              </thead>
              <tbody id="group_table">
                {day.map((lesson, lessonIndex) => (
                  <tr key={`tr+${lessonIndex}`}>
                    <td>{lessonIndex + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="Name"
                        value={lesson.name}
                        onChange={event =>
                          dispatch(
                            timetableNamesHandler(
                              event,
                              dayIndex,
                              lessonIndex,
                              selectedGroupIndex,
                              groups
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Teacher"
                        value={lesson.teacher}
                        onChange={event =>
                          dispatch(
                            timetableNamesHandler(
                              event,
                              dayIndex,
                              lessonIndex,
                              selectedGroupIndex,
                              groups
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="Classroom"
                        value={lesson.classroom}
                        onChange={event =>
                          dispatch(
                            timetableNamesHandler(
                              event,
                              dayIndex,
                              lessonIndex,
                              selectedGroupIndex,
                              groups
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
                          timetableDeleteRow(
                            lessonIndex,
                            dayIndex,
                            selectedGroupIndex,
                            groups
                          )
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
        ))}
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
