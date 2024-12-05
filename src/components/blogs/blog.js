import React, { useState } from "react";
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
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the blog being edited
  const [fileList, setFileList] = useState();

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj; // Get the uploaded file object
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target.result;
        setImage(base64String); // Store the Base64 string in the state
      };

      reader.readAsDataURL(file); // Convert file to Base64
    } else {
      setImage(null); // Clear image if no file is uploaded
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
    setHeadings([]);
    setNewHeading("");
    setNewDescription("");
    setEditingIndex(null); // Reset the editing state when modal is closed
  };

  const handleSubmit = async () => {
    const blogData = {
        title: title, // Title from state
        description: description, // Description from state
        image: image, // Base64 string from the uploaded file
        titledescriptions: headings.map((item) => ({
          descriptionTitle: item.heading,
          text: item.description,
        })), // Map headings to match titledescriptions schema
      };
    console.log(blogData);
    try {
      if (editingIndex !== null) {
        // Edit existing blog post logic (same as before)
        const updatedData = [...submittedData];
        updatedData[editingIndex] = blogData;
        setSubmittedData(updatedData);
        message.success("Blog post updated!");
      } else {
        // Use getquote to make a POST request for submitting the blog
        const response = await blog.post("/", blogData); // Replace '/blogs' with your actual API endpoint

        // Add the new blog data to the list
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
    setHeadings(blogToEdit.headings);
    setImage(blogToEdit.image);
    setEditingIndex(index); // Set the editing index to know which blog is being edited
    setCurrentStep(0); // Reset step to 0 for the edit
    setIsModalVisible(true); // Open the modal for editing
  };

  const handleDelete = (index) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1); // Remove the blog at the specified index
    setSubmittedData(updatedData);
    message.success("Blog post deleted!");
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
          {headings.map((item, index) => (
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
            onClick={() => handleEdit(index)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(index)}
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
                {headings.length > 0 ? (
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

          <div style={{ marginTop: "20px" }}>
            <Button
              style={{ marginRight: 8 }}
              onClick={prev}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep < 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {currentStep === 1 && (
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Modal>

      {/* Table to display the submitted blog data */}
      <div style={{ marginTop: "40px" }}>
        <h2>Submitted Blogs</h2>
        <Table
          columns={columns}
          dataSource={submittedData}
          rowKey={(record, index) => index}
        />
      </div>
    </div>
  );
}

export default Blog1;
