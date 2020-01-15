import { CLASSROOMS_SELECT_HANDLER } from "../types";

export const classroomSelectHandler = classroom => {
  return {
    type: CLASSROOMS_SELECT_HANDLER,
    payload: classroom
  };
};
