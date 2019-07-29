import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUsers } from "../actions/users";
import Users from "../components/users/users.jsx";

function mapStateToProps(state, router) {
  const { items, error } = state.users;
  const appId = router.match.params.id;

  return { error, items, appId };
}

function mapDispatchToProps(dispatch, router) {
  return {
    fetchUsers: (id, offset) => dispatch(fetchUsers(id, offset))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
