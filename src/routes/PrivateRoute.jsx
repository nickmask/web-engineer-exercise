import React from "react";
import { Route, Redirect } from "react-router-dom";

import Loading from "../components/loading/loading.jsx";

import { isValidToken } from "../actions/sign-in";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCheckingAuth: true,
      validToken: false
    };
  }

  async componentDidMount() {
    try {
      const isTokenValid = await isValidToken();
      if (isTokenValid) {
        this.setState({
          isCheckingAuth: false,
          validToken: true
        });
      } else {
        this.setState({
          isCheckingAuth: false,
          validToken: false
        });
      }
    } catch (error) {
      alert("Error authenticating user. Please try again later");
    }
  }

  render() {
    const { isCheckingAuth, validToken } = this.state;
    const { component: Component, ...rest } = this.props;

    return (
      <>
        {isCheckingAuth ? (
          <Loading />
        ) : (
          <Route
            {...rest}
            render={props =>
              validToken ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/", state: { from: props.location } }}
                />
              )
            }
          />
        )}
      </>
    );
  }
}

export default PrivateRoute;
