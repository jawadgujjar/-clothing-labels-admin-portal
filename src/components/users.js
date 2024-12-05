import React, { useState } from 'react';
import { Modal } from 'antd'; // Import Modal from Ant Design
import './users.css';
import { parsePath } from 'react-router-dom';

const Users1 = () => {
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      password: 'password123',
    },
    {
      key: '2',
      name: 'Jane Smith',
      phone: '234-567-8901',
      email: 'jane.smith@example.com',
      password: 'password456',
    },
    {
      key: '3',
      name: 'Sam Brown',
      phone: '345-678-9012',
      email: 'sam.brown@example.com',
      password: 'password789',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const showModal = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setData(prevData =>
      prevData.map(user =>
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

  const confirmDelete = (key) => {
    Modal.confirm({
      title: 'Are you sure to delete this user?',
      onOk: () => deleteUser(key),
    });
  };

  const deleteUser = (key) => {
    setData(prevData => prevData.filter(user => user.key !== key));
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
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.key}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button className="edit-button" onClick={() => showModal(user)}>Edit</button>
                <button className="delete-button" onClick={() => confirmDelete(user.key)}>Delete</button>
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

 