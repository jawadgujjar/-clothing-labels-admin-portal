import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import RegisterForm from "./components/Auth/register";
import LoginForm from "./components/Auth/login";
import PrivateRoute from "./components/privateroutes";
import AddProduct from "./components/productdetail";
import AdminPortal from "./components/adminportal";
import AllCloth1 from "./components/allclothing";

const { Content } = Layout;

// Helper function to check if token exists
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Replace 'token' with your token key
};

const AppRoutes = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Content style={{ padding: "20px" }}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="*"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoginForm />
                  )
                }
              />
              <Route
                path="/"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoginForm />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <RegisterForm />
                  )
                }
              />
              {/* Private routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<AdminPortal />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/all-cloth" element={<AllCloth1 />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
