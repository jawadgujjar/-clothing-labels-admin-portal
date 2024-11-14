import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, Input, message, Card, Steps } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Step } = Steps;

function Fancyhangtags1() {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [newImage, setNewImage] = useState(null); // Image for Modal 1
  const [newImage1, setNewImage1] = useState(null); 
  const [newTitle, setNewTitle] = useState(''); // Title for Modal 1
  const [newDescription, setNewDescription] = useState(''); // Description for Modal 1
  const [stepperImage, setStepperImage] = useState(null); // Image for Modal 2 (Stepper)
  const [stepperImage1, setStepperImage1] = useState(null);
  const [stepperTitle, setStepperTitle] = useState(''); // Title for Modal 2 (Stepper)
  const [stepperDescription, setStepperDescription] = useState(''); // Description for Modal 2 (Stepper)
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // Stepper state
  const [isStepperModalVisible, setIsStepperModalVisible] = useState(false); // Stepper modal visibility

  // Load products from localStorage on initial load
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage on every change
  useEffect(() => {
    if (products.length > 0) {
      saveToLocalStorage('products', products);
    }
  }, [products]);

  // Helper function to save to localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      const dataString = JSON.stringify(data);
      localStorage.setItem(key, dataString);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      message.error('Local storage is full. Please clear some data.');
    }
  };

  // Handle opening the add product modal
  const handleAddNewProduct = () => {
    setIsProductModalVisible(true);
    setNewImage(null); // Reset image
    setNewTitle(''); // Reset title
    setNewDescription(''); // Reset description
    setStepperImage(null); // Reset stepper image
    setStepperTitle(''); // Reset stepper title
    setStepperDescription(''); // Reset stepper description
    setEditProductIndex(null); // Reset edit index when adding new product
  };

  // Handle closing the add product modal
  const handleProductCancel = () => {
    setIsProductModalVisible(false);
  };

  // Handle opening the stepper modal after OK
  const handleProductOk = () => {
    if (!newImage || !newTitle || !newDescription) {
      message.error('Please fill all fields.');
      return;
    }
    // After OK, open the stepper modal
    setIsProductModalVisible(false);
    setIsStepperModalVisible(true);

    // Pass data to stepper modal (but do not sync with Modal 1)
    setStepperImage(newImage);
    setStepperTitle(newTitle);
    setStepperDescription(newDescription);
  };

  // Handle navigation in the stepper modal
  const next = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle submitting the add or edit product in the stepper modal
  const handleStepperProductOk = () => {
    const newProduct = {
      image: stepperImage,
      title: stepperTitle,
      description: stepperDescription,
    };

    if (editProductIndex !== null) {
      // Edit existing product
      const updatedProducts = [...products];
      updatedProducts[editProductIndex] = newProduct;
      setProducts(updatedProducts);
      message.success('Product edited successfully!');
    } else {
      // Add new product
      setProducts([...products, newProduct]);
      message.success('Product added successfully!');
    }

    // Reset states after submission
    setIsStepperModalVisible(false); // Close stepper modal
  };

  // Handle image upload change in stepper modal
  const handleImageChange = ({ file }, modalType = 'stepper') => {
    const target = modalType === 'stepper' ? setStepperImage : setNewImage;
    if (file.status === 'done') {
      target(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === 'uploading') {
      const reader = new FileReader();
      reader.onload = (e) => {
        target(e.target.result); // Fallback to base64 image
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };
  const handleImageChange1 = ({ file }, modalType = 'stepper') => {
    const target = modalType === 'stepper' ? setStepperImage1 : setNewImage1;
    if (file.status === 'done') {
      target(file.response.url); // Assuming the file response contains a URL
    } else if (file.status === 'uploading') {
      const reader = new FileReader();
      reader.onload = (e) => {
        target(e.target.result); // Fallback to base64 image
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  // Handle the edit product functionality
  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setNewImage(productToEdit.image);
    setNewTitle(productToEdit.title);
    setNewDescription(productToEdit.description);
    setEditProductIndex(index);
    setIsProductModalVisible(true); // Open the edit modal for editing the product
  };

  // Handle deleting a product
  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    message.success('Product deleted successfully!');
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewProduct}>
        Add Product
      </Button>

      {/* Add/Edit Modal for Product */}
      <Modal
        title={editProductIndex !== null ? "Edit Hangtag" : "Add New Hangtag"}
        visible={isProductModalVisible}
        onOk={handleProductOk}
        onCancel={handleProductCancel}
      >
        <Upload
          action="your_upload_endpoint" // Replace with your actual upload endpoint
          listType="picture"
          onChange={(file) => handleImageChange(file, 'product')}
          showUploadList={false}
        >
          <Button>Upload Image</Button>
        </Upload>
        {newImage1 && <img src={newImage1} alt="Hangtag Image" style={{ width: '100%', marginTop: '10px' }} />}
        <Input
          placeholder="Enter hangtag title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginTop: '10px' }}
        />
        <Input.TextArea
          placeholder="Enter hangtag description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          rows={4}
          style={{ marginTop: '10px' }}
        />
      </Modal>

      {/* Stepper Modal for completing product details */}
      <Modal
        title={editProductIndex !== null ? "Edit Hangtag - Step" : "Add New Hangtag - Step"}
        visible={isStepperModalVisible}
        onOk={handleStepperProductOk}
        onCancel={() => setIsStepperModalVisible(false)}
        footer={[
          <Button key="back" onClick={prev} disabled={currentStep === 0}>
            Previous
          </Button>,
          <Button key="next" type="primary" onClick={next} disabled={currentStep === 2}>
            Next
          </Button>,
          <Button key="submit" type="primary" onClick={handleStepperProductOk} disabled={currentStep !== 2}>
            {editProductIndex !== null ? 'Save Changes' : 'Add Product'}
          </Button>,
        ]}
      >
        <Steps current={currentStep}>
          <Step title="Image" />
          <Step title="Title" />
          <Step title="Description" />
        </Steps>

        {currentStep === 0 && (
          <div>
            <Upload
              action="your_upload_endpoint" // Replace with your actual upload endpoint
              listType="picture"
              onChange={(file) => handleImageChange1(file, 'stepper')}
              showUploadList={false}
            >
              <Button>Upload Image</Button>
            </Upload>
            {stepperImage1 && <img src={stepperImage1} alt="New Hangtag" style={{ width: '100%', marginTop: '10px' }} />}
          </div>
        )}

        {currentStep === 1 && (
          <Input
            placeholder="Enter hangtag title"
            value={stepperTitle}
            onChange={(e) => setStepperTitle(e.target.value)}
            style={{ marginTop: '10px' }}
          />
        )}

        {currentStep === 2 && (
          <Input.TextArea
            placeholder="Enter hangtag description"
            value={stepperDescription}
            onChange={(e) => setStepperDescription(e.target.value)}
            rows={4}
            style={{ marginTop: '10px' }}
          />
        )}
      </Modal>

      {/* Display the added products */}
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product, index) => (
          <Card
            key={index}
            title={product.title}
            style={{ width: '300px', marginBottom: '20px' }}
            actions={[
              <EditOutlined onClick={() => handleEditProduct(index)} />,
              <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDeleteProduct(index)} />,
            ]}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <p>{product.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Fancyhangtags1;
