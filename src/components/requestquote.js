import React, { useEffect, useState } from "react";
import { Table, Card, Row, Col, Typography } from "antd";
import "./requestquote.css"; // Custom CSS file
import { requestquote } from "../utils/axios"; // Assuming you have axios set up in utils

const { Title } = Typography;

const Requestquote1 = () => {
  const [requestquoteData, setRequestQuoteData] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State for error handling

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="Product" className="reqquote-image" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Width",
      dataIndex: "width",
    },
    {
      title: "Height",
      dataIndex: "height",
    },
    {
      title: "Paper Weight",
      dataIndex: "paperWeight",
    },
    {
      title: "Paper Finish",
      dataIndex: "paperFinish",
    },
    {
      title: "Print Option",
      dataIndex: "printOption",
    },
    {
      title: "Hole Punch Position",
      dataIndex: "holePunchPosition",
    },
    {
      title: "Emboss or Deboss",
      dataIndex: "embossOrDeboss",
    },
    {
      title: "Round Corner",
      dataIndex: "roundCorner",
    },
    {
      title: "UV Spot Gloss",
      dataIndex: "uvSpotGloss",
    },
    {
      title: "Metallic Foil Color",
      dataIndex: "metallicFoilColor",
    },
    {
      title: "String Color",
      dataIndex: "stringColor",
    },
    {
      title: "Safety Color",
      dataIndex: "safetyColor",
    },
    {
      title: "Hole Grommet",
      dataIndex: "holeGrommet",
    },
    {
      title: "Proof Options",
      dataIndex: "proofOptions",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Comments",
      dataIndex: "comments",
    },
  ];

  useEffect(() => {
    // Fetch quotes from the API
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const response = await requestquote.get("/"); // Check this endpoint
        console.log("object",response);
        if (response && response.data && response.data.data) {
          setRequestQuoteData(
            response.data.data.map((item, index) => ({
              ...item,
              key: index,
            }))
          );
          console.log("dfw", requestquoteData);
        } else {
          throw new Error("No quotes available.");
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setError("Failed to fetch quotes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while data is fetching
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  return (
    <div className="reqquote-container">
      <Title level={2} className="reqquote-title">
        Request a Quote
      </Title>

      <Row gutter={[16, 16]}>
        {/* Table for larger screens */}
        <Col span={24} className="reqquote-table-container">
          <Table
            columns={columns}
            dataSource={requestquoteData} // Use the real fetched data
            bordered
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 5 }}
            className="reqquote-table"
          />
        </Col>

        {/* Card layout for smaller screens */}
        <Col xs={24} sm={24} md={0}>
          {requestquoteData.map((item) => (
            <Card
              key={item.key}
              title={item.name}
              extra={
                <img
                  src={item.image}
                  alt="Product"
                  className="reqquote-image-small"
                />
              }
              className="reqquote-card"
            >
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Phone:</strong> {item.phoneNumber}
              </p>
              <p>
                <strong>Width x Height:</strong> {item.width} x {item.height}
              </p>
              <p>
                <strong>Paper Weight:</strong> {item.paperWeight}
              </p>
              <p>
                <strong>Print Option:</strong> {item.printOption}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Comments:</strong> {item.comments}
              </p>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Requestquote1;
