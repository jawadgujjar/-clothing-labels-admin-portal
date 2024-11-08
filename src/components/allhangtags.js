import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Input,
  Upload,
  message,
  Steps,
  theme,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./allclothing.css";

const steps = [
  {
    title: "Size",
    content: <p>Size selection content...</p>,
  },
  {
    title: "Style",
    content: "Style content...",
  },
  {
    title: "Versions",
    content: "Versions content...",
  },
  {
    title: "Proof Option",
    content: "Proof option content...",
  },
  {
    title: "Turnaround",
    content: "Turnaround content...",
  },
  {
    title: "Backing Options",
    content: "Backing options content...",
  },
  {
    title: "Metallic Threads",
    content: "Metallic threads content...",
  },
  {
    title: "Satin Material Color",
    content: "Satin material color content...",
  },
  {
    title: "Print Colors",
    content: "Print colors content...",
  },
  {
    title: "Cotton Material Colors",
    content: "Cotton material colors content...",
  },
];

const AllHangtags1 = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // New state for edit modal
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null); // Current product being edited
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  // Load clothing items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("clothingItems");
    if (savedItems) {
      setClothingItems(JSON.parse(savedItems));
    }
  }, []);

  // Save clothing items to localStorage
  useEffect(() => {
    if (clothingItems.length > 0) {
      localStorage.setItem("clothingItems", JSON.stringify(clothingItems));
    }
  }, [clothingItems]);

  const handleAddNewProduct = () => {
    setIsProductModalVisible(true);
  };

  const handleProductOk = () => {
    if (newImage && newTitle) {
      const newItem = {
        id: Date.now(), // Unique ID based on timestamp
        imageUrl: newImage,
        title: newTitle,
        description: "", // Initially empty description
      };
      setClothingItems((prevItems) => [...prevItems, newItem]);
      setIsProductModalVisible(false);
      setNewImage(null);
      setNewTitle("");

      // Open description modal after product is added
      setIsDescriptionModalVisible(true);
    } else {
      alert("Please provide both image and title!");
    }
  };

  const handleProductCancel = () => {
    setIsProductModalVisible(false);
    setNewImage(null);
    setNewTitle("");
  };

  const handleDescriptionOk = () => {
    if (newDescription) {
      // Find the newly added product and update its description
      const updatedItems = clothingItems.map((item) =>
        item.id === clothingItems[clothingItems.length - 1].id
          ? { ...item, description: newDescription }
          : item
      );
      setClothingItems(updatedItems);

      setIsDescriptionModalVisible(false);
      setNewDescription("");
    } else {
      alert("Please provide a description!");
    }
  };

  const handleDescriptionCancel = () => {
    setIsDescriptionModalVisible(false);
    setNewDescription("");
  };

  const handleImageChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImage(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleDelete = (id) => {
    const updatedItems = clothingItems.filter((item) => item.id !== id);
    setClothingItems(updatedItems);
  };

  // Handle Edit Product functionality
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setNewTitle(product.title);
    setNewDescription(product.description);
    setNewImage(product.imageUrl);
    setIsEditModalVisible(true);
  };

  const handleEditProductOk = () => {
    if (newImage && newTitle) {
      const updatedItems = clothingItems.map((item) =>
        item.id === currentProduct.id
          ? { ...item, imageUrl: newImage, title: newTitle, description: newDescription }
          : item
      );
      setClothingItems(updatedItems);
      setIsEditModalVisible(false);
      setCurrentProduct(null);
      setNewImage(null);
      setNewTitle("");
      setNewDescription("");
    } else {
      alert("Please provide both image and title!");
    }
  };

  const handleEditProductCancel = () => {
    setIsEditModalVisible(false);
    setCurrentProduct(null);
    setNewImage(null);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div>
      <h2>All Hangtags Products</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {clothingItems.length > 0 ? (
          clothingItems.map((item) => (
            <div key={item.id} className="allclothing-item">
              <div className="allclothing-buttons">
                <Button
                  type="primary"
                  onClick={() => handleEditProduct(item)}
                >
                  Edit
                </Button>
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
              <Card
                className="allclothing-card"
                hoverable
                cover={<img alt="Clothing" src={item.imageUrl} />}
              >
                <h3 className="allclothing-title">{item.title}</h3>
                {item.description && <p>{item.description}</p>}{" "}
                {/* Display description if available */}
              </Card>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
        <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNewProduct}
          >
            Add New Product
          </Button>
        </div>
      </div>

      {/* Product Add Modal */}
      <Modal
        title="Add New Product"
        visible={isProductModalVisible}
        onOk={handleProductOk}
        onCancel={handleProductCancel}
      >
        <Upload
          action="your_upload_endpoint"
          listType="picture"
          onChange={handleImageChange}
          showUploadList={false}
        >
          <Button>Upload Image</Button>
        </Upload>
        {newImage && (
          <img
            src={newImage}
            alt="New Product"
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
        <Input
          placeholder="Enter product title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginTop: "10px" }}
        />
      </Modal>

      {/* Product Edit Modal */}
      <Modal
        title="Edit Hangtag"
        visible={isEditModalVisible}
        onOk={handleEditProductOk}
        onCancel={handleEditProductCancel}
      >
        <Upload
          action="your_upload_endpoint"
          listType="picture"
          onChange={handleImageChange}
          showUploadList={false}
        >
          <Button>Upload Image</Button>
        </Upload>
        {newImage && (
          <img
            src={newImage}
            alt="Product Image"
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
        <Input
          placeholder="Enter product title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <Input.TextArea
          placeholder="Enter product description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          rows={4}
          style={{ marginTop: "10px" }}
        />
      </Modal>

      {/* Description Add Modal */}
      <Modal
        title="Add Description"
        visible={isDescriptionModalVisible}
        onOk={handleDescriptionOk}
        onCancel={handleDescriptionCancel}
        width="80%" // Setting the modal width dynamically
        style={{ maxWidth: "800px" }} // Ensures it's not too wide on larger screens
        bodyStyle={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next} style={{ width: "48%" }}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
              style={{ width: "48%" }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
                width: "48%",
              }}
              onClick={prev}
            >
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AllHangtags1;
