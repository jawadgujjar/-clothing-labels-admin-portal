import React, { useEffect, useState } from "react";
import { Table, Image, message } from "antd";
import "./quote.css";
import { quote } from "../utils/axios"; // Assuming 'quote' is an axios instance or function

function Quote() {
  const [quoteData, setQuoteData] = useState([]);

  // Columns configuration for the table
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Artwork Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image && image.length > 0 ? (
          <Image width={50} src={image} alt="Artwork" /> // Pass the `image` URL from the row data
        ) : (
          <span>No Image</span>
        ),
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
