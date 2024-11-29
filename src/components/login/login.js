import React from "react";
import { Row, Col, Form, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom"; // Correct import for Link
import "./login.css"; // Import your custom styles

const { Text } = Typography;

function Login() {
  return (
    <div className="login-container">
      <Row justify="center" align="middle" className="login-row">
        {/* Left Column: Welcome text and Registration Link */}
        <Col xs={24} sm={16} md={16} lg={12} className="login-left-column">
          <h2 className="login-welcome-text">Welcome to Custom Woven Labels</h2>
          <p className="login-description">Admin Portal</p>
          <div className="register-option">
            <p>
              If you don't have an account,{" "}
              <Link to="/register" className="register-link">
                Register here
              </Link>
            </p>
          </div>
        </Col>

        {/* Right Column: Login form */}
        <Col xs={24} sm={16} md={16} lg={12} className="login-right-column">
          <h3 className="login-form-heading">Please Login</h3>

          <Form className="login-form">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="login-form-item"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="login-form-item"
              />
            </Form.Item>

            {/* Forgot Password link */}
            <div className="forgot-password">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <Form.Item>
              {" "}
              <Button
                type="primary"
                htmlType="submit"
                className="login-submit-btn"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
