import {
  CALENDAR_SELECT_HANDLER,
  CALENDAR_DELETE_ROW,
  CALENDAR_ADD_ROW,
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
  dayIndex,
  lessonIndex,
  selectedGroupIndex,
  groups
) => {
  let newGroupsArr = [...groups];
  const name = event.target["name"];
  let selectedInputInState =
    newGroupsArr[selectedGroupIndex].timetable[dayIndex][lessonIndex];
  if (name === "Name") {
    selectedInputInState.name = event.target.value;
  } else if (name === "Teacher") {
    selectedInputInState.teacher = event.target.value;
  } else if (name === "ClassRoom") {
    selectedInputInState.classRoom = event.target.value;
  }

  newGroupsArr[selectedGroupIndex].timetable[dayIndex][
    lessonIndex
  ] = selectedInputInState;
  console.log(newGroupsArr);

  return {
    type: CALENDAR_NAMES,
    payload: newGroupsArr
  };
};

export const calendarDeleteRow = (
  lessonindex,
  dayIndex,
  selectedGroupIndex,
  groups
) => {
  const newGroupsArr = [...groups];
  const newTimetableArr = newGroupsArr[selectedGroupIndex].timetable[dayIndex];
  newTimetableArr.splice(lessonindex, 1);
  newGroupsArr[selectedGroupIndex].timetable[dayIndex] = newTimetableArr;
  return {
    type: CALENDAR_DELETE_ROW,
    payload: newGroupsArr
  };
};

export const calendarAddRow = (groups, dayIndex, selectedGroup) => {
  const newGroupsArr = [...groups];
  console.log(groups[selectedGroup].timetable[dayIndex]);
  newGroupsArr[selectedGroup].timetable[dayIndex] = [
    ...newGroupsArr[selectedGroup].timetable[dayIndex],
    { name: "", teacher: "", classRoom: "" }
  ];

  return {
    type: CALENDAR_ADD_ROW,
    payload: newGroupsArr
  };
};
