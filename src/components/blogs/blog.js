import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Steps,
  Form,
  Input,
  Upload,
  message,
  Space,
  Image,
  Table,
  Popconfirm,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { blog } from "../../utils/axios";
import "./blog.css";

const { Step } = Steps;

function Blog1() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headings, setHeadings] = useState([]);
  const [newHeading, setNewHeading] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [fileList, setFileList] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blog.get("/"); // Replace with your actual GET API endpoint
        setSubmittedData(response.data); // Assuming response.data contains the list of blogs
      } catch (error) {
        message.error("Failed to fetch blog posts.");
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target.result;
        setImage(base64String);
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const addHeading = () => {
    if (newHeading && newDescription) {
      setHeadings([
        ...headings,
        { heading: newHeading, description: newDescription },
      ]);
      setNewHeading("");
      setNewDescription("");
    } else {
      message.error("Please provide both a heading and a description.");
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentStep(0);
    setTitle("");
    setDescription("");
    setHeadings([]); // Reset headings when modal is closed
    setNewHeading("");
    setNewDescription("");
    setEditingIndex(null); // Reset the editing state when modal is closed
  };

  const handleSubmit = async () => {
    const blogData = {
      title: title,
      description: description,
      image: image,
      titledescriptions: headings.map((item) => ({
        descriptionTitle: item.heading,
        text: item.description,
      })),
    };

    try {
      if (editingIndex !== null) {
        const updatedData = [...submittedData];
        updatedData[editingIndex] = blogData;
        setSubmittedData(updatedData);
        message.success("Blog post updated!");
      } else {
        const response = await blog.post("/", blogData);
        setSubmittedData([response.data, ...submittedData]);
        message.success("Blog post submitted!");
      }

      closeModal();
    } catch (error) {
      message.error("Failed to submit blog post!");
      console.error("Error submitting blog:", error);
    }
  };

  const handleEdit = (index) => {
    const blogToEdit = submittedData[index];
    setTitle(blogToEdit.title);
    setDescription(blogToEdit.description);
    setHeadings(blogToEdit.headings || []);
    setImage(blogToEdit.image);
    setEditingIndex(index);
    setCurrentStep(0);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Make the API call to delete the blog post using axios
      const response = await blog.delete(`/${id}`); // Adjust the URL based on your backend

      // Checking for 204 status code for successful deletion
      if (response.status === 204) {
        // Filter out the deleted blog post from the state
        const updatedData = submittedData.filter((blog) => blog.id !== id); // Adjust based on your data structure
        setSubmittedData(updatedData); // Update the state with the remaining blogs
        message.success("Blog post deleted!"); // Show success message
      } else {
        throw new Error("Failed to delete blog post");
      }
    } catch (error) {
      message.error("Error deleting blog post!"); // Show error message if the API call fails
    }
  };

  // Columns for the Table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image width={100} src={image} alt="Blog Image" />,
    },
    {
      title: "Headings",
      dataIndex: "headings",
      key: "headings",
      render: (headings) => (
        <div>
          {(headings || []).map((item, index) => (
            <div key={index}>
              <strong>{item.heading}</strong>: {item.description}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record, index) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="danger" size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={openModal}>
        Add Blog +
      </Button>

      <Modal
        title={editingIndex !== null ? "Edit Blog" : "Create New Blog"}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={800}
      >
        <Steps
          current={currentStep}
          onChange={setCurrentStep}
          direction="horizontal"
        >
          <Step title="Step 1" description=" Enter blog information" />
          <Step
            title="Step 2"
            description=" Enter blog description in detail"
          />
        </Steps>

        <Form layout="vertical">
          {currentStep === 0 && (
            <>
              <Form.Item label="Upload Image">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false} // Prevent auto-upload
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>

              {image && (
                <Form.Item label="Image Preview">
                  <Image
                    width={200}
                    src={image.thumbUrl || image}
                    alt="Uploaded image"
                  />
                </Form.Item>
              )}

              <Form.Item label="Title">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </Form.Item>

              <Form.Item label="Description">
                <Input.TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={4}
                />
              </Form.Item>
            </>
          )}

          {currentStep === 1 && (
            <>
              <Form.Item label="Add Heading">
                <Input
                  value={newHeading}
                  onChange={(e) => setNewHeading(e.target.value)}
                  placeholder="Enter heading"
                />
              </Form.Item>

              <Form.Item label="Add Description">
                <Input.TextArea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={4}
                />
              </Form.Item>

              <Button onClick={addHeading} type="dashed">
                Add Heading and Description
              </Button>

              <div style={{ marginTop: "20px" }}>
                <h3>Added Headings and Descriptions:</h3>
                {headings && headings.length > 0 ? (
                  headings.map((item, index) => (
                    <Space key={index} direction="vertical">
                      <div>
                        <strong>{item.heading}</strong>: {item.description}
                      </div>
                    </Space>
                  ))
                ) : (
                  <p>No headings and descriptions added yet.</p>
                )}
              </div>
            </>
          )}
        </Form>

        <div className="modal-actions">
          {currentStep > 0 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Previous
            </Button>
          )}
          {currentStep < 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {currentStep === 1 && (
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Modal>

      <Table
        columns={columns}
        dataSource={submittedData}
        rowKey={(record, index) => index}
        pagination={false}
      />
    </div>
  );
}

export default Blog1;
