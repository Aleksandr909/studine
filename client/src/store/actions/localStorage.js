import {
  GROUPS_SAVED,
  LOCAL_STORE_INIT,
  CLASSROOMS_SAVED,
  TEACHERS_SAVED
} from "../types";

export const localStoreInit = () => {
  return async dispatch => {
    let localStorageGroups = {};
    let localStorageChanges = {};
    let localStorageDisciplines = {};
    let localStorageClassrooms = [];
    let localStorageTeachers = [];
    try {
      localStorageGroups = await JSON.parse(
        localStorage.getItem("groupsSaved")
      );
      localStorageChanges = await JSON.parse(
        localStorage.getItem("changesSaved")
      );
      localStorageDisciplines = await JSON.parse(
        localStorage.getItem("disciplinesSaved")
      );
      localStorageClassrooms = await JSON.parse(
        localStorage.getItem("classroomsSaved")
      );
      localStorageTeachers = await JSON.parse(
        localStorage.getItem("teachersSaved")
      );

      await dispatch({
        type: LOCAL_STORE_INIT,
        payload: {
          groups: localStorageGroups || [
            {
              name: "Добавьте группы",
              date: "",
              disciplines: [{ name: "", hours: 0 }],
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
          ],
          changes: localStorageChanges || {},
          disciplines: localStorageDisciplines || [[], [], [], [], [], [], []],
          classrooms: localStorageClassrooms || [
            {
              number: 100,
              maxPeople: 0,
              mainLesson: ""
            }
          ],
          teachers: localStorageTeachers || [
            {
              name: "Иванов И.И.",
              mainLesson: ""
            }
          ]
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const groupSave = groups => {
  const newGroupsArr = [...groups];
  const allChanges = {};
  const allDisciplines = [[], [], [], [], [], [], []];

  newGroupsArr.forEach(group => {
    for (let key in group.changes) {
      group.changes[key].forEach((lesson, lessonIndex) => {
        lesson.groupName = group.name;
        lesson.lessonNum = lessonIndex + 1;
      });
    }
    Object.assign(allChanges, group.changes);

    group.timetable.forEach((lessons, index) => {
      lessons.forEach((lesson, lessonIndex) => {
        lesson.groupName = group.name;
        lesson.lessonNum = lessonIndex + 1;
      });
      allDisciplines[index] = allDisciplines[index].concat(lessons);
    });
  });

  return {
    type: GROUPS_SAVED,
    payload: {
      groups: groups,
      changes: allChanges,
      disciplines: allDisciplines
    }
  };
};

export const classroomsSave = classrooms => {
  return {
    type: CLASSROOMS_SAVED,
    payload: classrooms
  };
};

export const teachersSave = teachers => {
  return {
    type: TEACHERS_SAVED,
    payload: teachers
  };
};
