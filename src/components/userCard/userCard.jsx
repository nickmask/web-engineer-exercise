import React from "react";

import styles from "./userCard.module.css";

export default function UserCard({ name, email, avatar }) {
  return (
    <li className={styles.card}>
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={avatar} alt={name} />
      </div>
      <div className={styles.name}>
        <p aria-label="Name">{name}</p>
      </div>
      <div className={styles.email}>
        <p aria-label="Email address">
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </li>
  );
}
