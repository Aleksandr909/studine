import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { days } from "../store/constants";
import { Datalist } from "../components/Datalist";
import { dateSelectHandler } from "../store/actions/selectHandler";

export const ClassroomsPage = () => {
  useEffect(() => {
    window.M.AutoInit();
  });
  const dispatch = useDispatch();
  const calendarSelectedDate = useSelector(
    state => state.app.calendarSelectedDate
  );
  const classroomNum = useSelector(state => state.app.selectedClassroom);

  const disciplines = useSelector(state => state.app.disciplines);
  const changes = useSelector(state => state.app.changes);
  const classrooms = useSelector(state => state.app.classrooms);

  const neededDate = (+new Date(calendarSelectedDate) / 86400000 + 3) % 14;

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
    if (elem.classroom === classroomNum && elem.classroom !== undefined) {
      selectedClassroomTimetableForDay[elem.lessonNum - 1] = elem;
    }
  });
  if (changes[calendarSelectedDate] !== undefined) {
    changes[calendarSelectedDate].forEach(elem => {
      if (elem.classroom === classroomNum && elem.classroom !== undefined) {
        selectedClassroomTimetableForDay[elem.lessonNum - 1] = elem;
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
          selectedValue={classroomNum}
          options={classrooms}
          text="Выберите аудиторию"
          name="Classroom"
        />
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
