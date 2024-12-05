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
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminPortal = () => {
  const [activeContent, setActiveContent] = useState("Welcome");
  const navigate = useNavigate(); // Initialize useNavigate

  const renderContent = () => {
    switch (activeContent) {
      case "Users":
        return <Users1 />;
      case "Orders":
        return <Order />;
      case "Get a Quote":
        return <Quote />;
      case "Blog Management":
        return <Blog1 />;
      case "All Clothing":
        return <AllCloth1 />;
      case "All Hang Tags":
        return <AllHangtags1 />;
      case "Request a Quote":
        return <Requestquote1 />;
      default:
        return (
          <div>
            <p>Please Select Any Option from Side bar</p>
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
          <h4>Hi, Ahsan</h4>
        </div>
        <nav className="sidebar-links">
          <a onClick={() => setActiveContent("Dashboard")}>Dashboard</a>
          <a onClick={() => setActiveContent("Users")}>Users</a>
          <a onClick={() => setActiveContent("Orders")}>Orders</a>
          <a onClick={() => setActiveContent("Get a Quote")}>Get a Quote</a>
          <a onClick={() => setActiveContent("Blog Management")}>
            Blog Management
          </a>
          <a className="dropdown">
            Products
            <div className="dropdown-menu">
              <a onClick={() => setActiveContent("All Clothing")}>
                All Clothing
              </a>
              <a onClick={() => setActiveContent("All Hang Tags")}>
                All Hang Tags
              </a>
              <a onClick={() => setActiveContent("Request a Quote")}>
                Request a Quote
              </a>
            </div>
          </a>
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
