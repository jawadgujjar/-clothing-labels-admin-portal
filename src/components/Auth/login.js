import React from "react";
import { Form, Input, Button, notification, Row, Col, Card } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../utils/axios"; // Implement the login API call
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Call the API to verify credentials
        const response = await login.post("/", values);

        // Check if the role is admin
        if (response.data.user.role === "admin") {
          // Save token to localStorage
          localStorage.setItem("token", response.data.tokens.access.token);
          notification.success({
            message: "Login Successful",
            description: "Welcome, Admin!",
          });

          // Redirect or navigate to dashboard
          navigate("/dashboard");
        } else {
          notification.error({
            message: "Access Denied",
            description: "Only admin users are allowed to log in.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Login Failed",
          description: "Invalid email or password.",
        });
      }
    },
  });

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card
          title={
            <span>
              <h1>Admin Login</h1>
            </span>
          } // Add custom class
          bordered={false}
          style={{ borderRadius: "8px" }}
        >
          <Form layout="vertical" onFinish={formik.handleSubmit}>
            <Form.Item
              label="Email"
              validateStatus={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
              help={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your admin email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={
                formik.touched.password && formik.errors.password ? "error" : ""
              }
              help={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            >
              <Input.Password
                name="password"
                placeholder="Enter your admin password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
            <Link to="/register">
              <Button type="primary" block>
                Don't have an account? Register Now
              </Button>
            </Link>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;