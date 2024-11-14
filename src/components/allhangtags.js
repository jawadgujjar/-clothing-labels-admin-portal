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
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AllHangtags1 = () => {
  const [hangtagItems, setHangtagItems] = useState([]);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] =
    useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newTitle1, setNewTitle1] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentHangtag, setCurrentHangtag] = useState(null);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [newStyle, setNewStyle] = useState(null);
  const [newStylePaperQuestion, setNewStylePaperQuestion] = useState(""); // For Paper Question Image
  const [newStylePrintOption, setNewStylePrintOption] = useState(""); // For Print Option Image
  const [newStyleHolePunchSize, setNewStyleHolePunchSize] = useState(""); // For Hole Punch Size Image
  const [newStyleHolePunchPosition, setNewStyleHolePunchPosition] =
    useState(""); // For Hole Punch Position Image
  const [newStyleStringColor, setNewStyleStringColor] = useState(""); // For String Color Image
  const [newStyleSafetyPinColor, setNewStyleSafetyPinColor] = useState(""); // For Safety Pin Color Image
  const [newStyleProofOption, setNewStyleProofOption] = useState(""); // For Proof Option Image
  const [newStyleTurnaroundOption, setNewStyleTurnaroundOption] = useState(""); // For Turnaround Option Image

  const [newTitlePaperQuestion, setNewTitlePaperQuestion] = useState(""); // For Paper Question Title
  const [newTitlePrintOption, setNewTitlePrintOption] = useState(""); // For Print Option Title
  const [newTitleHolePunchSize, setNewTitleHolePunchSize] = useState(""); // For Hole Punch Size Title
  const [newTitleHolePunchPosition, setNewTitleHolePunchPosition] =
    useState(""); // For Hole Punch Position Title
  const [newTitleStringColor, setNewTitleStringColor] = useState(""); // For String Color Title
  const [newTitleSafetyPinColor, setNewTitleSafetyPinColor] = useState(""); // For Safety Pin Color Title
  const [newTitleProofOption, setNewTitleProofOption] = useState(""); // For Proof Option Title
  const [newTitleTurnaroundOption, setNewTitleTurnaroundOption] = useState(""); // For Turnaround Option Title
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

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
  const handleSizeChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewStyle(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handlePaperQuestionChange = ({ file }) => {
    if (file.status === "done") {
      setNewStylePaperQuestion(file.response.url); // Set Paper Question Image URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => setNewStylePaperQuestion(e.target.result);
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handlePrintOptionChange = ({ file }) => {
    if (file.status === "done") {
      setNewStylePrintOption(file.response.url); // Set Print Option Image URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => setNewStylePrintOption(e.target.result);
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleHolePunchSizeChange = ({ file }) => {
    if (file.status === "done") {
      setNewStyleHolePunchSize(file.response.url); // Set Hole Punch Size Image URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => setNewStyleHolePunchSize(e.target.result);
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleHolePunchPositionChange = ({ file }) => {
    if (file.status === "done") {
      setNewStyleHolePunchPosition(file.response.url); // Set Hole Punch Position Image URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => setNewStyleHolePunchPosition(e.target.result);
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleStringColorChange = ({ file }) => {
    if (file.status === "done") {
      setNewStyleStringColor(file.response.url); // Set String Color Image URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => setNewStyleStringColor(e.target.result);
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleSafetyPinColorChange = ({ file }) => {
    if (file.status === "done") {
      setNewStyleSafetyPinColor(file.response.url); // Set Safety Pin Color Image URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => setNewStyleSafetyPinColor(e.target.result);
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleProofOptionChange = ({ file }) => {
    if (file.status === "done") {
      setNewStyleProofOption(file.response.url); // Set Proof Option Image URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => setNewStyleProofOption(e.target.result);
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleTurnaroundOptionChange = ({ file }) => {
    if (file.status === "done") {
      setNewStyleTurnaroundOption(file.response.url); // Set Turnaround Option Image URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => setNewStyleTurnaroundOption(e.target.result);
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const steps = [
    {
      title: "Upload Images",
      content: (
        <div>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Add Images</p>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            onChange={handleImageChange}
            multiple={true} // Allow multiple file uploads
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Images</div>
            </div>
          </Upload>
          {newImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newImage}
                alt="Uploaded"
                style={{ width: "400px", marginRight: "10px" }}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Product Description", // The step to add description input
      content: (
        <div>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Enter the Description
          </p>

          {/* Description Title Heading */}
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Description Title
          </p>
          {/* Description Title Input */}
          <Input
            value={newTitle} // Binding input to state for title
            onChange={(e) => setNewTitle(e.target.value)} // Updating title state
            placeholder="Enter description title"
            style={{ marginBottom: "10px" }} // Adding some margin between inputs
          />

          {/* Description Heading */}
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Product Description
          </p>
          {/* Description Text Area */}
          <Input.TextArea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)} // Binding input to description state
            placeholder="Enter product description"
            rows={4}
          />
        </div>
      ),
    },
    {
      title: "Style",
      content: (
        <div>
          <h4>Add Size</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handleSizeChange} // This is a function to handle image change
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>

          {/* Preview of the uploaded image */}
          {newImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStyle}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Title Input Field */}
          <p style={{ fontWeight: "bold" }}>Size Title</p>
          <Input
            placeholder="Enter size title"
            value={newTitle1}
            onChange={(e) => setNewTitle1(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "Paper Question",
      content: (
        <div>
          <h4>Paper Question</h4>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            showUploadList={false}
            onChange={handlePaperQuestionChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>
          {newStylePaperQuestion && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStylePaperQuestion}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <p style={{ fontWeight: "bold" }}>Enter Paper Question Title</p>
          <Input
            placeholder="Enter paper question title"
            value={newTitlePaperQuestion}
            onChange={(e) => setNewTitlePaperQuestion(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "Print Option",
      content: (
        <div>
          <h4>Print Option</h4>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            showUploadList={false}
            onChange={handlePrintOptionChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>
          {newStylePrintOption && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStylePrintOption}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <p style={{ fontWeight: "bold" }}>Enter Print Option Title</p>
          <Input
            placeholder="Enter print option title"
            value={newTitlePrintOption}
            onChange={(e) => setNewTitlePrintOption(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "Hole Punch Size",
      content: (
        <div>
          <h4>Hole Punch Size</h4>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            showUploadList={false}
            onChange={handleHolePunchSizeChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>
          {newStyleHolePunchSize && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStyleHolePunchSize}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <p style={{ fontWeight: "bold" }}>Enter Hole Punch Size Title</p>
          <Input
            placeholder="Enter hole punch size title"
            value={newTitleHolePunchSize}
            onChange={(e) => setNewTitleHolePunchSize(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "Hole Punch Position",
      content: (
        <div>
          <h4>Hole Punch Position</h4>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            showUploadList={false}
            onChange={handleHolePunchPositionChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>
          {newStyleHolePunchPosition && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStyleHolePunchPosition}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <p style={{ fontWeight: "bold" }}>Enter Hole Punch Position Title</p>
          <Input
            placeholder="Enter hole punch position title"
            value={newTitleHolePunchPosition}
            onChange={(e) => setNewTitleHolePunchPosition(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "String Color",
      content: (
        <div>
          <h4>String Color</h4>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            showUploadList={false}
            onChange={handleStringColorChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>
          {newStyleStringColor && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStyleStringColor}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <p style={{ fontWeight: "bold" }}>Enter String Color Title</p>
          <Input
            placeholder="Enter string color title"
            value={newTitleStringColor}
            onChange={(e) => setNewTitleStringColor(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "Safety Pin Color",
      content: (
        <div>
          <h4>Safety Pin Color</h4>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            showUploadList={false}
            onChange={handleSafetyPinColorChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>
          {newStyleSafetyPinColor && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStyleSafetyPinColor}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <p style={{ fontWeight: "bold" }}>Enter Safety Pin Color Title</p>
          <Input
            placeholder="Enter safety pin color title"
            value={newTitleSafetyPinColor}
            onChange={(e) => setNewTitleSafetyPinColor(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "Proof Option",
      content: (
        <div>
          <h4>Proof Option</h4>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            showUploadList={false}
            onChange={handleProofOptionChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>
          {newStyleProofOption && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStyleProofOption}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <p style={{ fontWeight: "bold" }}>Enter Proof Option Title</p>
          <Input
            placeholder="Enter proof option title"
            value={newTitleProofOption}
            onChange={(e) => setNewTitleProofOption(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "Turnaround Option",
      content: (
        <div>
          <h4>Turnaround Option</h4>
          <Upload
            action="your_upload_endpoint"
            listType="picture-card"
            showUploadList={false}
            onChange={handleTurnaroundOptionChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Image</div>
            </div>
          </Upload>
          {newStyleTurnaroundOption && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={newStyleTurnaroundOption}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <p style={{ fontWeight: "bold" }}>Enter Turnaround Option Title</p>
          <Input
            placeholder="Enter turnaround option title"
            value={newTitleTurnaroundOption}
            onChange={(e) => setNewTitleTurnaroundOption(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
  ];
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
          ? {
              ...item,
              imageUrl: newImage,
              title: newTitle,
              description: newDescription,
            }
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
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {hangtagItems.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            style={{ width: "300px", marginBottom: "20px" }}
            actions={[
              <EditOutlined onClick={() => handleEditProduct(item)} />,
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => handleDelete(item.id)}
              />,
            ]}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <p>{item.description}</p>
          </Card>
        ))}
       
        <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNewProduct}
          >
            Add New Hangtags
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
