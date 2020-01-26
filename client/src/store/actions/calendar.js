import { CALENDAR_NAMES } from "../types";

export const calendarNamesHandler = (
  event,
  selectedGroupIndex,
  lessonIndex,
  calendarSelectedDate,
  groups
) => {
  const dayOfWeek = (+new Date(calendarSelectedDate) / 86400000 + 3) % 14;
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

  return {
    type: CALENDAR_NAMES,
    payload: newGroupsArr
  };
};
