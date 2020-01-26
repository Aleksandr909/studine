import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calendarNamesHandler } from "../store/actions/calendar";
import { groupSave } from "../store/actions/localStorage";
import { Datalist } from "../components/Datalist";
import { days } from "../store/constants";
import { dateSelectHandler } from "../store/actions/selectHandler";

export const CalendarPage = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const dispatch = useDispatch();
  const groups = useSelector(state => state.app.groups);
  const selectedGroup = useSelector(state => state.app.selectedGroup);
  let selectedGroupIndex = groups.findIndex(
    elem => elem.name === selectedGroup
  );
  selectedGroupIndex = selectedGroupIndex === -1 ? 0 : selectedGroupIndex;

  const selectedGroupValue = groups[selectedGroupIndex];

  const calendarSelectedDate = useSelector(
    state => state.app.calendarSelectedDate
  );
  const neededDate = (+new Date(calendarSelectedDate) / 86400000 + 3) % 14;

  const selectedGroupTimetableForDay =
    selectedGroupValue.changes[calendarSelectedDate] === undefined
      ? selectedGroupValue.timetable[neededDate]
      : selectedGroupValue.changes[calendarSelectedDate];

  return (
    <div>
      <h6>
        На данной странице вы можете просматривать или изменять расписание на
        отдельный день.
      </h6>
      <div className="row">
        <input
          className="input-field col s12 m2"
          style={{ paddingTop: 15 }}
          type="date"
          name="Date"
          value={calendarSelectedDate}
          onChange={event => dispatch(dateSelectHandler(event.target.value))}
        />
        <Datalist
          selectedValue={selectedGroupValue.name}
          options={groups}
          text="Выберите группу"
          name="Group"
        />
      </div>

      {selectedGroupTimetableForDay === undefined ? (
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
                </tr>
              </thead>
              <tbody id="group_table">
                {selectedGroupTimetableForDay.map((lesson, lessonIndex) => (
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
                              selectedGroupIndex,
                              lessonIndex,
                              calendarSelectedDate,
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
                              selectedGroupIndex,
                              lessonIndex,
                              calendarSelectedDate,
                              groups
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Classroom"
                        value={lesson.classroom}
                        onChange={event =>
                          dispatch(
                            calendarNamesHandler(
                              event,
                              selectedGroupIndex,
                              lessonIndex,
                              calendarSelectedDate,
                              groups
                            )
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => dispatch(groupSave(groups))}
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
