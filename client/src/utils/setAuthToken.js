import axios from "axios";
const setAuthTokens = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthTokens;
