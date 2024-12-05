import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import './register.css'; // Import your custom styles
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';

const { Title } = Typography;

function Register() {
  return (
    <div className="register-container">
      <div className="register-form-container">
        <Title level={2} className="register-heading">   
          Please Register Your Account
        </Title>

        <Form className="register-form" layout="vertical">
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 8, message: 'Password must be at least 8 characters long!' },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number!' },
              { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits!' },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-submit-btn">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
