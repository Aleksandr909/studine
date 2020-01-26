import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { groupSave } from "../store/actions/localStorage";
import { timetableNamesHandler } from "../store/actions/timetable";
import { days } from "../store/constants";
import { Datalist } from "../components/Datalist";

export const TimetablePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.M.AutoInit();
  });
  const groups = useSelector(state => state.app.groups);
  const selectedGroup = useSelector(state => state.app.selectedGroup);
  let selectedGroupIndex = groups.findIndex(
    elem => elem.name === selectedGroup
  );
  selectedGroupIndex = selectedGroupIndex === -1 ? 0 : selectedGroupIndex;
  const selectedGroupValue = groups[selectedGroupIndex];
  return (
    <div>
      <h6>
        На данной странице вы можете вручную внести расписание и оно
        автоматически обновится в приложении.
      </h6>
      <Datalist
        selectedValue={selectedGroupValue.name}
        options={groups}
        text="Выберите группу"
        name="Group"
      />
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
                        type="text"
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
