import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  EditOutlined,
  AppstoreAddOutlined,
  ShopOutlined, // Icon for All Clothing
  TagOutlined, // Icon for All Hang Tags
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Users1 from "../users";
import Dashboard from "./dashboard"; // Make sure this path is correct
import AllCloth1 from "../allclothing";
import AllHangtags1 from "../allhangtags";
import Fancyhangtags1 from "../fancyhangtags";
import Requestquote1 from "../requestquote";
import Quote from "../quote";
import Order from "../orderdetail/order";
import Login from "../login/login";
import Register from "../login/register";
import Blog1 from "../blogs/blog"; // Correct path to Blog1 component

// Example components for each route
const Log = () => (
  <div>
    <Login />
  </div>
);
const Users = () => (
  <div>
    <Users1 />
  </div>
);
const AllClothing = () => (
  <div>
    <AllCloth1 />
  </div>
);
const AllHangTags = () => (
  <div>
    <AllHangtags1 />
  </div>
);
const FancyHangTags = () => (
  <div>
    <Fancyhangtags1 />
  </div>
);
const Requestquote = () => (
  <div>
    <Requestquote1 />
  </div>
);
const GetAQuote = () => (
  <div>
    <Quote />
  </div>
);
const Orders = () => (
  <div>
    <Order />
  </div>
);
const BlogManagement = () => (
  <div>
    <Blog1 /> {/* Correctly closed Blog1 component */}
  </div>
);

const { Header, Sider, Content } = Layout;

const Sider1 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <h3 style={{ color: "#fff", padding: "16px", margin: 0 }}>
          <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
            Dashboard
          </Link>
        </h3>
        <hr style={{ border: "1px solid #fff", margin: "0 16px" }} />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="12" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<ShoppingCartOutlined />}>
            <Link to="/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<DollarOutlined />}>
            <Link to="/get-a-quote">Get a Quote</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<EditOutlined />}>
            <Link to="/blog-management">Blog Management</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="products"
            icon={<AppstoreAddOutlined />}
            title="Products"
          >
            <Menu.Item key="2" icon={<ShopOutlined />}>
              <Link to="/all-clothing">All Clothing</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<TagOutlined />}>
              <Link to="/all-hangtags">All Hang Tags</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<TagOutlined />}>
              <Link to="/fancy-hangtags">Fancy Hang Tags</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<TagOutlined />}>
              <Link to="/request-quote">Request a Quote</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Admin Portal Dashboard</h2>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/all-clothing" element={<AllClothing />} />
            <Route path="/all-hangtags" element={<AllHangTags />} />
            <Route path="/fancy-hangtags" element={<FancyHangTags />} />
            <Route path="/request-quote" element={<Requestquote />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/get-a-quote" element={<GetAQuote />} />
            <Route path="/blog-management" element={<BlogManagement />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sider1;
