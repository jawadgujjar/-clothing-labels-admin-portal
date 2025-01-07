import React, { useState, useEffect } from "react";
import { Table, Input, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { newsletteremail } from "../../utils/axios";
import './subscribeemail.css'; // Import your custom CSS file

function Subscribeemail() {
  const [emails, setEmails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        const response = await newsletteremail.get("/"); // Make the GET API call
        setEmails(response.data); // Assuming the response contains an array of emails
      } catch (err) {
        setError("Error fetching data: " + err.message);
        message.error("Failed to fetch emails!");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Columns for the table
  const columns = [
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
    },
  ];

  // Filter the data based on search input
  const filteredData = emails.filter((item) =>
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="email-container">
      <h2>Subscribed Emails</h2>

      {/* Search Input */}
      <div className="search-container">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by Email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="email-search-input"
        />
      </div>

      {loading ? (
        <Spin size="large" tip="Loading emails..." />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }} // This ensures the table is responsive
          rowClassName="email-table-row"
          size="middle"
          bordered
          className="email-table"
        />
      )}
    </div>
  );
}

export default Subscribeemail;
