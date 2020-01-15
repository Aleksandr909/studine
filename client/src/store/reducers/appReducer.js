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
  TIMETABLE_NAMES,
  CALENDAR_SELECT_HANDLER,
  CALENDAR_DELETE_ROW,
  CALENDAR_NAMES,
  CLASSROOMS_ALL_NAMES,
  CLASSROOMS_ALL_DELETE_ROW,
  CLASSROOMS_ALL_ADD_ROW,
  CLASSROOMS_SAVED,
  CLASSROOMS_SELECT_HANDLER,
  TEACHERS_SELECT_HANDLER,
  TEACHERS_ALL_NAMES,
  TEACHERS_ALL_DELETE_ROW,
  TEACHERS_ALL_ADD_ROW,
  TEACHERS_SAVED,
  DISCIPLINE_SELECT_HANDLER
} from "../types";
const initialState = {
  groups: [
    {
      name: "Добавьте группы",
      date: "",
      disciplines: [{ name: "", hours: 0 }],
      timetable: [[{ name: "", teacher: "", classroom: "" }]],
      changes: {}
    }
  ],
  disciplinesSelectedGroup: 0,
  localStoreReady: false,
  calendarSelectedDate: new Date().toISOString().substring(0, 10),
  classrooms: [
    {
      number: 100,
      maxPeople: 0,
      mainLesson: ""
    }
  ],
  selectedClassroom: 0,
  teachers: [
    {
      name: "Иванов И.И.",
      mainLesson: ""
    }
  ],
  selectedTeacher: 0,
  selectedDiscipline: "all"
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCAL_STORE_INIT:
      return {
        ...state,
        groups: action.payload.groups,
        changes: action.payload.changes,
        disciplines: action.payload.disciplines,
        classrooms: action.payload.classrooms,
        teachers: action.payload.teachers,
        localStoreReady: true
      };
    case GROUPS_SAVED:
      localStorage.setItem(
        "groupsSaved",
        JSON.stringify(action.payload.groups)
      );
      localStorage.setItem(
        "changesSaved",
        JSON.stringify(action.payload.changes)
      );
      localStorage.setItem(
        "disciplinesSaved",
        JSON.stringify(action.payload.disciplines)
      );
      return {
        ...state,
        groups: action.payload.groups,
        changes: action.payload.changes,
        disciplines: action.payload.disciplines
      };
    case CLASSROOMS_SAVED:
      localStorage.setItem("classroomsSaved", JSON.stringify(action.payload));
      return {
        ...state,
        classrooms: action.payload
      };
    case TEACHERS_SAVED:
      localStorage.setItem("teachersSaved", JSON.stringify(action.payload));
      return {
        ...state,
        teachers: action.payload
      };

    case GROUPS_NAMES:
      return { ...state, groups: action.payload };
    case GROUPS_DELETE_ROW:
      return { ...state, groups: action.payload };
    case GROUPS_ADD_ROW:
      return { ...state, groups: action.payload };

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
    case TIMETABLE_NAMES:
      return { ...state, groups: action.payload };

    case CALENDAR_SELECT_HANDLER:
      return Object.assign(state, { calendarSelectedDate: action.payload });
    case CALENDAR_DELETE_ROW:
      return { ...state, groups: action.payload };
    case CALENDAR_NAMES:
      return { ...state, groups: action.payload };

    case CLASSROOMS_ALL_NAMES:
      return { ...state, classrooms: action.payload };
    case CLASSROOMS_ALL_DELETE_ROW:
      return { ...state, classrooms: action.payload };
    case CLASSROOMS_ALL_ADD_ROW:
      return { ...state, classrooms: action.payload };

    case TEACHERS_ALL_NAMES:
      return { ...state, teachers: action.payload };
    case TEACHERS_ALL_DELETE_ROW:
      return { ...state, teachers: action.payload };
    case TEACHERS_ALL_ADD_ROW:
      return { ...state, teachers: action.payload };

    case CLASSROOMS_SELECT_HANDLER:
      return Object.assign(state, { selectedClassroom: action.payload });
    case TEACHERS_SELECT_HANDLER:
      return Object.assign(state, { selectedTeacher: action.payload });
    case DISCIPLINE_SELECT_HANDLER:
      return Object.assign(state, { selectedDiscipline: action.payload });
    default:
      break;
  }
  return state;
};
