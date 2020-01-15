import {
  CALENDAR_SELECT_HANDLER,
  CALENDAR_DELETE_ROW,
  CALENDAR_NAMES,
  DISCIPLINE_SELECT_HANDLER
} from "../types";

export const dateSelectHandler = date => {
  return {
    type: CALENDAR_SELECT_HANDLER,
    payload: date
  };
};

export const disciplineSelectHandler = discipline => {
  return {
    type: DISCIPLINE_SELECT_HANDLER,
    payload: discipline
  };
};

export const calendarNamesHandler = (
  event,
  selectedGroupIndex,
  lessonIndex,
  calendarSelectedDate,
  groups
) => {
  const dayOfWeek = new Date(calendarSelectedDate).getDay();
  let newGroupsArr = [...groups];
  const name = event.target["name"];
  let groupAllChanges = newGroupsArr[selectedGroupIndex].changes;
  const calendarSelectedDateTimetable = [
    { name: "", teacher: "", classroom: "" },
    { name: "", teacher: "", classroom: "" },
    { name: "", teacher: "", classroom: "" },
    { name: "", teacher: "", classroom: "" },
    { name: "", teacher: "", classroom: "" },
    { name: "", teacher: "", classroom: "" },
    { name: "", teacher: "", classroom: "" },
    { name: "", teacher: "", classroom: "" }
  ];
  groups[selectedGroupIndex].timetable[dayOfWeek].forEach((element, index) => {
    calendarSelectedDateTimetable[index] = { ...element };
  });
  groupAllChanges =
    groupAllChanges[calendarSelectedDate] === undefined
      ? {
          ...groupAllChanges,
          [calendarSelectedDate]: calendarSelectedDateTimetable
        }
      : groupAllChanges;

  let selectedInputInState = groupAllChanges[calendarSelectedDate][lessonIndex];
  if (name === "Name") {
    selectedInputInState.name = event.target.value;
  } else if (name === "Teacher") {
    selectedInputInState.teacher = event.target.value;
  } else if (name === "Classroom") {
    selectedInputInState.classroom = event.target.value;
  }

  newGroupsArr[selectedGroupIndex].changes = groupAllChanges;
  newGroupsArr[selectedGroupIndex].changes[calendarSelectedDate][
    lessonIndex
  ] = selectedInputInState;
  console.log(newGroupsArr);

  return {
    type: CALENDAR_NAMES,
    payload: newGroupsArr
  };
};

export const calendarDeleteRow = (
  groups,
  calendarSelectedDate,
  selectedGroupIndex,
  lessonIndex
) => {
  const newGroupsArr = [...groups];
  const dayOfWeek = new Date(calendarSelectedDate).getDay();
  let groupAllChanges = newGroupsArr[selectedGroupIndex].changes;
  groupAllChanges =
    groupAllChanges[calendarSelectedDate] === undefined
      ? {
          ...groupAllChanges,
          [calendarSelectedDate]:
            newGroupsArr[selectedGroupIndex].timetable[dayOfWeek]
        }
      : groupAllChanges;

  newGroupsArr[selectedGroupIndex].changes = groupAllChanges;
  newGroupsArr[selectedGroupIndex].changes[calendarSelectedDate].splice(
    lessonIndex,
    1
  );
  return {
    type: CALENDAR_DELETE_ROW,
    payload: newGroupsArr
  };
};
