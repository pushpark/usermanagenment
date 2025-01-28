import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

class UsersList extends Component {
  state = { usersList: [], loading: true, error: null };

  componentDidMount() {
    this.fetchUsersList();
  }

  fetchUsersList = async () => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.setState({ usersList: response.data, loading: false });
    } catch (err) {
      this.setState({ error: "Failed to fetch users.", loading: false });
    }
  };

  onClickDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState({
        users: this.state.users.filter((user) => user.id !== id),
      });
    } catch (err) {
      this.setState({ error: "Failed to delete user." });
    }
  };

  renderUsersList = () => {
    const { usersList } = this.state;
    return (
      <div className="inner-container">
        <Link to="/form" className="add-link">
          <button className="add-button">+Add User</button>
        </Link>
        <h2 className="users-heading">Users</h2>
        <ul className="users-container">
          {usersList.map((user) => (
            <li key={user.id} className="user">
              <p className="image">{user.name[0]}</p>
              <div className="user-details">
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Department:</strong> {user.company?.name}
                </p>
              </div>
              <div>
                <Link to={`/form`} state={{ user }}>
                  <button className="button">Edit</button>
                </Link>
                <button
                  className="button"
                  onClick={() => this.onClickDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    const { loading, error } = this.state;

    if (loading)
      return <p className="loading-or-error-text">Loading users...</p>;
    if (error) return <p className="loading-or-error-text">{error}</p>;

    return (
      <div className="dashboard-bg">
        <h1 className="heading">User Management Dashboard</h1>
        {this.renderUsersList()}
      </div>
    );
  }
}

export default UsersList;
