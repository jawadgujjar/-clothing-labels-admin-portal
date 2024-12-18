import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd"; // Import Modal and Button from Ant Design
import "./users.css";
import { users } from "../utils/axios";

const Users1 = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users from API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await users.get("/", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token as Authorization header
          },
        });
        setData(response.data.results);
        localStorage.setItem("totalusers", response.data.results.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const showModal = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Update user in the data state after modifying currentUser
    setData((prevData) =>
      prevData.map((user) =>
        user.key === currentUser.key ? currentUser : user
      )
    );
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const confirmDelete = (id, role) => {
    // Check if the role is 'admin'
    if (role === "admin") {
      // Show a message if the role is admin
      Modal.info({
        title: "Cannot Delete",
        content: "This is an admin user. Deletion is not allowed.",
      });
      return; // Prevent further execution
    }

    Modal.confirm({
      title: "Are you sure to delete this user?",
      onOk: () => deleteUser(id),
    });
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      await users.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token as Authorization header
        },
      });

      // Remove user from the frontend after successful deletion
      setData((prevData) => prevData.filter((user) => user.id !== id)); // Use user.id
      console.log(`User with id ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-container">
      <h1 className="users-title">Users List</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phonenumber}</td>
              <td>{user.email}</td>
              <td>
                <Button className="edit-button" onClick={() => showModal(user)}>
                  Edit
                </Button>
                <Button
                  className="delete-button"
                  onClick={() => confirmDelete(user.id, user.role)} // Pass user.role here
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing User */}
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {currentUser && (
          <div className="modal-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
                className="modal-input"
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={currentUser.phone}
                onChange={handleInputChange}
                className="modal-input"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                className="modal-input"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={currentUser.password}
                onChange={handleInputChange}
                className="modal-input"
              />
            </label>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users1;
