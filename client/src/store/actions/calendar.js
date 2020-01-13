import {
  CALENDAR_SELECT_HANDLER,
  CALENDAR_DELETE_ROW,
  CALENDAR_NAMES
} from "../types";

export const dateSelectHandler = date => {
  return {
    type: CALENDAR_SELECT_HANDLER,
    payload: date
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
  groupAllChanges =
    groupAllChanges[calendarSelectedDate] === undefined
      ? {
          ...groupAllChanges,
          [calendarSelectedDate]:
            newGroupsArr[selectedGroupIndex].timetable[dayOfWeek]
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
