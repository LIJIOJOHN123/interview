import { FETCH_DATA } from "../action/typeof";

const initialState = {
  data: [],
  loading: true
};
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};
