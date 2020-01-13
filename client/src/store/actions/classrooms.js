import {
  CLASSROOMS_SELECT_HANDLER,
  CLASSROOMS_NAMES,
  CLASSROOMS_DELETE_ROW
} from "../types";
import { useState } from "react";

export const classroomSelectHandler = classroom => {
  return {
    type: CLASSROOMS_SELECT_HANDLER,
    payload: classroom
  };
};

export const classroomsNamesHandler = (
  event,
  lesson,
  selectedClassroom,
  calendarSelectedDate,
  changes
) => {
  let newChangesObj = { ...changes };
  const name = event.target["name"];
  newChangesObj[calendarSelectedDate] =
    newChangesObj[calendarSelectedDate] === undefined
      ? [
          {
            ...lesson
          }
        ]
      : newChangesObj[calendarSelectedDate];

  const classroomIndexInState = newChangesObj[calendarSelectedDate].findIndex(
    elem =>
      elem.lessonNum === lesson.lessonNum &&
      elem.classroom === selectedClassroom
  );

  if (classroomIndexInState === -1) {
    newChangesObj[calendarSelectedDate].push({
      ...lesson
    });
  } else {
    newChangesObj[calendarSelectedDate].push(
      newChangesObj[calendarSelectedDate][classroomIndexInState]
    );
    newChangesObj[calendarSelectedDate].splice(classroomIndexInState, 1);
  }
  let selectedInputInState = {
    ...newChangesObj[calendarSelectedDate][
      newChangesObj[calendarSelectedDate].length - 1
    ]
  };
  if (name === "Name") {
    selectedInputInState.name = event.target.value;
  } else if (name === "Teacher") {
    selectedInputInState.teacher = event.target.value;
  } else if (name === "GroupName") {
    selectedInputInState.groupName = event.target.value;
  }

  newChangesObj[calendarSelectedDate][
    newChangesObj[calendarSelectedDate].length - 1
  ] = selectedInputInState;

  return {
    type: CLASSROOMS_NAMES,
    payload: newChangesObj
  };
};

export const classroomsDeleteRow = (index, classrooms) => {
  const newClassroomsArr = [...classrooms];
  newClassroomsArr.splice(index, 1);
  return {
    type: CLASSROOMS_DELETE_ROW,
    payload: newClassroomsArr
  };
};
