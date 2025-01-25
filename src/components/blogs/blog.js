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
import { blog } from "../../utils/axios";
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
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
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
      setUrl(blogToEdit.image)
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
    </div>
  );
}

export default Blog1;
