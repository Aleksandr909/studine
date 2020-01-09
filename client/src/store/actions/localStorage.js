import {
  GROUPS_SAVED,
  LOCAL_STORE_INIT,
  GROUPS_CHANGES_SAVED,
  LOCAL_STORE_CHANGES_INIT
} from "../types";

export const localStoreInit = () => {
  return async dispatch => {
    let localStorageData = {};
    let localStorageChangesData = {};
    try {
      localStorageData = await JSON.parse(localStorage.getItem("groupsSaved"));
      localStorageChangesData = await JSON.parse(
        localStorage.getItem("groupsChangesSaved")
      );
      if (localStorageData !== null) {
        dispatch({
          type: LOCAL_STORE_INIT,
          payload: localStorageData
        });
      } else {
        dispatch({
          type: LOCAL_STORE_INIT,
          payload: [
            {
              name: "Добавьте группы",
              date: "",
              disciplines: [{ name: "", hours: 0 }],
              timetable: [[{ name: "", teacher: "", classRoom: "" }]]
            }
          ]
        });
      }

      if (localStorageChangesData !== null) {
        dispatch({
          type: LOCAL_STORE_CHANGES_INIT,
          payload: localStorageChangesData
        });
      } else {
        dispatch({
          type: LOCAL_STORE_CHANGES_INIT,
          payload: [{}]
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const groupSave = groups => {
  return {
    type: GROUPS_SAVED,
    payload: JSON.stringify(groups)
  };
};

export const groupsChangesSave = groupsChanges => {
  return {
    type: GROUPS_CHANGES_SAVED,
    payload: JSON.stringify(groupsChanges)
  };
};
