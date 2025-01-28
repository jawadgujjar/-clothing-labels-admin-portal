import React, { useEffect, useState } from "react";
import { products, seo } from "../utils/axios"; // Adjust path accordingly
import { Table, Button, message, Modal, Form, Input, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Import icons

const AllCloth1 = () => {
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // State to store the ID
  const [keywords, setKeywords] = useState([]); // State to store the keywords as an array
  const [form] = Form.useForm(); // Use form hook

  const showModal = (id) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Fetch products on mount
  useEffect(() => {
    products
      .get("/") // Relative path based on baseURL
      .then((response) => {
        setProduct(response.data.results); // Save data in state
        console.log(response.data.results, "all products");
      })
      .catch((error) => {
        console.error("Error fetching products:", error); // Handle error
      });
  }, []);

  // Handle delete action
  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    products
      .delete(`/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Assuming the API has a delete endpoint like '/products/:id'
      .then(() => {
        message.success("Product deleted successfully!");
        setProduct((prevProducts) =>
          prevProducts.filter((item) => item._id !== productId)
        ); // Remove product from state
      })
      .catch((error) => {
        message.error("Failed to delete the product");
        console.error("Error deleting product:", error);
      });
  };

  const onFinish = (values) => {
    setIsModalOpen(false);
    const token = localStorage.getItem("token");
    console.log("SEO Data:", values);

    const data1 = {
      productId: selectedId,
      title: values.metaTitle,
      description: values.metaDescription,
      keywords: keywords, // Use the keywords state array
      script: values.script,
    };

    seo
      .post("/", data1, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Assuming the API endpoint is '/seo' for adding SEO data
      .then(() => {
        message.success("SEO data added successfully!");
        form.resetFields(); // Reset the form fields after successful submission
        setIsModalOpen(false); // Close the modal after successful submission
      })
      .catch((error) => {
        message.error("Failed to add SEO data");
        console.error("Error adding SEO data:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleAddKeyword = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setKeywords((prevKeywords) => [...prevKeywords, e.target.value]);
      e.target.value = ""; // Clear the input after adding
    }
  };

  const handleDeleteKeyword = (keyword) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((item) => item !== keyword)
    );
  };

  // Define columns for the Table component
  const columns = [
    {
      title: "Title",
      dataIndex: "title", // Matching with product data key
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title), // Optional sorting
    },
    {
      title: "Description",
      dataIndex: "descriptions",
      key: "description",
      render: (descriptions) =>
        descriptions[0]?.descriptionTitle || "No Description", // Display description title
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="product" style={{ width: "50px" }} />
      ), // Display image thumbnail
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Link to={`/editproduct/${record._id}`}>
            <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            type="danger"
            onClick={() => handleDelete(record._id)}
          />
          <Button type="primary" onClick={() => showModal(record._id)}>
            Add SEO
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Products</h1>
      <Link to="/addproduct">
        <Button type="primary" style={{ marginBottom: "16px" }}>
          Add Product
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={product} // Data passed to the table
        rowKey="_id" // Unique identifier for each row
        pagination={{ pageSize: 10 }} // Pagination settings (10 items per page)
        bordered // Add border to the table
        title={() => "Product List"} // Optional title for the table
      />
      <Modal
        title="Add SEO Data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="seoForm"
          labelCol={{
            span: 6, // Adjust label width as per your need
          }}
          wrapperCol={{
            span: 18, // Adjust input width as per your need
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Meta Title"
            name="metaTitle"
            rules={[
              {
                required: true,
                message: "Please input your meta title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Meta Description"
            name="metaDescription"
            rules={[
              {
                required: true,
                message: "Please input your meta description!",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Meta Keywords"
            name="metaKeywords"
            rules={[
              {
                required: true,
                message: "Please input your meta keywords!",
              },
            ]}
          >
            <Space direction="vertical">
              {/* Displaying keywords as tags */}
              <div>
                {keywords.map((keyword, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleDeleteKeyword(keyword)}
                  >
                    {keyword}
                  </Tag>
                ))}
              </div>
              {/* Input for adding keywords */}
              <Input
                onKeyDown={handleAddKeyword}
                placeholder="Press Enter to add a keyword"
              />
            </Space>
          </Form.Item>

          <Form.Item
            label="Script"
            name="script"
            rules={[
              {
                required: true,
                message: "Please input your script!",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              style={{ display: "flex", justifyContent: "right" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllCloth1;
