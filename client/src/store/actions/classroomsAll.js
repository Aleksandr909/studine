import {
  CLASSROOMS_ALL_NAMES,
  CLASSROOMS_ALL_DELETE_ROW,
  CLASSROOMS_ALL_ADD_ROW
} from "../types";

export const classroomsAllNamesHandler = (
  event,
  classroomIndex,
  classroomsAll
) => {
  let newClassroomsArr = [...classroomsAll];
  const name = event.target["name"];
  let selectedInputInState = { ...newClassroomsArr[classroomIndex] };
  if (name === "Name") {
    selectedInputInState.name = event.target.value;
  } else if (name === "MaxPeople") {
    selectedInputInState.maxPeople = event.target.value;
  } else if (name === "MainLesson") {
    selectedInputInState.mainLesson = event.target.value;
  }

  newClassroomsArr[classroomIndex] = selectedInputInState;
  return {
    type: CLASSROOMS_ALL_NAMES,
    payload: newClassroomsArr
  };
};

export const classroomsAllDeleteRow = (index, classrooms) => {
  const newClassroomsArr = [...classrooms];
  newClassroomsArr.splice(index, 1);
  return {
    type: CLASSROOMS_ALL_DELETE_ROW,
    payload: newClassroomsArr
  };
};

export const classroomsAllAddRow = classrooms => {
  const newClassroomsArr = [
    ...classrooms,
    {
      name: 0,
      maxPeople: 0,
      mainLesson: ""
    }
  ];

  return {
    type: CLASSROOMS_ALL_ADD_ROW,
    payload: newClassroomsArr
  };
};
