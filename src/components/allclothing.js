import React, { useState } from 'react';
import { Card, Button, Modal, Input, Upload, TextArea } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; 
import './allclothing.css';

const clothingItemsInitial = [
  {
    id: 1,
    imageUrl: 'https://i.pinimg.com/736x/33/ef/f3/33eff36cddd11e67f2d5e63d763325e8.jpg',
    title: 'Stylish Shirt',
    description: {
      images: [],
      style: '',
      sizes: '',
      versions: '',
      proof: '',
      quantity: 1
    }
  },
  // Add more items as needed
];

const AllClothing1 = ({ imageUrl, title, onEdit, onDelete, onEditDescription }) => (
  <div className="allclothing-item">
    <div className="allclothing-buttons">
      <Button type="primary" onClick={onEdit}>Edit</Button>
      <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={onDelete}>
        Delete
      </Button>
    </div>
    <Card className="allclothing-card" cover={<img alt="Clothing" src={imageUrl} />} >
      <h3 className="allclothing-title">{title}</h3>
    </Card>
    <Button type="default" onClick={onEditDescription} style={{ marginTop: '10px' }}>
      Edit Description
    </Button>
  </div>
);

const AllCloth1 = () => {
  const [clothingItems, setClothingItems] = useState(clothingItemsInitial);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null);
  const [descriptionData, setDescriptionData] = useState({ images: [], style: '', sizes: '', versions: '', proof: '', quantity: 1 });

  const handleEdit = (id) => {
    const item = clothingItems.find(item => item.id === id);
    setNewImage(item.imageUrl);
    setNewTitle(item.title);
    setCurrentItemId(id);
    setIsEditModalVisible(true);
  };

  const handleDelete = (id) => {
    setClothingItems(clothingItems.filter(item => item.id !== id));
    console.log(`Delete item with ID: ${id}`);
  };

  const handleAddNewProduct = () => {
    setIsModalVisible(true);
  };

  const handleEditDescription = (id) => {
    const item = clothingItems.find(item => item.id === id);
    setDescriptionData(item.description);
    setCurrentItemId(id);
    setIsDescriptionModalVisible(true);
  };

  const handleOk = () => {
    if (newImage && newTitle) {
      const newItem = {
        id: clothingItems.length + 1,
        imageUrl: newImage,
        title: newTitle,
        description: {
          images: [],
          style: '',
          sizes: '',
          versions: '',
          proof: '',
          quantity: 1
        }
      };
      setClothingItems([...clothingItems, newItem]);
      resetModal();
    } else {
      alert('Please provide both image and title!');
    }
  };

  const handleEditOk = () => {
    if (newImage && newTitle && currentItemId !== null) {
      const updatedItems = clothingItems.map(item =>
        item.id === currentItemId ? { ...item, imageUrl: newImage, title: newTitle } : item
      );
      setClothingItems(updatedItems);
      resetEditModal();
    } else {
      alert('Please provide both image and title!');
    }
  };

  const handleDescriptionOk = () => {
    if (currentItemId !== null) {
      const updatedItems = clothingItems.map(item =>
        item.id === currentItemId ? { ...item, description: descriptionData } : item
      );
      setClothingItems(updatedItems);
      resetDescriptionModal();
    }
  };

  const handleCancel = () => {
    resetModal();
  };

  const handleEditCancel = () => {
    resetEditModal();
  };

  const handleDescriptionCancel = () => {
    resetDescriptionModal();
  };

  const handleImageChange = ({ file }) => {
    if (file.status === 'done') {
      setNewImage(file.response.url);
    } else if (file.status === 'uploading') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImage(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const resetModal = () => {
    setIsModalVisible(false);
    setNewImage(null);
    setNewTitle('');
  };

  const resetEditModal = () => {
    setIsEditModalVisible(false);
    setNewImage(null);
    setNewTitle('');
    setCurrentItemId(null);
  };

  const resetDescriptionModal = () => {
    setIsDescriptionModalVisible(false);
    setDescriptionData({ images: [], style: '', sizes: '', versions: '', proof: '', quantity: 1 });
    setCurrentItemId(null);
  };

  return (
    <div>
      <h2>All Clothing Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {clothingItems.map(item => (
          <AllClothing1
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
            onEditDescription={() => handleEditDescription(item.id)}
          />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNewProduct}
          >
            Add New Product
          </Button>
        </div>
      </div>

      {/* Add New Product Modal */}
      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload
          action="your_upload_endpoint" 
          listType="picture"
          onChange={handleImageChange}
          showUploadList={false}
        >
          <Button>Upload Image</Button>
        </Upload>
        {newImage && <img src={newImage} alt="New Product" style={{ width: '100%', marginTop: '10px' }} />}
        <Input
          placeholder="Enter product title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginTop: '10px' }}
        />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Upload
          action="your_upload_endpoint" 
          listType="picture"
          onChange={handleImageChange}
          showUploadList={false}
        >
          <Button>Upload Image</Button>
        </Upload>
        {newImage && <img src={newImage} alt="Edit Product" style={{ width: '100%', marginTop: '10px' }} />}
        <Input
          placeholder="Enter product title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginTop: '10px' }}
        />
      </Modal>

      {/* Edit Description Modal */}
      <Modal
        title="Edit Product Description"
        visible={isDescriptionModalVisible}
        onOk={handleDescriptionOk}
        onCancel={handleDescriptionCancel}
      >
        <Input
          placeholder="Enter product style"
          value={descriptionData.style}
          onChange={(e) => setDescriptionData({ ...descriptionData, style: e.target.value })}
          style={{ marginTop: '10px' }}
        />
        <Input
          placeholder="Enter sizes"
          value={descriptionData.sizes}
          onChange={(e) => setDescriptionData({ ...descriptionData, sizes: e.target.value })}
          style={{ marginTop: '10px' }}
        />
        <Input
          placeholder="Enter versions"
          value={descriptionData.versions}
          onChange={(e) => setDescriptionData({ ...descriptionData, versions: e.target.value })}
          style={{ marginTop: '10px' }}
        />
        <Input
          placeholder="Enter proof"
          value={descriptionData.proof}
          onChange={(e) => setDescriptionData({ ...descriptionData, proof: e.target.value })}
          style={{ marginTop: '10px' }}
        />
        <Input
          placeholder="Enter quantity"
          type="number"
          value={descriptionData.quantity}
          onChange={(e) => setDescriptionData({ ...descriptionData, quantity: e.target.value })}
          style={{ marginTop: '10px' }}
        />
        {/* Handle images (you can customize this further) */}
        <Upload
          listType="picture"
          onChange={({ file }) => {
            if (file.status === 'done') {
              setDescriptionData({
                ...descriptionData,
                images: [...descriptionData.images, file.response.url] // Update this as per your image upload response
              });
            }
          }}
          showUploadList
        >
          <Button>Upload Images</Button>
        </Upload>
        {descriptionData.images.map((img, index) => (
          <img key={index} src={img} alt={`Description Image ${index + 1}`} style={{ width: '100%', marginTop: '10px' }} />
        ))}
      </Modal>
    </div>
  );
};

export default AllCloth1;
