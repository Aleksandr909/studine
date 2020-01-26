import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { days } from "../store/constants";
import { Datalist } from "../components/Datalist";
import { dateSelectHandler } from "../store/actions/selectHandler";

export const TeachersPage = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const dispatch = useDispatch();
  const calendarSelectedDate = useSelector(
    state => state.app.calendarSelectedDate
  );
  const teacherName = useSelector(state => state.app.selectedTeacher);

  const disciplines = useSelector(state => state.app.disciplines);
  const changes = useSelector(state => state.app.changes);
  const teachers = useSelector(state => state.app.teachers);

  const neededDate = (+new Date(calendarSelectedDate) / 86400000 + 3) % 14;

  let selectedTeacherTimetableForDay = [
    { name: "", classroom: "", groupName: "", lessonNum: 1 },
    { name: "", classroom: "", groupName: "", lessonNum: 2 },
    { name: "", classroom: "", groupName: "", lessonNum: 3 },
    { name: "", classroom: "", groupName: "", lessonNum: 4 },
    { name: "", classroom: "", groupName: "", lessonNum: 5 },
    { name: "", classroom: "", groupName: "", lessonNum: 6 },
    { name: "", classroom: "", groupName: "", lessonNum: 7 },
    { name: "", classroom: "", groupName: "", lessonNum: 8 }
  ];
  disciplines[neededDate].forEach(elem => {
    if (elem.teacher === teacherName && elem.teacher !== undefined) {
      selectedTeacherTimetableForDay[elem.lessonNum - 1] = elem;
    }
  });
  if (changes[calendarSelectedDate] !== undefined) {
    changes[calendarSelectedDate].forEach(elem => {
      if (elem.teacher === teacherName && elem.teacher !== undefined) {
        selectedTeacherTimetableForDay[elem.lessonNum - 1] = elem;
      }
    });
  }

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
          selectedValue={teacherName}
          options={teachers}
          text="Выберите Преподавателя"
          name="Teacher"
        />
        <Link to="/teachers/all" className="waves-effect waves-light btn">
          Изменить преподавателей <i className="material-icons">edit</i>
        </Link>
      </div>
      <p>{days[neededDate]}</p>
      <table>
        <thead>
          <tr>
            <td>№</td>
            <td>Дисциплина</td>
            <td>Аудитория</td>
            <td>Группа</td>
          </tr>
        </thead>
        <tbody id="group_table">
          {selectedTeacherTimetableForDay.map((lesson, lessonIndex) => (
            <tr key={`tr+${lessonIndex}`}>
              <td>{lesson.lessonNum}</td>
              <td>{lesson.name}</td>
              <td>{lesson.classroom}</td>
              <td>{lesson.groupName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
