import React, { Fragment } from "react";
import Router from "./Router";
import { init } from "./redux/reducers/index";
import { Provider } from "react-redux";
import { authUserLoaded } from "./redux/action/auth";
import setAuthTokens from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthTokens(localStorage.token);
}
const App = () => {
  const store = init();
  React.useEffect(() => {
    store.dispatch(authUserLoaded());
  }, [store]);

  return (
    <Provider store={store}>
      <Fragment>
        <Router />
      </Fragment>
    </Provider>
  );
};

export default App;
