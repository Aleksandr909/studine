import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { days } from "../store/constants";
import { Datalist } from "../components/Datalist";

export const ChangesPage = () => {
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

  const changes = useSelector(state => state.app.changes);
  const groupDisciplines = selectedGroupValue.disciplines;

  const selectedDiscipline = useSelector(state => state.app.selectedDiscipline);

  const allChangesForGroup = {};
  for (let key in changes) {
    const dayOfWeek = (+new Date(key) / 86400000 + 3) % 14;

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
          selectedDiscipline ||
          lesson.name === selectedDiscipline)
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

  return (
    <div>
      <h6>
        На данной странице вы можете посмотреть изменения в расписании у групп.
      </h6>
      <div className="row">
        <Datalist
          selectedValue={selectedGroupValue.name}
          options={groups}
          text="Выберите группу"
          name="Group"
        />
        <Datalist
          selectedValue={selectedDiscipline}
          options={groupDisciplines}
          text="all"
          name="Discipline"
        />
      </div>
      <div>
        <p>Расписание</p>
        {Object.keys(allChangesForGroup).map(day => (
          <div key={`day${day}`}>
            <p style={{ marginTop: 40 }}>
              {`${day} - ${days[(+new Date(day) / 86400000 + 3) % 14]}`}
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
                    <td>{lesson.to.lessonNum}</td>
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
