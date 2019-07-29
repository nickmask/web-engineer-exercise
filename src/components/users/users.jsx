import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import UserCard from "../userCard/userCard.jsx";
import Loading from "../loading/loading.jsx";

import styles from "./users.module.css";

function buildPagination(id, page) {
  return (
    <ul className="nav">
      <li>
        <Link to={`/apps/${id}/${page - 1}`}>Previous</Link>
      </li>
      <li>
        <Link to={`/apps/${id}/${page + 1}`}>Next</Link>
      </li>
    </ul>
  );
}

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.defaultOffsetSize = 25;
  }

  componentDidMount() {
    const { items, match, appId, fetchUsers } = this.props;
    const page = parseInt(match.params.page);

    const offset = this.defaultOffsetSize * page;

    if (!items || !items.length) {
      fetchUsers(appId, offset);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const { items, match, appId, fetchUsers } = this.props;
      const page = parseInt(match.params.page);

      const offset = this.defaultOffsetSize * page;

      fetchUsers(appId, offset);
    }
  }

  render() {
    const { error, items, appId, match } = this.props;
    const page = parseInt(match.params.page);

    if (!items || !items.length) {
      return <Loading />;
    }

    return (
      <div id="users">
        <h1>Apps</h1>
        {buildPagination(appId, page)}
        <ul className={styles.usersContainer}>
          {items.map(({ id, name, email, avatar }) => {
            return (
              <UserCard key={id} name={name} email={email} avatar={avatar} />
            );
          })}
        </ul>
        {buildPagination(appId, page)}
      </div>
    );
  }
}

export default withRouter(Users);
