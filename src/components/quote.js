import React, { useEffect, useState } from "react";
import { Table, Image, message } from "antd";
import "./quote.css";
import { quote } from "../utils/axios";

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
      dataIndex: "artwork",
      key: "artwork",
      render: (artwork) =>
        artwork && artwork.length > 0 ? (
          <Image width={50} src={artwork[0]} /> // Displaying the first artwork URL
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
    quote({ method: "get" })
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          console.log("Data:", res.data);
          setQuoteData(res.data); // Set the fetched data to the state
        } else {
          console.log("No data found or data is empty");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        message.error("Something went wrong, please try again!");
      });
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
