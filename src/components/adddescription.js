import React, { useState } from 'react';
import { Input, Upload, Button, Form, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './adddescription.css'; // Custom styles for your component

function Adddescription() {
  const [size, setSize] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  
  // Handle size input
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  // Handle title input
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle image upload
  const handleImageChange = ({ fileList }) => {
    setImages(fileList);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Size:', size);
    console.log('Title:', title);
    console.log('Images:', images);
    // Add logic to save the data
  };

  return (
    <div className="add-description-container">
      <h2>Add Description</h2>

      {/* Form for adding description */}
      <Form onFinish={handleSubmit}>
        
        {/* Size Field */}
        <Form.Item label="Size" name="size">
          <Input 
            placeholder="Enter size" 
            value={size} 
            onChange={handleSizeChange} 
          />
        </Form.Item>

        {/* Title Field */}
        <Form.Item label="Title" name="title">
          <Input 
            placeholder="Enter title" 
            value={title} 
            onChange={handleTitleChange} 
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item label="Upload Images" name="images">
          <Upload
            action="your_upload_endpoint" // Replace with your upload endpoint
            listType="picture"
            fileList={images}
            onChange={handleImageChange}
            showUploadList={true}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Description
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Adddescription;
