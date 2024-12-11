import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { pendingcheckout } from "../utils/axios"; // Import your axios instance

const PendingCheckoutTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the backend API
    const token = localStorage.getItem("token"); // Get the token from localStorage

    pendingcheckout
      .get("/", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in headers
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pending checkouts:", error);
        setLoading(false);
      });
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    // Same as before
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found, please login.");
      return;
    }

    try {
      const response = await pendingcheckout.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        message.success("Pending checkout deleted successfully.");
        const updatedData = await pendingcheckout.get("/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(updatedData.data.results);
      }
    } catch (error) {
      message.error("Error deleting pending checkout.");
      console.error(error);
    } finally {
      setLoading(false); // Ensure loading state is set back to false
    }
  };
  // Define table columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "user",
      key: "user",
      render: (user) => user[0]?.name, // Assuming there is only one user in the array
    },
    {
      title: "Product Name",
      dataIndex: "pendingCheckout",
      key: "productName",
      render: (pendingCheckout) => pendingCheckout[0]?.productName, // Display the first product name
    },
    {
      title: "Size",
      dataIndex: "pendingCheckout",
      key: "size",
      render: (pendingCheckout) => pendingCheckout[0]?.size, // Display the size of the first product
    },
    {
      title: "Style",
      dataIndex: "pendingCheckout",
      key: "style",
      render: (pendingCheckout) => pendingCheckout[0]?.style, // Display the style of the first product
    },
    {
      title: "Comments",
      dataIndex: "pendingCheckout",
      key: "comments",
      render: (pendingCheckout) => pendingCheckout[0]?.comments, // Display the comments of the first product
    },
    {
      title: "Price",
      dataIndex: "pendingCheckout",
      key: "price",
      render: (pendingCheckout) => {
        // Extract quantityPrice and display it
        const price = pendingCheckout[0]?.quantityPrice[0]?.price;
        return price ? `$${price}` : "N/A";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => handleDelete(record.id)} // Pass the _id to delete the specific record
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
      pagination={{ pageSize: 10 }} // Pagination
    />
  );
};

export default PendingCheckoutTable;
