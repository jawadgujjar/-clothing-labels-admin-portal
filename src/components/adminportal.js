import React, { useState } from "react";
import "./adminportal.css";
import Users1 from "./users";
import Order from "./orderdetail/order";
import Quote from "./quote";
import Blog1 from "./blogs/blog";
import AllCloth1 from "./allclothing";
import AllHangtags1 from "./allhangtags";
import Requestquote1 from "./requestquote";
import Dashboard from "./sider/dashboard";
import { Dropdown, Menu } from "antd";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Designquote from "./designquote";
import PendingCheckoutTable from "./pendingcheckout";
import Subscribeemail from "./subscribeemails/subscribeemail";

const AdminPortal = () => {
  const [activeContent, setActiveContent] = useState("Welcome");
  const navigate = useNavigate(); // Initialize useNavigate
  const username = localStorage.getItem("username");

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={() => setActiveContent("All Clothing")}>All Clothing</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={() => setActiveContent("All Hang Tags")}>All Hang Tags</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a onClick={() => setActiveContent("Request a Quote")}>
          Request a Quote
        </a>
      </Menu.Item>
    </Menu>
  );

  const renderContent = () => {
    switch (activeContent) {
      case "Users":
        return <Users1 />;
      case "Orders":
        return <Order />;
      case "Get a Quote":
        return <Quote />;
      case "Design Quote":
        return <Designquote />;
      case "Blog Management":
        return <Blog1 />;
      case "All Clothing":
        return <AllCloth1 />;
      case "All Hang Tags":
        return <AllHangtags1 />;
      case "Pending Checkouts":
        return <PendingCheckoutTable />;
      case "Request a Quote":
        return <Requestquote1 />;
      case "Subscribed Emails":
        return <Subscribeemail />; // Add case for Subscribed Emails
      default:
        return (
          <div>
            <p>Please Select Any Option from the Sidebar</p>
            <Dashboard />
          </div>
        );
    }
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to login or homepage using useNavigate
    navigate("/login");
  };

  return (
    <div className="admin-portal">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h4>Hi, {username}</h4>
        </div>
        <nav className="sidebar-links">
          <a onClick={() => setActiveContent("Dashboard")}>Dashboard</a>
          <a onClick={() => setActiveContent("Users")}>Users</a>
          <a onClick={() => setActiveContent("Orders")}>Orders</a>
          <a onClick={() => setActiveContent("Get a Quote")}>Get a Quote</a>
          <a onClick={() => setActiveContent("Design Quote")}>Design Quote</a>
          <a onClick={() => setActiveContent("Blog Management")}>
            Blog Management
          </a>
          <a onClick={() => setActiveContent("Pending Checkouts")}>
            Pending Checkouts
          </a>
          <a onClick={() => setActiveContent("Subscribed Emails")}>Subscribed Emails</a> {/* Add this line */}
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            className="products-dropdown"
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Products <DownOutlined />
            </a>
          </Dropdown>
          <button className="logout-btn" onClick={handleLogout}>
            <LogoutOutlined /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>{activeContent}</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPortal;
