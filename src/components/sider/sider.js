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

// Example components for each route
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
     <Fancyhangtags1/>
  </div>
);
// const AllHangTags = () => <div>This is All Hang Tags Content</div>;
const Orders = () => <div>This is Orders Content</div>;
const GetAQuote = () => <div>This is Get a Quote Content</div>;
const BlogManagement = () => <div>This is Blog Management Content</div>;

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
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Dashboard
          </Link>
        </h3>
        <hr style={{ border: "1px solid #fff", margin: "0 16px" }} />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/users">User</Link>
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
            <Route path="/" element={<Dashboard />} />{" "}
            {/* Route for Dashboard */}
            <Route path="/users" element={<Users />} />
            <Route path="/all-clothing" element={<AllClothing />} />
            <Route path="/all-hangtags" element={<AllHangTags />} />
            <Route path="/fancy-hangtags" element={<FancyHangTags />} />
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
