import React, { useState } from 'react';
import { Table, Row, Col, Card, Button, Divider } from 'antd';
import './order.css';

const Order = () => {
  // Static Data (For Multiple Clients)
  const clients = [
    {
      key: '1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      streetAddress: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      phone: '(123) 456-7890',
      country: 'USA',
      state: 'NY',
      shippingMethod: 'Standard Shipping',
      paymentMethod: 'Credit Card',
      items: [
        {
          id: 1,
          name: 'Custom T-Shirt',
          imageUrl: 'https://via.placeholder.com/100',
          quantity: 2,
          details: {
            area: 'Front',
            style: 'V-Neck',
            size: 'L',
            backingOptions: 'Cotton',
            metallicThread: 'No',
            sizeSymbols: 'Yes',
            colorVersions: 'Red',
            proofOptions: 'Digital Proof',
            turnaroundOptions: '5-7 Days',
          },
        },
        {
          id: 2,
          name: 'Custom Mug',
          imageUrl: 'https://via.placeholder.com/100',
          quantity: 1,
          details: {
            area: 'Front',
            style: 'Classic',
            size: 'Standard',
            backingOptions: 'Ceramic',
            metallicThread: 'No',
            sizeSymbols: 'No',
            colorVersions: 'White',
            proofOptions: 'Physical Proof',
            turnaroundOptions: '2-3 Days',
          },
        },
      ],
      paymentHistory: [
        {
          id: 1,
          date: '2024-10-01',
          amount: '$50.00',
          method: 'Credit Card',
          status: 'Paid',
        },
        {
          id: 2,
          date: '2024-09-15',
          amount: '$75.00',
          method: 'PayPal',
          status: 'Paid',
        },
      ],
    },
    // Second Client Data
    {
      key: '2',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      streetAddress: '456 Elm St',
      city: 'Los Angeles',
      zipCode: '90001',
      phone: '(987) 654-3210',
      country: 'USA',
      state: 'CA',
      shippingMethod: 'Express Shipping',
      paymentMethod: 'PayPal',
      items: [
        {
          id: 1,
          name: 'Custom Hoodie',
          imageUrl: 'https://via.placeholder.com/100',
          quantity: 1,
          details: {
            area: 'Back',
            style: 'Pullover',
            size: 'M',
            backingOptions: 'Polyester',
            metallicThread: 'Yes',
            sizeSymbols: 'No',
            colorVersions: 'Black',
            proofOptions: 'Digital Proof',
            turnaroundOptions: '3-5 Days',
          },
        },
        {
          id: 2,
          name: 'Custom Water Bottle',
          imageUrl: 'https://via.placeholder.com/100',
          quantity: 3,
          details: {
            area: 'Front',
            style: 'Classic',
            size: '500ml',
            backingOptions: 'Stainless Steel',
            metallicThread: 'No',
            sizeSymbols: 'Yes',
            colorVersions: 'Blue',
            proofOptions: 'Physical Proof',
            turnaroundOptions: '4-6 Days',
          },
        },
      ],
      paymentHistory: [
        {
          id: 1,
          date: '2024-10-10',
          amount: '$40.00',
          method: 'PayPal',
          status: 'Paid',
        },
        {
          id: 2,
          date: '2024-09-20',
          amount: '$90.00',
          method: 'Credit Card',
          status: 'Paid',
        },
      ],
    },
  ];

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

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
      width: 180, // Adjusted width
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 150, // Adjusted width
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 150, // Adjusted width
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      width: 150, // Adjusted width
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
      width: 180, // Adjusted width
    },
  ];

  // Define Expanded Row Content
  const expandedRowRender = (record) => {
    return (
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card title="Shipping Method" bordered={false}>
            <div>{record.shippingMethod}</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card title="Payment Method" bordered={false}>
            <div>{record.paymentMethod}</div>
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
        scroll={{ x: 900 }}  // Adjusted table width for responsiveness
        bordered
        size="middle"
        className="order-table"
      />
    </div>
  );
};

export default Order;
