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
import "./allclothing.css";
import StyleStepper from "./allclothingstyle";

// Main functional component
const AllCloth1 = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // New state for edit modal
  const [newImage, setNewImage] = useState(null);

  const [newSize, setNewSize] = useState(null);
  const [newVersion, setNewVersion] = useState(null);
  const [newProof, setNewProof] = useState(null);
  const [newTurn, setNewTurn] = useState(null);
  const [newBacking, setNewBacking] = useState(null);
  const [newMetallic, setNewMetallic] = useState(null);
  const [newSatin, setNewSatin] = useState(null);
  const [newPrint, setNewPrint] = useState(null);
  const [newCotton, setNewCotton] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newTitle0, setNewTitle0] = useState("");
  const [newTitle1, setNewTitle1] = useState("");
  const [newTitle2, setNewTitle2] = useState("");
  const [newTitle3, setNewTitle3] = useState("");
  const [newTitle4, setNewTitle4] = useState("");
  const [newTitle5, setNewTitle5] = useState("");
  const [newTitle6, setNewTitle6] = useState("");
  const [newTitle7, setNewTitle7] = useState("");
  const [newTitle8, setNewTitle8] = useState("");
  const [newTitle9, setNewTitle9] = useState("");

  const [newDescription, setNewDescription] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null); // Current product being edited
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  // handleImageChange function must be defined before it's used
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

  const handlesizeChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewSize(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handleversionChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewVersion(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handleproofChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProof(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handleturnChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewTurn(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handlebackingChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewBacking(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handlemetallicChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewMetallic(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handlesatinChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewSatin(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handleprintChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPrint(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handlecottonChange = ({ file }) => {
    if (file.status === "done") {
      setNewImage(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === "uploading") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewCotton(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Upload Images",
      content: (
        <div>
          <p style={{fontSize:'1.5rem',fontWeight:'bold'}}>Add Images</p>
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
      title: "Production Description",  // The step to add description input
      content: (
        <div>
           <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Description Title</p>
          {/* Description Title Input */}
          <Input
            value={newTitle0} // Binding input to state for title
            onChange={(e) => setNewTitle0(e.target.value)} // Updating title state
            placeholder="Enter description title"
            style={{ marginBottom: '10px' }} // Adding some margin between inputs
          />
          <p style={{fontSize:'1.5rem',fontWeight:'bold'}}>Enter the Description</p>
          <Input.TextArea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)} // Binding input to state
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
        
           <div><StyleStepper/></div>
        </div>
       
      ),
    },

    //  {
    //   title: "Size",
    //   content: (
    //     <div>
    //       <h4>Add Size</h4>
    //       {/* Image Upload Section */}
    //       <Upload
    //         action="your_upload_endpoint" // Replace with your actual upload endpoint
    //         listType="picture-card"
    //         showUploadList={false}
    //         onChange={handlesizeChange} // This is a function to handle image change
    //       >
    //         <div>
    //           <PlusOutlined />
    //           <div style={{ marginTop: 8 }}>Upload Image</div>
    //         </div>
    //       </Upload>
          
    //       {/* Preview of the uploaded image */}
    //       {newImage && (
    //         <div style={{ marginTop: "10px" }}>
    //           <img
    //             src={newSize}
    //             alt="Uploaded Style"
    //             style={{ width: "100px", height: "100px", objectFit: "cover" }}
    //           />
    //         </div>
    //       )}
          
    //       {/* Title Input Field */}
    //       <Input
    //         placeholder="Enter style title"
    //         value={newTitle1}
    //         onChange={(e) => setNewTitle1(e.target.value)} // This binds the title input to state
    //         style={{ marginTop: "10px" }}
    //       />
    //     </div>
    //   ),
    // },  

     {
      title: "Versions",
      content: (
        <div>
          <h4>Add Versions</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handleversionChange} // This is a function to handle image change
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
                src={newVersion}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          
          {/* Title Input Field */}
          <Input
            placeholder="Enter style title"
            value={newTitle2}
            onChange={(e) => setNewTitle2(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },

    {
      title: "Proof Option",
      content: (
        <div>
          <h4>Add Proof Option</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handleproofChange} // This is a function to handle image change
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
                src={newProof}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          
          {/* Title Input Field */}
          <Input
            placeholder="Enter style title"
            value={newTitle3}
            onChange={(e) => setNewTitle3(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },

  {
      title: "Turnaround option",
      content: (
        <div>
          <h4>Add Turnaround option</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handleturnChange} // This is a function to handle image change
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
                src={newTurn}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          
          {/* Title Input Field */}
          <Input
            placeholder="Enter style title"
            value={newTitle4}
            onChange={(e) => setNewTitle4(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    
    {
      title: "Backing Options",
      content: (
        <div>
          <h4>Add Backing Options</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handlebackingChange} // This is a function to handle image change
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
                src={newBacking}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          
          {/* Title Input Field */}
          <Input
            placeholder="Enter style title"
            value={newTitle5}
            onChange={(e) => setNewTitle5(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },

     {
      title: "Metallic Threads",
      content: (
        <div>
          <h4> Add Metallic Threads</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handlemetallicChange} // This is a function to handle image change
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
                src={newMetallic}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          
          {/* Title Input Field */}
          <Input
            placeholder="Enter style title"
            value={newTitle6}
            onChange={(e) => setNewTitle6(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },

    {
      title: "Satin Material Color",
      content: (
        <div>
          <h4>Add Satin Material Color</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handlesatinChange} // This is a function to handle image change
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
                src={newSatin}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          
          {/* Title Input Field */}
          <Input
            placeholder="Enter style title"
            value={newTitle7}
            onChange={(e) => setNewTitle7(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },

     {
      title: "Print colors",
      content: (
        <div>
          <h4>Add Print Colors</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handleprintChange} // This is a function to handle image change
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
                src={newPrint}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          
          {/* Title Input Field */}
          <Input
            placeholder="Enter style title"
            value={newTitle8}
            onChange={(e) => setNewTitle8(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
    {
      title: "Cotton Material Colors",
      content: (
        <div>
          <h4>Cotton Material Colors</h4>
          {/* Image Upload Section */}
          <Upload
            action="your_upload_endpoint" // Replace with your actual upload endpoint
            listType="picture-card"
            showUploadList={false}
            onChange={handlecottonChange} // This is a function to handle image change
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
                src={newCotton}
                alt="Uploaded Style"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          
          {/* Title Input Field */}
          <Input
            placeholder="Enter style title"
            value={newTitle9}
            onChange={(e) => setNewTitle9(e.target.value)} // This binds the title input to state
            style={{ marginTop: "10px" }}
          />
        </div>
      ),
    },
  ];
const MAX_STORAGE_SIZE = 5 * 1024 * 1024;
  // Load clothing items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("clothingItems");
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setClothingItems(parsedItems);
      } catch (error) {
        console.error("Error parsing clothing items from localStorage:", error);
      }
    }
  }, []);

  // Save clothing items to localStorage
  useEffect(() => {
    if (clothingItems.length > 0) {
      try {
        const dataToSave = JSON.stringify(clothingItems);

        // Check if the data exceeds the localStorage quota
        if (dataToSave.length > MAX_STORAGE_SIZE) {
          console.warn("Data is too large to be stored in localStorage.");
          return;
        }

        // Save to localStorage
        localStorage.setItem("clothingItems", dataToSave);
      } catch (error) {
        console.error("Error saving clothing items to localStorage:", error);
      }
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
          ? {
              ...item,
              imageUrl: newImage,
              title: newTitle,
              description: newDescription,
            }
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
      <h2>All Clothing Products</h2>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {clothingItems.map((item, index) => (
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
            Add New Products
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
        title="Edit Product"
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
        <Steps current={current} items={steps} />
        <div
          style={{
            lineHeight: "260px",
            textAlign: "center",
            color: token.colorTextTertiary,
            backgroundColor: token.colorFillAlter,
            borderRadius: token.borderRadiusLG,
            marginTop: 16,
            width: "100%",
            maxWidth: "900px", // Ensures the content doesn't exceed 900px
            border: "none", // Remove border
            padding: "20px",
          }}
        >
          {steps[current].content}
        </div>
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

export default AllCloth1;
