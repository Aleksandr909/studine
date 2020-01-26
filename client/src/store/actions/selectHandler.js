import { SELECT_HANDLER, CALENDAR_SELECT_HANDLER } from "../types";

export const selectHandler = elem => {
  return {
    type: SELECT_HANDLER,
    payload: elem
  };
};
export const dateSelectHandler = date => {
  return {
    type: CALENDAR_SELECT_HANDLER,
    payload: date
  };
};
