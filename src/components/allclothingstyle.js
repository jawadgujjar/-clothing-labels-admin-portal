import React, { useState, useEffect } from 'react';
import { Input, Upload, Button, Typography, message, Row, Col, Card, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

function StyleStepper() {
  const [newStyle, setNewStyle] = useState(null); // State for the uploaded style image
  const [styleTitle, setStyleTitle] = useState(''); // State for the style title
  const [sizes, setSizes] = useState([]); // State to store the sizes (each size will have title, price, quantity, and image)
  const [editingIndex, setEditingIndex] = useState(null); // State for tracking which size is being edited
  const [editingSize, setEditingSize] = useState({
    sizeTitle: '',
    price: '',
    quantity: '',
    image: ''
  });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for edit modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for add modal visibility

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedStyle = localStorage.getItem('newStyle');
    const savedTitle = localStorage.getItem('styleTitle');
    
    if (savedStyle) {
      setNewStyle(savedStyle); // Restore image URL from localStorage
    }

    if (savedTitle) {
      setStyleTitle(savedTitle); // Restore title from localStorage
    }

    const savedSizes = JSON.parse(localStorage.getItem('sizes'));
    if (savedSizes) {
      setSizes(savedSizes); // Restore sizes from localStorage
    }
  }, []);

  // Add a new size to the list of sizes
  const addNewSize = () => {
    setEditingSize({ sizeTitle: '', price: '', quantity: '', image: '' }); // Reset the form
    setIsAddModalVisible(true); // Show the modal to add new size
  };

  // Handle size input changes (sizeTitle, price, quantity, image)
  const handleSizeChange = (field, value) => {
    setEditingSize({ ...editingSize, [field]: value }); // Update the editingSize state
  };

  // Handle Save New Size - add new size to the list
  const handleSaveNewSize = () => {
    const newSize = editingSize;
    setSizes([...sizes, newSize]); // Add the new size to the sizes list
    localStorage.setItem('sizes', JSON.stringify([...sizes, newSize])); // Save updated sizes to localStorage
    setIsAddModalVisible(false); // Close the add modal after saving
    setEditingSize({ sizeTitle: '', price: '', quantity: '', image: '' }); // Reset the size data
  };

  // Handle Save Edit - update the size in the list
  const handleSaveEdit = () => {
    const updatedSizes = [...sizes];
    updatedSizes[editingIndex] = editingSize;
    setSizes(updatedSizes);
    localStorage.setItem('sizes', JSON.stringify(updatedSizes)); // Save updated sizes to localStorage
    setIsEditModalVisible(false); // Close modal after saving
    setEditingIndex(null); // Reset editing state
    setEditingSize({ sizeTitle: '', price: '', quantity: '', image: '' }); // Reset the editing data
  };

  // Handle Delete Size
  const handleDeleteSize = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
    localStorage.setItem('sizes', JSON.stringify(updatedSizes)); // Save updated sizes to localStorage
  };

  // Handle Modal Cancel
  const handleCancelModal = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false); // Close both modals
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Heading */}
      <Title level={2} style={{ textAlign: 'center', color: '#4CAF50' }}>Add Style</Title>

      {/* Image upload section */}
      <Upload
        action="your_upload_endpoint" // Replace with your actual upload endpoint
        listType="picture-card"
        showUploadList={false}
        onChange={({ file }) => {
          if (file.status === 'done') {
            setNewStyle(file.response.url); // Assuming the file response contains a URL
            localStorage.setItem('newStyle', file.response.url); // Save image URL to localStorage
          } else if (file.status === 'uploading') {
            const reader = new FileReader();
            reader.onload = (e) => {
              const previewImage = e.target.result;
              setNewStyle(previewImage); // Preview the image as base64 (optional)
            };
            reader.readAsDataURL(file.originFileObj); // This is for previewing before upload
          }
        }}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload Style Image</div>
        </div>
      </Upload>

      {/* Preview of the uploaded image */}
      {newStyle && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={newStyle}
            alt="Uploaded Style"
            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: '8px' }}
          />
        </div>
      )}

      {/* Input field for Style Title */}
      <div style={{ marginTop: '20px' }}>
        <Title level={4}>Style Title</Title>
        <Input
          placeholder="Enter your style title here"
          value={styleTitle}
          onChange={e => {
            setStyleTitle(e.target.value);
            localStorage.setItem('styleTitle', e.target.value); // Save title to localStorage
          }}
        />
      </div>

      {/* Size Sections */}
      <div style={{ marginTop: '30px' }}>
        <Title level={4}>Please Enter Size Details</Title>

        {/* List of Sizes */}
        {sizes.map((size, index) => (
          <Card
            key={index}
            style={{
              marginBottom: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            hoverable
            actions={[
              <EditOutlined key="edit" onClick={() => { setEditingSize(size); setEditingIndex(index); setIsEditModalVisible(true); }} />,
              <DeleteOutlined key="delete" onClick={() => handleDeleteSize(index)} />
            ]}
          >
            {/* Size Title */}
            <Row gutter={16}>
              <Col span={8}>
                <Title level={5} style={{ color: '#4CAF50' }}>Size Title</Title>
                <p>{size.sizeTitle || 'Untitled Size'}</p>
              </Col>

              {/* Size Price */}
              <Col span={8}>
                <Title level={5} style={{ color: '#4CAF50' }}>Size Price</Title>
                <p>${size.price || 'N/A'}</p>
              </Col>

              {/* Size Quantity */}
              <Col span={8}>
                <Title level={5} style={{ color: '#4CAF50' }}>Size Quantity</Title>
                <p>{size.quantity || 'N/A'}</p>
              </Col>
            </Row>

            {/* Image Preview */}
            {size.image && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={size.image}
                  alt={`Size ${index + 1} Image`}
                  style={{
                    width: "50px", height: "50px", objectFit: "cover", borderRadius: '8px', border: '1px solid #ddd'
                  }}
                />
              </div>
            )}
          </Card>
        ))}

        {/* Button to Add More Sizes */}
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addNewSize}
          block
          style={{
            borderRadius: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Add More Sizes
        </Button>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Size Details"
        visible={isEditModalVisible}
        onCancel={handleCancelModal}
        onOk={handleSaveEdit}
        okText="Save Changes"
        cancelText="Cancel"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Title level={5}>Size Title</Title>
            <Input
              placeholder="Size Title"
              value={editingSize.sizeTitle}
              onChange={(e) => handleSizeChange('sizeTitle', e.target.value)}
            />
          </Col>
          <Col span={8}>
            <Title level={5}>Size Price</Title>
            <Input
              placeholder="Size Price"
              value={editingSize.price}
              onChange={(e) => handleSizeChange('price', e.target.value)}
            />
          </Col>
          <Col span={8}>
            <Title level={5}>Size Quantity</Title>
            <Input
              placeholder="Size Quantity"
              value={editingSize.quantity}
              onChange={(e) => handleSizeChange('quantity', e.target.value)}
            />
          </Col>
        </Row>

        {/* Upload Image for this Size */}
        <Upload
          action="your_upload_endpoint"
          listType="picture-card"
          showUploadList={false}
          onChange={(file) => {
            if (file.status === 'done') {
              setEditingSize(prev => ({ ...prev, image: file.response.url }));
            } else if (file.status === 'uploading') {
              const reader = new FileReader();
              reader.onload = (e) => {
                setEditingSize(prev => ({ ...prev, image: e.target.result }));
              };
              reader.readAsDataURL(file.originFileObj);
            }
          }}
        >
          <div style={{ marginTop: '10px' }}>
            <PlusOutlined />
            <div>Upload Size Image</div>
          </div>
        </Upload>

        {/* Preview of the size image */}
        {editingSize.image && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={editingSize.image}
              alt={`Editing Size Image`}
              style={{
                width: "100px", height: "100px", objectFit: "cover", borderRadius: '8px', border: '1px solid #ddd'
              }}
            />
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal
        title="Add New Size"
        visible={isAddModalVisible}
        onCancel={handleCancelModal}
        onOk={handleSaveNewSize}
        okText="Save New Size"
        cancelText="Cancel"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Title level={5}>Size Title</Title>
            <Input
              placeholder="Size Title"
              value={editingSize.sizeTitle}
              onChange={(e) => handleSizeChange('sizeTitle', e.target.value)}
            />
          </Col>
          <Col span={8}>
            <Title level={5}>Size Price</Title>
            <Input
              placeholder="Size Price"
              value={editingSize.price}
              onChange={(e) => handleSizeChange('price', e.target.value)}
            />
          </Col>
          <Col span={8}>
            <Title level={5}>Size Quantity</Title>
            <Input
              placeholder="Size Quantity"
              value={editingSize.quantity}
              onChange={(e) => handleSizeChange('quantity', e.target.value)}
            />
          </Col>
        </Row>

        {/* Upload Image for this Size */}
        <Upload
          action="your_upload_endpoint"
          listType="picture-card"
          showUploadList={false}
          onChange={(file) => {
            if (file.status === 'done') {
              setEditingSize(prev => ({ ...prev, image: file.response.url }));
            } else if (file.status === 'uploading') {
              const reader = new FileReader();
              reader.onload = (e) => {
                setEditingSize(prev => ({ ...prev, image: e.target.result }));
              };
              reader.readAsDataURL(file.originFileObj);
            }
          }}
        >
          <div style={{ marginTop: '10px' }}>
            <PlusOutlined />
            <div>Upload Size Image</div>
          </div>
        </Upload>

        {/* Preview of the size image */}
        {editingSize.image && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={editingSize.image}
              alt={`Editing Size Image`}
              style={{
                width: "100px", height: "100px", objectFit: "cover", borderRadius: '8px', border: '1px solid #ddd'
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default StyleStepper;
