import { TEACHERS_SELECT_HANDLER } from "../types";

export const teacherSelectHandler = teacherIndex => {
  return {
    type: TEACHERS_SELECT_HANDLER,
    payload: teacherIndex
  };
};
