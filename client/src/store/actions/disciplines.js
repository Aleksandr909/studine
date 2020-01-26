import {
  DISCIPLINES_DELETE_ROW,
  DISCIPLINES_ADD_ROW,
  DISCIPLINES_NAMES
} from "../types";

export const discNamesHandler = (event, index, selectedGroupIndex, groups) => {
  let newGroupsArr = [...groups];
  const name = event.target["name"];
  let selectedInputInState = newGroupsArr[selectedGroupIndex].disciplines;
  if (name === "Name") {
    selectedInputInState[index].name = event.target.value;
  } else if (name === "Hours") {
    selectedInputInState[index].hours = event.target.value;
  }

  newGroupsArr[selectedGroupIndex].disciplines = selectedInputInState;

  return {
    type: DISCIPLINES_NAMES,
    payload: newGroupsArr
  };
};

export const discDeleteRow = (index, selectedGroupIndex, groups) => {
  const newGroupsArr = [...groups];
  const newDisciplinesArr = newGroupsArr[selectedGroupIndex].disciplines;
  newDisciplinesArr.splice(index, 1);
  newGroupsArr[selectedGroupIndex].disciplines = newDisciplinesArr;
  return {
    type: DISCIPLINES_DELETE_ROW,
    payload: newGroupsArr
  };
};

export const discAddRow = (groups, selectedGroup) => {
  const newGroupsArr = [...groups];
  newGroupsArr[selectedGroup].disciplines = [
    ...newGroupsArr[selectedGroup].disciplines,
    { name: "", hours: 0 }
  ];

  return {
    type: DISCIPLINES_ADD_ROW,
    payload: newGroupsArr
  };
};
