import React, { useState } from 'react';
import { Button, Modal, Upload, Input, message, List, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function Fancyhangtags1() {
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [productList, setProductList] = useState([]);

  // Handle adding new product
  const handleAddNewProduct = () => {
    setIsProductModalVisible(true);
  };

  const handleProductOk = () => {
    if (!newImage || !newTitle) {
      message.error('Please fill all fields.');
      return;
    }

    // Add the new product to the list
    const newProduct = {
      title: newTitle,
      description: newDescription,
      image: newImage,
    };
    setProductList([...productList, newProduct]);

    message.success('New product added');
    setIsProductModalVisible(false);
    setNewTitle('');
    setNewDescription('');
    setNewImage(null);
  };

  const handleProductCancel = () => {
    setIsProductModalVisible(false);
    setNewTitle('');
    setNewDescription('');
    setNewImage(null);
  };

  // Handle image upload change event
  const handleImageChange = (info) => {
    console.log('File info:', info); // Debugging: log file info

    if (info.file.status === 'done') {
      console.log('Image uploaded successfully', info.file.response);
      setNewImage(info.file.response.url); // Assuming response contains the image URL
    } else if (info.file.status === 'error') {
      message.error('Image upload failed');
    }
  };

  // Ensure only images and files smaller than 2MB can be uploaded
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    const isValidSize = file.size / 1024 / 1024 < 2; // 2MB limit
    if (!isValidSize) {
      message.error('Image must be smaller than 2MB!');
    }
    return isImage && isValidSize;
  };

  return (
    <div>
      <h2>Fancy Hangtags Products</h2>

      {/* Button to trigger adding a new product */}
      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewProduct}>
          Add New Product
        </Button>
      </div>

      {/* Modal for adding new product */}
      <Modal
        title="Add New Hangtag"
        visible={isProductModalVisible}
        onOk={handleProductOk}
        onCancel={handleProductCancel}
      >
        <Upload
          action="your_backend_upload_url" // Replace with your actual backend upload URL
          listType="picture"
          onChange={handleImageChange}
          beforeUpload={beforeUpload} // Validate file before upload
          showUploadList={false} // Hide default upload list
        >
          <Button>Upload Image</Button>
        </Upload>

        {/* Display uploaded image below the button */}
        {newImage && (
          <img src={newImage} alt="Uploaded Hangtag" style={{ width: '100%', marginTop: '10px' }} />
        )}

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

      {/* Display list of added products */}
      <div style={{ marginTop: '20px' }}>
        <h3>Product List</h3>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={productList}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                cover={<img alt="Hangtag" src={item.image} />}
              >
                <Card.Meta title={item.title} description={item.description} />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Fancyhangtags1;
