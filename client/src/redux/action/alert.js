import { ALERT_SET, ALERT_REMOVE } from "./typeof";

export const alertSet = (msg, alertType) => dispatch => {
  const id = Math.floor(Math.random() * 1000);
  dispatch({ type: ALERT_SET, payload: { id, msg, alertType } });
  setTimeout(() => dispatch({ type: ALERT_REMOVE, payload: id }), 2000);
};
