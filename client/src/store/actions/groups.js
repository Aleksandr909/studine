import { GROUPS_NAMES, GROUPS_DELETE_ROW, GROUPS_ADD_ROW } from "../types";

export const groupsNamesHandler = (event, index, groups) => {
  let newGroupsArr = [...groups];
  const name = event.target["name"];
  let selectedInputInState = { ...newGroupsArr[index] };
  if (name === "Name") {
    selectedInputInState.name = event.target.value;
  } else if (name === "Date") {
    selectedInputInState.date = event.target.value;
  }

  newGroupsArr[index] = selectedInputInState;
  return {
    type: GROUPS_NAMES,
    payload: newGroupsArr
  };
};

export const deleteRow = (index, groups) => {
  const newGroupsArr = [...groups];
  newGroupsArr.splice(index, 1);
  return {
    type: GROUPS_DELETE_ROW,
    payload: newGroupsArr
  };
};

export const addRow = groups => {
  const newGroups = [
    ...groups,
    {
      name: "",
      date: "",
      disciplines: [],
      timetable: [
        [
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" }
        ],
        [
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" }
        ],
        [
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" }
        ],
        [
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" }
        ],
        [
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" }
        ],
        [
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" },
          { name: "", teacher: "", classroom: "" }
        ]
      ],
      changes: {}
    }
  ];

  return {
    type: GROUPS_ADD_ROW,
    payload: newGroups
  };
};
