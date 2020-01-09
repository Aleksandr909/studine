import {
  TIMETABLE_DELETE_ROW,
  TIMETABLE_ADD_ROW,
  TIMETABLE_NAMES,
  TIMETABLE_ADD_DAY
} from "../types";

export const timetableNamesHandler = (
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

  return {
    type: TIMETABLE_NAMES,
    payload: newGroupsArr
  };
};

export const timetableDeleteRow = (
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
    type: TIMETABLE_DELETE_ROW,
    payload: newGroupsArr
  };
};

export const timetableAddRow = (groups, dayIndex, selectedGroup) => {
  const newGroupsArr = [...groups];
  console.log(groups[selectedGroup].timetable[dayIndex]);
  newGroupsArr[selectedGroup].timetable[dayIndex] = [
    ...newGroupsArr[selectedGroup].timetable[dayIndex],
    { name: "", teacher: "", classRoom: "" }
  ];

  return {
    type: TIMETABLE_ADD_ROW,
    payload: newGroupsArr
  };
};

export const timetableAddDay = (groups, selectedGroup) => {
  const newGroupsArr = [...groups];
  newGroupsArr[selectedGroup].timetable = [
    ...newGroupsArr[selectedGroup].timetable,
    [{ name: "", teacher: "", classRoom: "" }]
  ];

  return {
    type: TIMETABLE_ADD_DAY,
    payload: newGroupsArr
  };
};
