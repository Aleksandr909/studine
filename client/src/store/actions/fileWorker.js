import { UPDATE_TIMETABLE_FROM_FILE } from "../types";

const timeTableDayFilter = (groupDayItem, selectedDay) => {
  const dayFromJSON = new Date(
    groupDayItem.date
      .split(".")
      .reverse()
      .join("-")
  );
  const dayFromJSONOfTwoWeek =
    Math.floor(dayFromJSON.getTime() / 86400000 + 3) % 14;
  const selectedDayOfTwoWeek = Math.floor(selectedDay / 86400000 + 3) % 14;
  if (dayFromJSONOfTwoWeek === selectedDayOfTwoWeek) {
    return "true";
  }
};

const teachers = [];
const classrooms = [];
const allDisciplinesArr = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
];

export const handleFileSelect = evt => {
  return dispatch => {
    var file = evt.target.files[0];
    if (file.type !== "application/json") {
      return "error";
    }
    var reader = new FileReader();
    reader.onload = (() => {
      return e => {
        const oldGroupsArr = JSON.parse(e.target.result).faculties[0].groups;
        const newGroupsArr = [];
        for (let oldGroup = 0; oldGroup < oldGroupsArr.length; oldGroup++) {
          newGroupsArr[oldGroup] = {
            name: oldGroupsArr[oldGroup].name,
            changes: {},
            date: ""
          };
          const newTimetableData = neededGroupTimetable(
            oldGroupsArr,
            oldGroupsArr[oldGroup].name
          );
          newGroupsArr[oldGroup].timetable = newTimetableData.timetable;
          newGroupsArr[oldGroup].disciplines = newTimetableData.disciplines;
        }
        teachers.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        });
        classrooms.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        });
        window.M.toast({ html: "Расписание обновлено" });

        dispatch({
          type: UPDATE_TIMETABLE_FROM_FILE,
          payload: {
            groups: newGroupsArr,
            teachers,
            classrooms,
            disciplines: allDisciplinesArr
          }
        });
      };
    })();
    reader.readAsText(file);
  };
};

const neededGroupTimetable = (allGroupsTimetable, selectedGroups) => {
  const selectedGroupsArr = [];
  selectedGroupsArr[0] = selectedGroups;
  selectedGroupsArr[1] = selectedGroups.slice(0, -2);

  const neededGroups = [...allGroupsTimetable].filter(
    selectGroupItem =>
      selectGroupItem.name === selectedGroupsArr[0] ||
      selectGroupItem.name === selectedGroupsArr[1]
  );
  // получаем выбранную группу и подгруппу из полного расписания
  let daysLength = 14;
  const fullNeededGroupTimetableData = [];
  const newDisciplines = [];

  for (let day = 0; day < daysLength; day++) {
    let neededGroupTimetableData = [];
    const newTimetableForDay = [
      { name: "", teacher: "", classroom: "" },
      { name: "", teacher: "", classroom: "" },
      { name: "", teacher: "", classroom: "" },
      { name: "", teacher: "", classroom: "" },
      { name: "", teacher: "", classroom: "" },
      { name: "", teacher: "", classroom: "" },
      { name: "", teacher: "", classroom: "" },
      { name: "", teacher: "", classroom: "" }
    ];
    neededGroups.forEach((neededGroupItem, index) => {
      const groupAndDayItem = neededGroupItem.lessons.filter(groupDayItem =>
        timeTableDayFilter(groupDayItem, 86400000 * 11 + 86400000 * day)
      );
      // получаем расписание на выбранный день у группы и подгруппы

      groupAndDayItem.forEach(neededGroupLessen => {
        if (
          newDisciplines.find(
            elem => elem.name === neededGroupLessen.subject
          ) === undefined
        ) {
          newDisciplines.push({ name: neededGroupLessen.subject, hours: 0 });
        }
        if (
          teachers.find(
            elem => elem.name === neededGroupLessen.teachers[0].name
          ) === undefined
        ) {
          teachers.push({
            name: neededGroupLessen.teachers[0].name,
            mainLesson: ""
          });
        }
        if (
          classrooms.find(
            elem => elem.name === neededGroupLessen.audiences[0].name
          ) === undefined
        ) {
          classrooms.push({
            name: neededGroupLessen.audiences[0].name,
            maxPeople: 0,
            mainLesson: ""
          });
        }
        const newGroupLesson = {
          name: neededGroupLessen.subject,
          teacher: neededGroupLessen.teachers[0].name,
          classroom: neededGroupLessen.audiences[0].name
        };
        switch (neededGroupLessen.time.start) {
          case "09:00":
            newTimetableForDay[0] = newGroupLesson;
            allDisciplinesArr[day].push({
              ...newGroupLesson,
              groupName: selectedGroups,
              lessonNum: 1
            });
            break;
          case "10:35":
            newTimetableForDay[1] = newGroupLesson;
            allDisciplinesArr[day].push({
              ...newGroupLesson,
              groupName: selectedGroups,
              lessonNum: 2
            });
            break;
          case "12:10":
            newTimetableForDay[2] = newGroupLesson;
            allDisciplinesArr[day].push({
              ...newGroupLesson,
              groupName: selectedGroups,
              lessonNum: 3
            });
            break;
          case "14:15":
            newTimetableForDay[3] = newGroupLesson;
            allDisciplinesArr[day].push({
              ...newGroupLesson,
              groupName: selectedGroups,
              lessonNum: 4
            });
            break;
          case "15:50":
            newTimetableForDay[4] = newGroupLesson;
            allDisciplinesArr[day].push({
              ...newGroupLesson,
              groupName: selectedGroups,
              lessonNum: 5
            });
            break;
          case "17:25":
            newTimetableForDay[5] = newGroupLesson;
            allDisciplinesArr[day].push({
              ...newGroupLesson,
              groupName: selectedGroups,
              lessonNum: 6
            });
            break;
          case "19:00":
            newTimetableForDay[6] = newGroupLesson;
            allDisciplinesArr[day].push({
              ...newGroupLesson,
              groupName: selectedGroups,
              lessonNum: 7
            });
            break;
          case "20:30":
            newTimetableForDay[7] = newGroupLesson;
            allDisciplinesArr[day].push({
              ...newGroupLesson,
              groupName: selectedGroups,
              lessonNum: 8
            });
            break;
          default:
            break;
        }
        neededGroupTimetableData.push(neededGroupLessen);
      });
    });
    fullNeededGroupTimetableData.push(newTimetableForDay);
  }
  newDisciplines.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
  return {
    timetable: fullNeededGroupTimetableData,
    disciplines: newDisciplines
  };
};
