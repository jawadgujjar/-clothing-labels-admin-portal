import React, { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import "./quote.css";
import { quote } from "../utils/axios"; // Assuming 'quote' is an axios instance or function

function Quote() {
  const [quoteData, setQuoteData] = useState([]);

  const handleFilePreview = (file) => {
    if (file && file.originFileObj instanceof File) {
      return URL.createObjectURL(file.originFileObj); // Generate preview URL
    } else {
      return null; // Return null if file object is invalid
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await quote.delete(`/${id}`);
      // If the response is successful, remove the deleted quote from state
      setQuoteData(quoteData.filter((quote) => quote.id !== id));
      message.success("Quote deleted successfully");
    } catch (error) {
      console.error("Error deleting quote:", error);
      message.error("Failed to delete quote. Please try again later.");
    }
  };

  // Columns configuration for the table
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Artwork Image",
      dataIndex: "artwork",
      key: "artwork",
      render: (artwork) =>
        artwork.map((file) => {
          return (
            <img
              src={file}
              alt="Artwork"
              style={{ width: "5rem", height: "6rem" }}
            />
          );
        }),
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Contact",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          danger
          onClick={() => handleDelete(record.id)} // Assuming `id` is the identifier for the quote
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Function to fetch data from API
    const fetchQuotes = async () => {
      try {
        const response = await quote.get("/"); // Adjust the endpoint as per your API
        console.log(response.data.quotes);
        setQuoteData(
          response.data.quotes.map((item, index) => ({
            ...item,
            key: index, // Adding a unique key for each row
          }))
        );
      } catch (error) {
        console.error("Error fetching quotes:", error);
        message.error("Failed to fetch quotes. Please try again later.");
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="quote-container">
      <h2 className="quote-title">Quote Table</h2>
      <div className="quote-table-wrapper">
        <Table
          columns={columns}
          dataSource={quoteData} // Use the fetched data from the state
          pagination={false} // Optional: Add pagination if needed
          className="custom-table" // Add a custom class to apply styles
        />
      </div>
    </div>
  );
}

export default Quote;
