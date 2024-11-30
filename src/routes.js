import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "antd";
import Sider1 from "./components/sider/sider";
import AddProduct from "./components/productdetail";

const { Content } = Layout; // Import Content from Ant Design Layout

const AppRoutes = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider1 />
        <Layout>
          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/addproduct" element={<AddProduct />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
