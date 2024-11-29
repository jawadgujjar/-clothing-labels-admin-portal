import React, { useState } from "react";
import {
  Button,
  Table,
  Modal,
  Steps,
  Form,
  Input,
  Upload,
  List,
  Avatar,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Step } = Steps;

const AllCloth1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);
  const [styles, setStyles] = useState([]);
  const [options, setOptions] = useState([]); // Manage options here
  const [modalType, setModalType] = useState(null); // Tracks whether we are adding style, size, or category
  const [form] = Form.useForm();
  const [currentStyle, setCurrentStyle] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null); // Track current category for details modal
  const [allProductData, setAllProductData] = useState({});
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");

  // Handle file upload before upload to prevent immediate upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };
  const handleAddOption = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    // Validate that title is provided, no image needed
    if (!title) {
      alert("Please provide a title!");
      return;
    }
    // Proceed with adding the option
    setIsModalVisible(false);
  };

  // Modal Control
  const showAddModal = (type, style = null, category = null) => {
    setModalType(type);
    setCurrentStyle(style); // Set the current style if we're adding sizes to it
    setCurrentCategory(category); // Set the current category if we're adding details
    setFileList([]); // Reset fileList for new uploads
    form.resetFields(); // Reset the form
  };

  const closeAddModal = () => {
    setModalType(null);
    setCurrentStyle(null); // Reset after modal closes
    setCurrentCategory(null);
  };

  const handleAddItem = () => {
    form.validateFields().then((values) => {
      console.log("Values for Adding Item:", values); // Log form values
      const newItem = {
        name: values.name,
        image: fileList[0]?.thumbUrl || null,
      };

      if (modalType === "style") {
        setStyles([
          ...styles,
          { ...newItem, sizes: [] }, // New style, initialize with no sizes
        ]);
      } else if (modalType === "size" && currentStyle) {
        const updatedStyles = [...styles];
        updatedStyles[updatedStyles.indexOf(currentStyle)].sizes.push({
          name: newItem.name,
          quantityPrice: values.quantityPrice, // Add the quantityPrice array
          image: newItem.image,
        }); // Add size under the current style
        setStyles(updatedStyles);
      } else if (modalType === "option") {
        setOptions([...options, { ...newItem, details: [] }]);
      } else if (modalType === "category" && currentCategory) {
        const updatedOptions = [...options];
        updatedOptions[updatedOptions.indexOf(currentCategory)].details.push({
          title: values.title,
          description: values.description,
          image: newItem.image,
        });
        setOptions(updatedOptions);
      }

      closeAddModal();
    });
  };

  // File Upload Handler
  const handleFileChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleFileChange1 = ({ fileList: newFileList }) =>
    setFileList1(newFileList);
  const handleEditStyle = (index) => {
    const styleToEdit = styles[index];
    setCurrentStyle(styleToEdit); // Load the current style
    form.setFieldsValue(styleToEdit); // Prefill form
    showAddModal("style"); // Open modal for editing
  };

  // Function to remove a style
  const handleRemoveStyle = (index) => {
    const updatedStyles = styles.filter((_, i) => i !== index); // Remove by index
    setStyles(updatedStyles); // Update state
  };

  // Steps Definition
  const steps = [
    {
      title: "Product",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Product Image"
            name="productImage"
            rules={[
              { required: true, message: "Please upload a product image" },
            ]}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Product Description Title"
            name="descriptiontitle"
            rules={[
              {
                required: true,
                message: "Please enter the Product Description Title",
              },
            ]}
          >
            <Input placeholder="Enter Product Description Title" />
          </Form.Item>

          <Form.Item
            label="Product Description"
            name="productdescription"
            rules={[
              {
                required: true,
                message: "Please enter the Product Description",
              },
            ]}
          >
            <Input placeholder="Enter Product Description" />
          </Form.Item>

          {/* New Dynamic Multiple Images Upload Field */}
          <Form.Item
            label="Additional Product Images"
            name="additionalImages"
            rules={[
              {
                required: true,
                message: "Please upload at least one additional image",
              },
            ]}
          >
            <Upload
              listType="picture-card"
              multiple
              fileList={fileList1}
              onChange={(info) => {
                const updatedFiles = info.fileList.map((file) => {
                  if (file.originFileObj) {
                    return {
                      ...file,
                      thumbUrl: URL.createObjectURL(file.originFileObj), // Generate preview URL
                    };
                  }
                  return file;
                });
                setFileList1(updatedFiles); // Update state with new files
              }}
              beforeUpload={() => false} // Prevent automatic upload
            >
              {fileList1.length >= 8 ? null : ( // Use fileList1.length for the condition
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Style",
      content: (
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showAddModal("style")}
            style={{ marginBottom: "20px" }}
          >
            Add Style
          </Button>

          {styles.length === 0 ? (
            <p>No styles added yet</p> // Display a message if no styles
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={styles}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  style={{
                    borderBottom: "1px solid #ccc",
                    marginBottom: "20px",
                  }}
                  actions={[
                    <Button type="link" onClick={() => handleEditStyle(index)}>
                      Edit
                    </Button>,
                    <Button
                      type="link"
                      danger
                      onClick={() => handleRemoveStyle(index)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} alt={item.name} />}
                    title={item.name}
                  />
                  <div>
                    {item.sizes.length === 0 ? (
                      <p>No sizes available for this style</p>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {item.sizes.map((size, sizeIndex) => (
                          <div
                            key={sizeIndex}
                            style={{
                              width: "100px",
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <Avatar
                              src={size.image}
                              alt={size.name}
                              size={64}
                            />
                            <p>{size.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => showAddModal("size", item)}
                      style={{ marginTop: "10px" }}
                    >
                      Add Size
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
      ),
    },
    {
      title: "Options", // New options step
      content: (
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddOption}
            style={{ marginBottom: "20px" }}
          >
            Add Option
          </Button>

          {options.length === 0 ? (
            <p>No options added yet</p>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={options}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  style={{
                    borderBottom: "1px solid #ccc",
                    marginBottom: "20px",
                  }}
                  actions={[
                    <Button
                      type="link"
                      onClick={() => showAddModal("category", item)} // Show category modal for each option
                    >
                      Add Category
                    </Button>,
                  ]}
                >
                  <List.Item.Meta title={item.name} />
                  <div>
                    {item.details.length === 0 ? (
                      <p>No categories available for this option</p>
                    ) : (
                      <div>
                        {item.details.map((detail, detailIndex) => (
                          <div key={detailIndex}>
                            <Avatar src={detail.image} />
                            <p>{detail.title}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
      ),
    },
  ];

  const handleNext = () => {
    console.log("Current Form Values:", form.getFieldsValue()); // Log form values
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
      const finalData = {
        ...allProductData,
        ...values,
        styles,
        options,
      };
      setProducts([...products, finalData]);
      setIsModalOpen(false);
      setCurrentStep(0);
      setStyles([]);
      setOptions([]);
      setAllProductData({});
      form.resetFields();
    });
  };
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Description",
      dataIndex: "productdescription",
      key: "productdescription",
    },
  ];

  return (
    <div>
      <h2>All Clothing Products</h2>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(record) => record.productName}
      />{" "}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        style={{ marginTop: 20 }}
      >
        Add New Product
      </Button>
      <Modal
        title="Add New Product"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div>{steps[currentStep].content}</div>
        <div style={{ marginTop: 20 }}>
          {currentStep > 0 && (
            <Button style={{ marginRight: 8 }} onClick={handlePrev}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={handleFinish}>
              Submit
            </Button>
          )}
        </div>
      </Modal>
      {/* Style Modal */}
      <Modal
        title={modalType === "style" ? "Add Style" : "Add Size"}
        visible={modalType !== null}
        onCancel={closeAddModal}
        footer={[
          <Button key="back" onClick={closeAddModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddItem}>
            Add
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={modalType === "style" ? "Style Name" : "Size Name"}
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Upload Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          {modalType === "size" && (
            <Form.List
              name="quantityPrice"
              initialValue={[]}
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(
                        new Error("At least one quantity and price pair")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    block
                    style={{ marginBottom: 20 }}
                  >
                    Add Quantity and Price
                  </Button>
                  {fields.map(({ key, fieldKey, ...restField }) => (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <Form.Item
                        {...restField}
                        name={[fieldKey, "quantity"]}
                        fieldKey={[fieldKey, "quantity"]}
                        label="Quantity"
                        rules={[
                          { required: true, message: "Please enter quantity" },
                        ]}
                      >
                        <InputNumber min={1} style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[fieldKey, "price"]}
                        fieldKey={[fieldKey, "price"]}
                        label="Price"
                        rules={[
                          { required: true, message: "Please enter price" },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          prefix="$"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>

                      <Button type="link" onClick={() => remove(key)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          )}
        </Form>
      </Modal>
      {/* Modal for adding Option */}
      {/* Modal for Option */}
      <Modal
        title="Add Option"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter option title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Modal>
      {/* Modal for Category Details */}
      <Modal
        title="Add Category Detail"
        visible={modalType === "category"}
        onCancel={closeAddModal}
        footer={[
          <Button key="back" onClick={closeAddModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleAddItem("category")}
          >
            Add
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Title"
            name="title"
            rules={[
              { required: true, message: "Please enter the category title" },
            ]}
          >
            <Input placeholder="Enter category title" />
          </Form.Item>

          <Form.Item
            label="Upload Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              listType="picture"
              fileList={fileList1}
              onChange={({ fileList: newFileList1 }) =>
                setFileList1(newFileList1)
              }
              beforeUpload={beforeUpload} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllCloth1;
