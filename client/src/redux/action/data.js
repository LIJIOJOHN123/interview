import axios from "axios";
import { FETCH_DATA } from "./typeof";

export const fetchData = () => async dispatch => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  dispatch({ type: FETCH_DATA, payload: res.data });
};
