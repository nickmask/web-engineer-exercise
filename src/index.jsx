import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import thunk from "redux-thunk";

import PrivateRoute from "./routes/PrivateRoute.jsx";
import SignIn from "./containers/sign-in.jsx";
import Apps from "./containers/Apps.jsx";
import Users from "./containers/Users.jsx";

import styles from "./index.module.css";

import rootReducer from "./reducers/root-reducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <div className={styles.container}>
      <header className={styles.header}>
        <span>Monzo App</span>
      </header>
      <main className={styles.main}>
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <PrivateRoute exact path="/apps" component={Apps} />
            <PrivateRoute path="/apps/:id/:page" component={Users} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </Router>
      </main>
      <footer className={styles.footer} />
    </div>
  </Provider>,
  document.getElementById("app")
);
