import {
  GROUPS_NAMES,
  GROUPS_DELETE_ROW,
  GROUPS_ADD_ROW,
  DISCIPLINES_SELECT_HANDLER,
  DISCIPLINES_ADD_ROW,
  DISCIPLINES_DELETE_ROW,
  DISCIPLINES_NAMES,
  GROUPS_SAVED,
  LOCAL_STORE_INIT,
  TIMETABLE_DELETE_ROW,
  TIMETABLE_ADD_ROW,
  TIMETABLE_NAMES,
  TIMETABLE_ADD_DAY,
  CALENDAR_SELECT_HANDLER,
  CALENDAR_DELETE_ROW,
  CALENDAR_ADD_ROW,
  CALENDAR_NAMES,
  GROUPS_CHANGES_SAVED,
  LOCAL_STORE_CHANGES_INIT
} from "../types";
const initialState = {
  groups: [
    {
      name: "Добавьте группы",
      date: "",
      disciplines: [{ name: "", hours: 0 }],
      timetable: [[{ name: "", teacher: "", classRoom: "" }]]
    }
  ],
  groupsSaved: [
    {
      name: "Добавьте группы",
      date: "",
      disciplines: [{ name: "", hours: 0 }],
      timetable: [[{ name: "", teacher: "", classRoom: "" }]]
    }
  ],
  groupsChanges: [{}],
  disciplinesSelectedGroup: 0,
  localStoreReady: false,
  calendarSelectedDate: new Date().toISOString().substring(0, 10)
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCAL_STORE_INIT:
      return {
        ...state,
        groups: action.payload,
        localStoreReady: true
      };
    case LOCAL_STORE_CHANGES_INIT:
      return {
        ...state,
        groupsChanges: action.payload,
        localStoreReady: true
      };
    case GROUPS_NAMES:
      return { ...state, groups: action.payload };
    case GROUPS_DELETE_ROW:
      return { ...state, groups: action.payload };
    case GROUPS_ADD_ROW:
      return { ...state, groups: action.payload };
    case GROUPS_SAVED:
      localStorage.setItem("groupsSaved", action.payload);
      break;
    case GROUPS_CHANGES_SAVED:
      localStorage.setItem("groupsChangesSaved", action.payload);
      break;

    case DISCIPLINES_SELECT_HANDLER:
      return Object.assign(state, { disciplinesSelectedGroup: action.payload });
    case DISCIPLINES_DELETE_ROW:
      return { ...state, groups: action.payload };
    case DISCIPLINES_ADD_ROW:
      return { ...state, groups: action.payload };
    case DISCIPLINES_NAMES:
      return { ...state, groups: action.payload };

    case TIMETABLE_DELETE_ROW:
      return { ...state, groups: action.payload };
    case TIMETABLE_ADD_ROW:
      return { ...state, groups: action.payload };
    case TIMETABLE_NAMES:
      return { ...state, groups: action.payload };
    case TIMETABLE_ADD_DAY:
      return { ...state, groups: action.payload };

    case CALENDAR_SELECT_HANDLER:
      return Object.assign(state, { calendarSelectedDate: action.payload });
    case CALENDAR_DELETE_ROW:
      return { ...state, groupsChanges: action.payload };
    case CALENDAR_ADD_ROW:
      return { ...state, groupsChanges: action.payload };
    case CALENDAR_NAMES:
      return { ...state, groupsChanges: action.payload };
    default:
      break;
  }
  return state;
};
