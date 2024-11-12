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

const steps = [
  { title: "Size", content: <p>Size selection content...</p> },
  { title: "Style", content: "Style content..." },
  { title: "Versions", content: "Versions content..." },
  { title: "Proof Option", content: "Proof option content..." },
  { title: "Turnaround", content: "Turnaround content..." },
  { title: "Backing Options", content: "Backing options content..." },
  { title: "Metallic Threads", content: "Metallic threads content..." },
  { title: "Satin Material Color", content: "Satin material color content..." },
  { title: "Print Colors", content: "Print colors content..." },
  { title: "Cotton Material Colors", content: "Cotton material colors content..." },
];

const AllHangtags1 = () => {
  const [hangtagItems, setHangtagItems] = useState([]);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentHangtag, setCurrentHangtag] = useState(null);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  // Load hangtag items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("hangtagItems");
    if (savedItems) {
      setHangtagItems(JSON.parse(savedItems));
    }
  }, []);

  // Save hangtag items to localStorage
  useEffect(() => {
    if (hangtagItems.length > 0) {
      localStorage.setItem("hangtagItems", JSON.stringify(hangtagItems));
    }
  }, [hangtagItems]);

  const handleAddNewProduct = () => {
    setIsProductModalVisible(true);
  };

  const handleProductOk = () => {
    if (newImage && newTitle) {
      const newItem = {
        id: Date.now(),
        imageUrl: newImage,
        title: newTitle,
        description: "",
      };
      setHangtagItems((prevItems) => [...prevItems, newItem]);
      setIsProductModalVisible(false);
      setNewImage(null);
      setNewTitle("");
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
      const updatedItems = hangtagItems.map((item) =>
        item.id === hangtagItems[hangtagItems.length - 1].id
          ? { ...item, description: newDescription }
          : item
      );
      setHangtagItems(updatedItems);
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
    const updatedItems = hangtagItems.filter((item) => item.id !== id);
    setHangtagItems(updatedItems);
  };

  const handleEditProduct = (hangtag) => {
    setCurrentHangtag(hangtag);
    setNewTitle(hangtag.title);
    setNewDescription(hangtag.description);
    setNewImage(hangtag.imageUrl);
    setIsEditModalVisible(true);
  };

  const handleEditProductOk = () => {
    if (newImage && newTitle) {
      const updatedItems = hangtagItems.map((item) =>
        item.id === currentHangtag.id
          ? { ...item, imageUrl: newImage, title: newTitle, description: newDescription }
          : item
      );
      setHangtagItems(updatedItems);
      setIsEditModalVisible(false);
      setCurrentHangtag(null);
      setNewImage(null);
      setNewTitle("");
      setNewDescription("");
    } else {
      alert("Please provide both image and title!");
    }
  };

  const handleEditProductCancel = () => {
    setIsEditModalVisible(false);
    setCurrentHangtag(null);
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
        {hangtagItems.length > 0 ? (
          hangtagItems.map((item) => (
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
                cover={<img alt="Hangtag" src={item.imageUrl} />}
              >
                <h3 className="allclothing-title">{item.title}</h3>
                {item.description && <p>{item.description}</p>}
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
        title="Add New Hangtag"
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
            alt="New Hangtag"
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
        <Input
          placeholder="Enter hangtag title"
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
            alt="Hangtag Image"
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
        <Input
          placeholder="Enter hangtag title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <Input.TextArea
          placeholder="Enter hangtag description"
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
        width="80%"
        style={{ maxWidth: "800px" }}
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
