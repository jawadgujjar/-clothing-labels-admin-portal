import React, { useEffect, useState } from "react";
import { hangtag, seo } from "../utils/axios"; // Adjust path accordingly
import { Table, Button, message, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Import icons

const AllHangtags1 = () => {
  const [hangtags, setHangtags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // State to store the ID
  const [form] = Form.useForm(); // Use form hook

  const showModal = (id) => {
    setIsModalOpen(true);
    console.log(id);
    setSelectedId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Fetch hangtags on mount
  useEffect(() => {
    hangtag
      .get("/") // Relative path based on baseURL
      .then((response) => {
        setHangtags(response.data.results); // Save data in state
      })
      .catch((error) => {
        console.error("Error fetching hangtags:", error); // Handle error
      });
  }, []);

  // Handle delete action
  const handleDelete = (hangtagId) => {
    const token = localStorage.getItem("token");
    hangtag
      .delete(`/${hangtagId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Assuming the API has a delete endpoint like '/hangtags/:id'
      .then(() => {
        message.success("Hangtag deleted successfully!");
        setHangtags((prevHangtags) =>
          prevHangtags.filter((item) => item._id !== hangtagId)
        ); // Remove hangtags from state
      })
      .catch((error) => {
        message.error("Failed to delete the hangtag");
        console.error("Error deleting hangtag:", error);
      });
  };

  const onFinish = (values) => {
    setIsModalOpen(false);
    const token = localStorage.getItem("token");

    // Convert metaKeywords string to an array
    const keywordsArray = values.metaKeywords
      .split(",")
      .map((keyword) => keyword.trim());
console.log(selectedId)
    const data1 = {
      productId: selectedId,
      title: values.metaTitle,
      description: values.metaDescription,
      keywords: keywordsArray, // Send the keywords as an array
      script: values.script,
    };

    seo
      .post("/", data1, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  // Define columns for the Table component
  const columns = [
    {
      title: "Title",
      dataIndex: "title", // Matching with hangtags data key
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
        <img src={image} alt="hangtag" style={{ width: "50px" }} />
      ), // Display image thumbnail
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Link to={`/edithangtag/${record._id}`}>
            <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            type="danger"
            onClick={() => handleDelete(record._id)}
          />
          <Button type="primary" onClick={() => showModal(record.id)}>
            {" "}
            Add SEO
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Hangtags</h1>
      <Link to="/addhangtag">
        <Button type="primary" style={{ marginBottom: "16px" }}>
          Add Hangtag
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={hangtags} // Data passed to the table
        rowKey="_id" // Unique identifier for each row
        pagination={{ pageSize: 10 }} // Pagination settings (10 items per page)
        bordered // Add border to the table
        title={() => "Hangtag List"} // Optional title for the table
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
            <Input />
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

export default AllHangtags1;
