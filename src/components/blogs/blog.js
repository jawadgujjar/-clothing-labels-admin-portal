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
  Tag,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Storage } from "../../firebaseConfig";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { blog, seo } from "../../utils/axios";
import "./blog.css";

const { Step } = Steps;
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Header sizes
    [{ align: [] }], // Text alignment options (left, center, right, justify)
    ["bold", "italic", "underline", "strike"], // Formatting buttons
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["blockquote", "code-block"], // Blockquote and code
    ["link", "image"], // Links and images
    ["clean"], // Clear formatting
  ],
};

const formats = [
  "header",
  "align",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
];

function Blog1() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [percent, setPercent] = useState("");
  const [url, setUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // State to store the ID
  const [keywords, setKeywords] = useState([]); // State to store the keywords as an array
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headings, setHeadings] = useState([]);
  const [newHeading, setNewHeading] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedHeadingIndex, setSelectedHeadingIndex] = useState(null);
  const date = new Date();
  const [newImage, setNewImage] = useState("");

  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const handleImageUpload = (e, setImageUrl) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      const uniqueFileName = `${uploadedFile.name}_${Date.now()}`; // Use a unique name
      const imageDocument = ref(Storage, `images/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(imageDocument, uploadedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      });

      uploadTask
        .then(() => {
          getDownloadURL(imageDocument)
            .then((Url) => {
              setImageUrl(Url); // Update the image URL state
              console.log("Image URL:", Url);
            })
            .catch((error) => {
              console.log(error.message, "Error getting the image URL");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const showModal = (id) => {
    setIsModalOpen(true);
    setSelectedId(id);
    console.log(id)
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blog.get("/"); // API call to fetch blogs
        console.log(response.data); // Check if the image URL is being returned
        setSubmittedData(response.data); // Assuming response.data contains the list of blogs
      } catch (error) {
        message.error("Failed to fetch blog posts.");
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const addHeading = () => {
    if (newHeading && newDescription && newImage) {
      setHeadings([
        ...headings,
        {
          heading: newHeading,
          description: newDescription,
          image: newImage, // Add unique image URL here
        },
      ]);
      setNewHeading("");
      setNewDescription("");
      setNewImage(""); // Reset the newImage state for the next upload
    } else {
      message.error("Please provide heading, description, and image.");
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
    console.log(headings, "dhwuh");
    const blogData = {
      title: title,
      description: description,
      image: url,
      titledescriptions: headings.map((item) => ({
        descriptionTitle: item.heading,
        text: item.description,
        image: item.image, // Ensure the image is included
      })),
    };

    console.log("Submitting Blog Data:", blogData); // Log data to console

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

  const handleEdit = (id) => {
    const blogToEdit = submittedData.find((blog) => blog.id === id); // Find the blog with matching ID

    if (blogToEdit) {
      console.log("Editing blog data:", blogToEdit);
      setTitle(blogToEdit.title || ""); // Blog title
      setDescription(blogToEdit.description || ""); // Blog description
      setUrl(blogToEdit.image);
      // Map titledescriptions to headings
      const mappedHeadings = (blogToEdit.titledescriptions || []).map(
        (item) => ({
          heading: item.descriptionTitle || "", // Set heading title
          description: item.text || "", // Set description (HTML format)
          image: item.image || null, // Set image for heading
        })
      );

      // Save editing index (or ID for reference)
      setEditingIndex(id);

      // Populate states
      setHeadings(mappedHeadings); // Populate headings state
      if (mappedHeadings.length > 0) {
        // Set the first heading for autofill in the form
        setNewHeading(mappedHeadings[0].heading);
        setNewDescription(mappedHeadings[0].description);
        setNewImage(mappedHeadings[0].image);
      }

      // Reset step and open modal
      setCurrentStep(0);
      setIsModalVisible(true);
    } else {
      console.error("Blog with the given ID not found!");
    }
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
      title: "Actions",
      key: "actions",
      render: (_, record, index) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)} // Pass the `id` to `handleEdit`
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
            <Button danger icon={<DeleteOutlined />} type="danger" size="small">
              Delete
            </Button>
          </Popconfirm>
          <Button type="primary" onClick={() => showModal(record.id)}>
            Add SEO
          </Button>
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
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, setUrl)}
              />
              <img src={url} alt="Uploaded" style={{ maxWidth: "100px" }} />

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
                <ReactQuill
                  theme="snow"
                  value={newDescription}
                  onChange={setNewDescription}
                  placeholder="Enter description"
                  modules={modules}
                  formats={formats}
                  style={{ minHeight: "200px" }}
                />
              </Form.Item>

              <Form.Item label="Upload Image">
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, setNewImage)}
                />
                {newImage && (
                  <img
                    src={newImage}
                    alt="Uploaded"
                    style={{
                      maxWidth: "100px",
                      display: "block",
                      marginBottom: "10px",
                    }}
                  />
                )}
              </Form.Item>

              <Button
                onClick={() => {
                  if (selectedHeadingIndex !== null) {
                    // Update existing heading
                    const updatedHeadings = [...headings];
                    updatedHeadings[selectedHeadingIndex] = {
                      heading: newHeading,
                      description: newDescription,
                      image: newImage,
                    };
                    setHeadings(updatedHeadings);
                  } else {
                    // Add new heading
                    addHeading();
                  }

                  // Reset input fields
                  setNewHeading("");
                  setNewDescription("");
                  setNewImage("");
                  setSelectedHeadingIndex(null);
                }}
                type="dashed"
              >
                {selectedHeadingIndex !== null
                  ? "Update Heading"
                  : "Add Heading, Description, and Image"}
              </Button>
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
}

export default Blog1;
