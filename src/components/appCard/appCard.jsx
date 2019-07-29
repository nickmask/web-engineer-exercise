import React from "react";
import { Link } from "react-router-dom";

import styles from "./appCard.module.css";

export default class AppCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      editLogoUrl: "",
      editName: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { editLogoUrl, editName } = this.state;

    const data = {
      logo: editLogoUrl ? editLogoUrl : this.props.logo,
      name: editName ? editName : this.props.name
    };

    try {
      this.props.updateAppDetails(this.props.id, data);
    } catch (error) {
      alert("Error updating app. Please try again");
    }

    this.setState({
      isEditing: false,
      editLogoUrl: "",
      editName: ""
    });
  }

  handleEdit() {
    this.setState({
      isEditing: true
    });
  }

  handleCancel() {
    this.setState({
      isEditing: false,
      editLogoUrl: "",
      editName: ""
    });
  }

  render() {
    const { name, id, logo } = this.props;
    const { editName, editLogoUrl, isEditing } = this.state;

    return (
      <li className={styles.container}>
        <Link className={styles.app} to={`/apps/${id}/0`}>
          <img src={logo} alt={name} width="100" height="100" />
          <p className={styles.name} aria-label="App title">
            {name}
          </p>
        </Link>
        {isEditing ? (
          <div>
            <input
              type="text"
              placeholder="Enter image URL"
              name="editLogoUrl"
              value={editLogoUrl}
              onChange={this.handleInput}
            />
            <input
              type="text"
              placeholder="Enter name"
              name="editName"
              value={editName}
              onChange={this.handleInput}
            />
            <div>
              <button type="submit" onClick={this.handleSubmit}>
                Submit
              </button>
              <button type="submit" onClick={this.handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button type="submit" onClick={this.handleEdit}>
              Edit
            </button>
          </div>
        )}
      </li>
    );
  }
}
