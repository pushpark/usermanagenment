import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

class UserForm extends React.Component {
  state = {
    formData: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    },
    error: "",
    isEditing: false,
  };

  componentDidMount() {
    const { state } = this.props.location;
    if (state?.user) {
      const { user } = state;
      this.setState({
        formData: {
          id: user.id,
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1] || "",
          email: user.email,
          department: user.company?.name || "",
        },
        isEditing: true,
      });
    }
  }

  onClickInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: { ...this.state.formData, [name]: value },
      error: "",
    });
  };

  validateForm = () => {
    const { formData } = this.state;

    if (
      !formData.id ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.department
    ) {
      this.setState({ error: "All fields are required." });
      return false;
    }

    return true;
  };

  onClickSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) return;
    const { isEditing, formData } = this.state;
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      this.props.navigate("/");
    } catch (err) {
      console.error("Failed to save user.");
    }
  };

  render() {
    const { formData, error, isEditing } = this.state;

    return (
      <div className="user-form-container-bg">
        <h1 className="user-form-heading">
          {isEditing ? "Edit User" : "Add User"}
        </h1>
        <form className="user-form-container">
          <div>
            <label className="label">ID:</label>
            <input
              name="id"
              value={formData.id}
              placeholder="Enter id"
              onChange={this.onClickInputChange}
              disabled={isEditing}
              className="input"
            />
          </div>
          <div>
            <label className="label">First Name:</label>
            <input
              name="firstName"
              value={formData.firstName}
              placeholder="Enter first name"
              onChange={this.onClickInputChange}
              className="input"
            />
          </div>
          <div>
            <label className="label">Last Name:</label>
            <input
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={this.onClickInputChange}
              className="input"
            />
          </div>
          <div>
            <label className="label">Email:</label>
            <input
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={this.onClickInputChange}
              className="input"
            />
          </div>
          <div>
            <label className="label">Department:</label>
            <input
              name="department"
              placeholder="Enter department"
              value={formData.department}
              onChange={this.onClickInputChange}
              className="input"
            />
          </div>
          <div>
            <button onClick={this.onClickSubmit} className="buttons">
              {isEditing ? "Update User" : "Add User"}
            </button>
            <button
              onClick={() => this.props.navigate("/")}
              className="buttons"
            >
              Cancel
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    );
  }
}

const UserFormComponent = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return <UserForm {...props} location={location} navigate={navigate} />;
};

export default UserFormComponent;
