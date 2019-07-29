import React from "react";
import { Link } from "react-router-dom";

import AppCard from "../appCard/appCard.jsx";
import Loading from "../loading/loading.jsx";

import styles from "./apps.module.css";

export default function Apps({ error, items, fetchApps, updateAppDetails }) {
  if (!items || !items.length) {
    fetchApps();
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h1>Apps</h1>
      <ul id="apps" className={styles.apps}>
        {items.map(({ id, name, logo }) => {
          return (
            <AppCard
              key={id}
              name={name}
              id={id}
              logo={logo}
              updateAppDetails={updateAppDetails}
            />
          );
        })}
      </ul>
    </div>
  );
}
