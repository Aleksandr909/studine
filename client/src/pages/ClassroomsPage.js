import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateSelectHandler } from "../store/actions/calendar";
import { Link } from "react-router-dom";
import { classroomSelectHandler } from "../store/actions/classrooms";

export const ClassroomsPage = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const dispatch = useDispatch();
  const calendarSelectedDate = useSelector(
    state => state.app.calendarSelectedDate
  );
  const classroom = useSelector(state => state.app.selectedClassroom);

  const disciplines = useSelector(state => state.app.disciplines);
  const changes = useSelector(state => state.app.changes);
  const classrooms = useSelector(state => state.app.classrooms);

  const neededDate = new Date(calendarSelectedDate).getDay();

  let selectedClassroomTimetableForDay = [
    { name: "", teacher: "", groupName: "", lessonNum: 1 },
    { name: "", teacher: "", groupName: "", lessonNum: 2 },
    { name: "", teacher: "", groupName: "", lessonNum: 3 },
    { name: "", teacher: "", groupName: "", lessonNum: 4 },
    { name: "", teacher: "", groupName: "", lessonNum: 5 },
    { name: "", teacher: "", groupName: "", lessonNum: 6 },
    { name: "", teacher: "", groupName: "", lessonNum: 7 },
    { name: "", teacher: "", groupName: "", lessonNum: 8 }
  ];
  disciplines[neededDate].forEach(elem => {
    if (
      elem.classroom === classrooms[classroom].number &&
      elem.classroom !== undefined
    ) {
      selectedClassroomTimetableForDay[elem.lessonNum - 1] = elem;
    }
  });
  if (changes[calendarSelectedDate] !== undefined) {
    changes[calendarSelectedDate].forEach(elem => {
      if (
        elem.classroom === classrooms[classroom].number &&
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
            defaultValue={classroom}
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
      <p>{days[neededDate]}</p>
      <table>
        <thead>
          <tr>
            <td>№</td>
            <td>Дисциплина</td>
            <td>Преподаватель</td>
            <td>Группа</td>
          </tr>
        </thead>
        <tbody id="group_table">
          {selectedClassroomTimetableForDay.map((lesson, lessonIndex) => (
            <tr key={`tr+${lessonIndex}`}>
              <td>{lesson.lessonNum}</td>
              <td>{lesson.name}</td>
              <td>{lesson.teacher}</td>
              <td>{lesson.groupName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
