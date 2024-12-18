import React, { useEffect, useState } from "react";
import { products } from "../utils/axios"; // Adjust path accordingly
import { Table, Button, message } from "antd";
import "./allclothing.css";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Import icons

const AllCloth1 = () => {
  const [product, setProduct] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    products
      .get("/") // Relative path based on baseURL
      .then((response) => {
        setProduct(response.data.results); // Save data in state
       })
      .catch((error) => {
        console.error("Error fetching products:", error); // Handle error
      });
  }, []);

  // Handle delete action
  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    products
      .delete(`/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Assuming the API has a delete endpoint like '/products/:id'
      .then(() => {
        message.success("Product deleted successfully!");
        setProduct((prevProducts) =>
          prevProducts.filter((item) => item._id !== productId)
        ); // Remove product from state
      })
      .catch((error) => {
        message.error("Failed to delete the product");
        console.error("Error deleting product:", error);
      });
  };

  // Define columns for the Table component
  const columns = [
    {
      title: "Title",
      dataIndex: "title", // Matching with product data key
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title), // Optional sorting
    },
    {
      title: "Description",
      dataIndex: "descriptions",
      key: "description",
      render: (descriptions) =>
        descriptions[0]?.descriptionTitle || "No Description", // Display description title
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="product" style={{ width: "50px" }} />
      ), // Display image thumbnail
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Link to={`/editproduct/${record._id}`}>
            <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            type="danger"
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Products</h1>
      <Link to="/addproduct">
        <Button type="primary" style={{ marginBottom: "16px" }}>
          Add Product
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={product} // Data passed to the table
        rowKey="_id" // Unique identifier for each row
        pagination={{ pageSize: 10 }} // Pagination settings (10 items per page)
        bordered // Add border to the table
        title={() => "Product List"} // Optional title for the table
      />
    </div>
  );
};

export default AllCloth1;
