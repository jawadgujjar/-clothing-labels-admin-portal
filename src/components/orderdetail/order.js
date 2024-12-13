import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Card, Button, Divider,message } from 'antd';
import { orders } from "../../utils/axios";
import './order.css';

const Order = () => {
  // State for clients data
  const [clients, setClients] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    // Function to fetch data from API
    const fetchQuotes = async () => {
      try {
        const response = await orders.get("/"); // Adjust the endpoint as per your API
        console.log(response.data);
      
        // Accessing the data field inside the response and then mapping through it
        setClients(
          response.data.data.map((item, index) => ({
            key: index, // Adding a unique key for each row
            name: item.user.name,
            email: item.user.email,
            phoneNumber: item.user.phoneNumber,
            billingCity: item.billingAddress.city,
            billingState: item.billingAddress.stateOrProvince,
            billingZip: item.billingAddress.zipOrPostalCode,
            shippingCity: item.shippingAddress.city,
            shippingState: item.shippingAddress.stateOrProvince,
            shippingZip: item.shippingAddress.zipOrPostalCode,
            paymentMethod: item.payment.method,
            paymentAmount: item.payment.totalAmount,
            paymentStatus: item.payment.status,
            transactionId: item.payment.transactionId,
            checkoutProductName: item.checkoutProducts.length > 0 ? item.checkoutProducts[0].productName : 'No products',
            checkoutProductSize: item.checkoutProducts.length > 0 ? item.checkoutProducts[0].size : 'N/A',
            checkoutProductArtwork: item.checkoutProducts.length > 0 ? item.checkoutProducts[0].artworkFile : 'No artwork',
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch quotes. Please try again later.");
      }
      
    };

    fetchQuotes();
  }, []);

  // Toggle row expansion
  const onExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  // Define Table Columns for Client Basic Info
  const columns = [
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 150,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 150,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            if (expandedRowKeys.includes(record.key)) {
              setExpandedRowKeys([]);
            } else {
              setExpandedRowKeys([record.key]);
            }
          }}
        >
          {expandedRowKeys.includes(record.key) ? 'Hide Order Details' : 'Show Order Details'}
        </Button>
      ),
      width: 180,
    },
  ];

  // Define Expanded Row Content
  const expandedRowRender = (record) => {
    return (
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card title="Billing Address" bordered={false}>
            <div><strong>First Name:</strong> {record.firstName}</div>
            <div><strong>Middle Name:</strong> {record.middleName}</div>
            <div><strong>Last Name:</strong> {record.lastName}</div>
            <div><strong>Company Name:</strong> {record.companyName}</div>
            <div><strong>Phone Number:</strong> {record.phone}</div>
            <div><strong>Street Address:</strong> {record.streetAddress}</div>
            <div><strong>City:</strong> {record.city}</div>
            <div><strong>State/Province:</strong> {record.state}</div>
            <div><strong>Zip/Postal Code:</strong> {record.zipCode}</div>
            <div><strong>Country:</strong> {record.country}</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card title="Shipping Address" bordered={false}>
            <div><strong>First Name:</strong> {record.firstName}</div>
            <div><strong>Middle Name:</strong> {record.middleName}</div>
            <div><strong>Last Name:</strong> {record.lastName}</div>
            <div><strong>Company Name:</strong> {record.companyName}</div>
            <div><strong>Phone Number:</strong> {record.phone}</div>
            <div><strong>Street Address:</strong> {record.streetAddress}</div>
            <div><strong>City:</strong> {record.city}</div>
            <div><strong>State/Province:</strong> {record.state}</div>
            <div><strong>Zip/Postal Code:</strong> {record.zipCode}</div>
            <div><strong>Country:</strong> {record.country}</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card title="Order Summary" bordered={false}>
            {record.items.map((item, index) => (
              <div key={index}>
                <Row align="middle">
                  <Col span={6}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: 'auto' }} />
                  </Col>
                  <Col span={18}>
                    <div>{item.name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Area: {item.details.area}</div>
                    <div>Style: {item.details.style}</div>
                    <div>Size: {item.details.size}</div>
                  </Col>
                </Row>
                <Divider />
              </div>
            ))}
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Payment History" bordered={false}>
            <Table
              columns={[
                {
                  title: 'Payment Date',
                  dataIndex: 'date',
                  key: 'date',
                },
                {
                  title: 'Amount',
                  dataIndex: 'amount',
                  key: 'amount',
                },
                {
                  title: 'Payment Method',
                  dataIndex: 'method',
                  key: 'method',
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                },
              ]}
              dataSource={record.paymentHistory}
              pagination={false}
              bordered
              size="middle"
              style={{ marginTop: '20px' }}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <div className="order-details-container">
      <h2 className="order-heading">Client Order Details</h2>

      {/* Clients Data Table */}
      <Table
        columns={columns}
        dataSource={clients}
        expandedRowKeys={expandedRowKeys}
        onExpand={onExpand}
        expandedRowRender={expandedRowRender}
        pagination={false}
        scroll={{ x: 900 }}
        bordered
        size="middle"
        className="order-table"
      />
    </div>
  );
};

export default Order;
