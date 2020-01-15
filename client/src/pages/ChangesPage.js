import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHandler } from "../store/actions/disciplines";
import { disciplineSelectHandler } from "../store/actions/calendar";

export const ChangesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.M.AutoInit();
  });
  const groups = useSelector(state => state.app.groups);
  const selectedGroupIndex = useSelector(
    state => state.app.disciplinesSelectedGroup
  );
  const selectedGroupValue = groups[selectedGroupIndex];

  const changes = useSelector(state => state.app.changes);
  const groupDisciplines = selectedGroupValue.disciplines;

  const selectedDiscipline = useSelector(state => state.app.selectedDiscipline);

  const allChangesForGroup = {};

  for (let key in changes) {
    const dayOfWeek = new Date(key).getDay();

    changes[key].forEach(lesson => {
      if (selectedDiscipline === "all") {
        if (
          lesson.groupName === selectedGroupValue.name &&
          (selectedGroupValue.timetable[dayOfWeek][lesson.lessonNum - 1]
            .name !== lesson.name ||
            selectedGroupValue.timetable[dayOfWeek][lesson.lessonNum - 1]
              .teacher !== lesson.teacher)
        ) {
          allChangesForGroup[key] =
            allChangesForGroup[key] === undefined
              ? []
              : allChangesForGroup[key];
          allChangesForGroup[key].push({
            from: selectedGroupValue.timetable[dayOfWeek][lesson.lessonNum - 1],
            to: lesson
          });
        }
      } else if (
        lesson.groupName === selectedGroupValue.name &&
        (selectedGroupValue.timetable[dayOfWeek][lesson.lessonNum - 1].name !==
          lesson.name ||
          selectedGroupValue.timetable[dayOfWeek][lesson.lessonNum - 1]
            .teacher !== lesson.teacher) &&
        (selectedGroupValue.timetable[dayOfWeek][lesson.lessonNum - 1].name ===
          groupDisciplines[selectedDiscipline].name ||
          lesson.name === groupDisciplines[selectedDiscipline].name)
      ) {
        allChangesForGroup[key] =
          allChangesForGroup[key] === undefined ? [] : allChangesForGroup[key];
        allChangesForGroup[key].push({
          from: selectedGroupValue.timetable[dayOfWeek][lesson.lessonNum - 1],
          to: lesson
        });
      }
    });
  }

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
        На данной странице вы можете посмотреть изменения в расписании у групп.
      </h6>
      <div className="row">
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
        <div className="input-field col s12 m2">
          <select
            defaultValue="all"
            onChange={event =>
              dispatch(disciplineSelectHandler(event.target.value))
            }
          >
            <option value="" disabled>
              Выберите дисциплину
            </option>
            <option value="all">Все дисциплины</option>
            {groupDisciplines.map((elem, index) => (
              <option key={elem.name + index} value={index}>
                {elem.name}
              </option>
            ))}
          </select>
          <label>Выберите дисциплину</label>
        </div>
      </div>
      <div>
        <p>Расписание</p>
        {Object.keys(allChangesForGroup).map(day => (
          <div key={`day${day}`}>
            <p style={{ marginTop: 40 }}>
              {`${day} - ${days[new Date(day).getDay()]}`}
            </p>
            <table>
              <thead>
                <tr>
                  <td>№</td>
                  <td>Дисциплина</td>
                  <td>Преподаватель</td>
                  <td>Аудитория</td>
                  <td style={{ backgroundColor: "blue" }} />
                  <td>Дисциплина</td>
                  <td>Преподаватель</td>
                  <td>Аудитория</td>
                </tr>
              </thead>
              <tbody id="group_table">
                {allChangesForGroup[day].map((lesson, lessonIndex) => (
                  <tr key={`tr+${lessonIndex}`}>
                    <td>{lesson.from.lessonNum}</td>
                    <td>{lesson.from.name}</td>
                    <td>{lesson.from.teacher}</td>
                    <td>{lesson.from.classroom}</td>
                    <td style={{ backgroundColor: "blue" }} />
                    <td>{lesson.to.name}</td>
                    <td>{lesson.to.teacher}</td>
                    <td>{lesson.to.classroom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};
