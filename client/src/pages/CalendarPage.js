import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHandler } from "../store/actions/disciplines";
import { groupsChangesSave } from "../store/actions/localStorage";
import {
  calendarAddRow,
  calendarDeleteRow,
  calendarNamesHandler,
  dateSelectHandler
} from "../store/actions/calendar";

export const CalendarPage = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const dispatch = useDispatch();
  let groups = useSelector(state => state.app.groups);
  const selectedGroupIndex = useSelector(
    state => state.app.disciplinesSelectedGroup
  );
  const selectedGroupValue = groups[selectedGroupIndex];

  const calendarSelectedDate = useSelector(
    state => state.app.calendarSelectedDate
  );
  const neededDate = new Date(calendarSelectedDate).getDay();

  const groupsChanges = useSelector(state => state.app.groupsChanges);

  const groupsChangesFind =
    groupsChanges.find(groups => groups.name === selectedGroupValue.name) !==
    undefined
      ? groupsChanges
          .find(groups => groups.name === selectedGroupValue.name)
          .timetable.find(lessons => lessons.date === neededDate)
      : undefined;
  groups = groupsChangesFind !== undefined ? groupsChangesFind : groups;

  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
  ];

  return (
    <div>
      <h6>
        На данной странице вы можете просматривать или изменять расписание на
        отдельный день.
      </h6>
      <div className="row">
        <input
          className="input-field col s12 m2"
          style={{ paddingTop: 14 }}
          type="date"
          name="Date"
          value={calendarSelectedDate}
          onChange={event => dispatch(dateSelectHandler(event.target.value))}
        />
        <div className="input-field col s12 m2">
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
      </div>

      {selectedGroupValue.timetable[neededDate] === undefined ? (
        <p>Расписание для данной группы на "{days[neededDate]}" отсутствует</p>
      ) : (
        <div>
          <p>{days[neededDate]}</p>
          <div>
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
                {selectedGroupValue.timetable[neededDate].map(
                  (lesson, lessonIndex) => (
                    <tr key={`tr+${lessonIndex}`}>
                      <td>{lessonIndex + 1}</td>
                      <td>
                        <input
                          type="text"
                          name="Name"
                          value={lesson.name}
                          onChange={event =>
                            dispatch(
                              calendarNamesHandler(
                                event,
                                neededDate,
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
                              calendarNamesHandler(
                                event,
                                neededDate,
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
                          name="ClassRoom"
                          value={lesson.classRoom}
                          onChange={event =>
                            dispatch(
                              calendarNamesHandler(
                                event,
                                neededDate,
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
                            calendarDeleteRow(
                              lessonIndex,
                              neededDate,
                              selectedGroupIndex,
                              groups
                            )
                          )
                        }
                      >
                        <i className="material-icons">remove</i>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <button
            onClick={() =>
              dispatch(calendarAddRow(groups, neededDate, selectedGroupIndex))
            }
            className="waves-effect waves-light btn"
            style={{ marginRight: 10 }}
            id="new_line"
            name="button"
          >
            <i className="material-icons">add</i>
          </button>
          <button
            onClick={() => dispatch(groupsChangesSave(groups))}
            className="waves-effect waves-light btn"
            id="add"
            name="button"
          >
            Сохранить <i className="material-icons">cloud_download</i>
          </button>
        </div>
      )}
    </div>
  );
};
