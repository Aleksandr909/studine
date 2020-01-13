import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateSelectHandler } from "../store/actions/calendar";
import { Link } from "react-router-dom";
import {
  classroomSelectHandler,
  classroomsNamesHandler,
  classroomsDeleteRow
} from "../store/actions/classrooms";

export const ClassroomsPage = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const dispatch = useDispatch();
  const calendarSelectedDate = useSelector(
    state => state.app.calendarSelectedDate
  );
  const selectedClassroom = useSelector(state => state.app.selectedClassroom);
  // const groups = useSelector(state => state.app.groups);

  const disciplines = useSelector(state => state.app.disciplines);
  const changes = useSelector(state => state.app.changes);
  const classrooms = useSelector(state => state.app.classrooms);

  const neededDate = new Date(calendarSelectedDate).getDay();

  let selectedClassroomTimetableForDay = [
    { name: "", teacher: "", classroom: "", groupName: "", lessonNum: 1 },
    { name: "", teacher: "", classroom: "", groupName: "", lessonNum: 2 },
    { name: "", teacher: "", classroom: "", groupName: "", lessonNum: 3 },
    { name: "", teacher: "", classroom: "", groupName: "", lessonNum: 4 },
    { name: "", teacher: "", classroom: "", groupName: "", lessonNum: 5 },
    { name: "", teacher: "", classroom: "", groupName: "", lessonNum: 6 },
    { name: "", teacher: "", classroom: "", groupName: "", lessonNum: 7 },
    { name: "", teacher: "", classroom: "", groupName: "", lessonNum: 8 }
  ];
  disciplines[neededDate].forEach(elem => {
    if (
      elem.classroom === classrooms[selectedClassroom].number &&
      elem.classroom !== undefined
    ) {
      selectedClassroomTimetableForDay[elem.lessonNum - 1] = elem;
    }
  });
  if (changes[calendarSelectedDate] !== undefined) {
    changes[calendarSelectedDate].forEach(elem => {
      if (
        elem.classroom === classrooms[selectedClassroom].number &&
        elem.classroom !== undefined
      ) {
        selectedClassroomTimetableForDay[elem.lessonNum - 1] = elem;
      }
    });
  }

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
          style={{ paddingTop: 15 }}
          type="date"
          name="Date"
          value={calendarSelectedDate}
          onChange={event => dispatch(dateSelectHandler(event.target.value))}
        />
        <div className="input-field col s12 m2">
          <select
            defaultValue={selectedClassroom}
            onChange={event =>
              dispatch(classroomSelectHandler(event.target.value))
            }
          >
            <option value="" disabled>
              Выберите аудиторию
            </option>
            {classrooms.map((elem, index) => (
              <option key={elem.number + index} value={index}>
                {elem.number}
              </option>
            ))}
          </select>
          <label>Выберите Аудиторию</label>
        </div>
        <Link to="/classrooms/all" className="waves-effect waves-light btn">
          Изменить аудитории <i className="material-icons">edit</i>
        </Link>
      </div>

      <div>
        <p>{days[neededDate]}</p>
        <div>
          <table>
            <thead>
              <tr>
                <td>№</td>
                <td>Дисциплина</td>
                <td>Преподаватель</td>
                <td>Группа</td>
                <td>Удалить</td>
              </tr>
            </thead>
            <tbody id="group_table">
              {selectedClassroomTimetableForDay.map((lesson, lessonIndex) => (
                <tr key={`tr+${lessonIndex}`}>
                  <td>{lesson.lessonNum}</td>
                  <td>
                    <input
                      type="text"
                      name="Name"
                      value={lesson.name}
                      onChange={event =>
                        dispatch(
                          classroomsNamesHandler(
                            event,
                            lesson,
                            classrooms[selectedClassroom].number,
                            calendarSelectedDate,
                            changes
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
                          classroomsNamesHandler(
                            event,
                            lesson,
                            classrooms[selectedClassroom].number,
                            calendarSelectedDate,
                            changes
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="GroupName"
                      value={lesson.groupName}
                      onChange={event =>
                        dispatch(
                          classroomsNamesHandler(
                            event,
                            lesson,
                            classrooms[selectedClassroom].number,
                            calendarSelectedDate,
                            changes
                          )
                        )
                      }
                    />
                  </td>
                  <td
                    className="btn-floating btn-small waves-effect waves-light red center"
                    style={{ marginTop: 20 }}
                    onClick={() => dispatch(classroomsDeleteRow())}
                  >
                    <i className="material-icons">remove</i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="waves-effect waves-light btn" id="add" name="button">
          Сохранить <i className="material-icons">cloud_download</i>
        </button>
      </div>
    </div>
  );
};
