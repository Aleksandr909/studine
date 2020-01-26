import { TIMETABLE_NAMES } from "../types";

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
  } else if (name === "Classroom") {
    selectedInputInState.classroom = event.target.value;
  }

  newGroupsArr[selectedGroupIndex].timetable[dayIndex][
    lessonIndex
  ] = selectedInputInState;

  return {
    type: TIMETABLE_NAMES,
    payload: newGroupsArr
  };
};
