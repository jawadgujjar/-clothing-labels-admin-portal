import React from "react";
import { Form, Input, Button, notification, Row, Col, Card } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../utils/axios";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phonenumber: "",
      role: "admin",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
      name: Yup.string().required("Name is required"),
      phonenumber: Yup.string().required("Phone number is required"),
      role: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        await register.post("/", values);
        console.log(values);
        notification.success({
          message: "Registration Successful",
          description: "You have successfully registered!",
        });
      } catch (error) {
        notification.error({
          message: "Registration Failed",
          description: "There was an error during registration.",
        });
      }
    },
  });

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card
          title="Create an Account"
          bordered={false}
          style={{ borderRadius: "8px" }}
        >
          <Form layout="vertical" onFinish={formik.handleSubmit}>
            <Form.Item
              label="Name"
              validateStatus={
                formik.touched.name && formik.errors.name ? "error" : ""
              }
              help={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
            >
              <Input
                name="name"
                placeholder="Enter your full name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
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
                placeholder="Enter your email"
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
                placeholder="Create a password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              validateStatus={
                formik.touched.phonenumber && formik.errors.phonenumber
                  ? "error"
                  : ""
              }
              help={
                formik.touched.phonenumber && formik.errors.phonenumber
                  ? formik.errors.phonenumber
                  : ""
              }
            >
              <Input
                name="phonenumber"
                placeholder="Enter your phone number"
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button type="link" href="/login">
                Already have an account? Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;
