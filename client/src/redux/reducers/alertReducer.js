import { ALERT_SET, ALERT_REMOVE } from "../action/typeof";

const initialState = [];

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ALERT_SET:
      return [...state, payload];
    case ALERT_REMOVE:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};
