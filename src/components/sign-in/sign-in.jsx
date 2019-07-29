import React, { Component } from "react";

import styles from "./sign-in.module.css";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { type, value } = event.target;
    this.setState({ [type]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    await this.props.authenticate(email, password);

    this.props.redirect("/apps");
  }

  render() {
    const { error } = this.props;
    return (
      <div className={styles.container}>
        <form
          id="sign-in"
          className={styles.signIn}
          onSubmit={this.handleSubmit}
        >
          <input
            onChange={this.handleChange}
            placeholder="Email address"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <input
            onChange={this.handleChange}
            placeholder="Password"
            type="password"
          />
          <input type="submit" />
          {error && <p>Sign in failed. Please try again</p>}
        </form>
      </div>
    );
  }
}
