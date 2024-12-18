import React, { useState, useEffect } from "react";
import { Table, Modal, Button, message } from "antd";
import { designquote } from "../utils/axios";
import "./designquote.css";

function Designquote() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [designquoteData, setDesignquoteData] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await designquote.delete(`/${id}`);
      if (response.status === 204) {
        // If the response is successful, remove the deleted quote from state
        setDesignquoteData(designquoteData.filter((quote) => quote.id !== id));
        message.success("Quote deleted successfully");
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
      message.error("Failed to delete quote. Please try again later.");
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="product"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
          onClick={() => handleImageClick(text)}
        />
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Turnaround",
      dataIndex: "turnaround",
      key: "turnaround",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleImageClick = (image) => {
    setPreviewImage(image);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setPreviewImage("");
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await designquote.get("/");
        if (response.status === 200) {
          setDesignquoteData(
            response.data.map((item, index) => {
              const user = item.user?.[0] || {}; // Extract the first user if user is an array
              return {
                ...item,
                key: index, // Adding a unique key for each row
                userName: user.name || "N/A",
                email: user.email || "N/A",
                phoneNumber: user.phonenumber || "N/A",
              };
            })
          );
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
        message.error("Failed to fetch quotes. Please try again later.");
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="designquote-container">
      <h1>Design Quote Table</h1>
      <Table
        dataSource={designquoteData}
        columns={columns}
        pagination={false}
      />
      <Modal visible={isModalVisible} footer={null} onCancel={handleModalClose}>
        <img src={previewImage} alt="Preview" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
}

export default Designquote;
