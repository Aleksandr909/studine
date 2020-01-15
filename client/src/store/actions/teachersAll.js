import {
  TEACHERS_ALL_NAMES,
  TEACHERS_ALL_DELETE_ROW,
  TEACHERS_ALL_ADD_ROW
} from "../types";

export const teachersAllNamesHandler = (event, teacherIndex, teachersAll) => {
  let newTeachersArr = [...teachersAll];
  const name = event.target["name"];
  let selectedInputInState = { ...newTeachersArr[teacherIndex] };
  if (name === "Name") {
    selectedInputInState.name = event.target.value;
  } else if (name === "MainLesson") {
    selectedInputInState.mainLesson = event.target.value;
  }

  newTeachersArr[teacherIndex] = selectedInputInState;
  return {
    type: TEACHERS_ALL_NAMES,
    payload: newTeachersArr
  };
};

export const teachersAllDeleteRow = (index, teachers) => {
  const newTeachersArr = [...teachers];
  newTeachersArr.splice(index, 1);
  return {
    type: TEACHERS_ALL_DELETE_ROW,
    payload: newTeachersArr
  };
};

export const teachersAllAddRow = teachers => {
  const newTeachersArr = [
    ...teachers,
    {
      name: "",
      mainLesson: ""
    }
  ];

  return {
    type: TEACHERS_ALL_ADD_ROW,
    payload: newTeachersArr
  };
};
