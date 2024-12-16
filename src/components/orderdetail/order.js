import React, { useState, useEffect } from "react";
import { Table, Row, Col, Card, Button, Divider, message } from "antd";
import { orders } from "../../utils/axios";
import "./order.css";

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

        // Mapping response data
        setClients(
          response.data.data.map((item, index) => ({
            key: index, // Unique key for each row

            // User Details
            userId: item.user?.id || "N/A",
            name: item.user?.name || "N/A",
            email: item.user?.email || "N/A",
            phoneNumber: item.user?.phoneNumber || "N/A",

            // Billing Address
            billingFirstName: item.billingAddress?.firstName || "N/A",
            billingMiddleName: item.billingAddress?.middleName || "N/A",
            billingLastName: item.billingAddress?.lastName || "N/A",
            billingCompanyName: item.billingAddress?.companyName || "N/A",
            billingPhoneNumber: item.billingAddress?.phoneNumber || "N/A",
            billingStreetAddress: item.billingAddress?.streetAddress || "N/A",
            billingCity: item.billingAddress?.city || "N/A",
            billingState: item.billingAddress?.stateOrProvince || "N/A",
            billingZip: item.billingAddress?.zipOrPostalCode || "N/A",
            billingCountry: item.billingAddress?.country || "N/A",

            // Shipping Address
            shippingFirstName: item.shippingAddress?.firstName || "N/A",
            shippingMiddleName: item.shippingAddress?.middleName || "N/A",
            shippingLastName: item.shippingAddress?.lastName || "N/A",
            shippingCompanyName: item.shippingAddress?.companyName || "N/A",
            shippingPhoneNumber: item.shippingAddress?.phoneNumber || "N/A",
            shippingStreetAddress: item.shippingAddress?.streetAddress || "N/A",
            shippingCity: item.shippingAddress?.city || "N/A",
            shippingState: item.shippingAddress?.stateOrProvince || "N/A",
            shippingZip: item.shippingAddress?.zipOrPostalCode || "N/A",
            shippingCountry: item.shippingAddress?.country || "N/A",

            // Checkout Products
            checkoutProducts:
              item.checkoutProducts?.map((product) => ({
                productName: product.productName || "N/A",
                artworkFile: product.artworkFile || "N/A",
                size: product.size || "N/A",
                style: product.style || "N/A",
                quantity: product.quantity || 0,
                totalPrice: product.totalPrice || "N/A",
                options: product.options || [],
                comments: product.comments || "N/A",
              })) || [],

            // Payment Details
            paymentMethod: item.payment?.method || "N/A",
            paymentCurrency: item.payment?.currency || "N/A",
            paymentStatus: item.payment?.status || "N/A",
            paymentTotalAmount: item.payment?.totalAmount || "N/A",
            paymentTransactionId: item.payment?.transactionId || "N/A",
            payerEmail: item.payment?.payerEmail || "N/A",
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
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      width: 180,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    // {
    //   title: 'Last Name',
    //   dataIndex: 'lastName',
    //   key: 'lastName',
    //   width: 150,
    // },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Actions",
      key: "actions",
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
          {expandedRowKeys.includes(record.key)
            ? "Hide Order Details"
            : "Show Order Details"}
        </Button>
      ),
      width: 180,
    },
  ];

  // Define Expanded Row Content
  const expandedRowRender = (record) => {
    const checkoutProducts = record.checkoutProducts || []; // Safely access checkoutProducts
    return (
      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* Billing Address */}
        <Col xs={24} sm={12} md={8}>
          <Card title="Billing Address" bordered={false}>
            <div>
              <strong>First Name:</strong> {record.billingFirstName}
            </div>
            <div>
              <strong>Middle Name:</strong> {record.billingMiddleName}
            </div>
            <div>
              <strong>Last Name:</strong> {record.billingLastName}
            </div>
            <div>
              <strong>Company Name:</strong> {record.billingCompanyName}
            </div>
            <div>
              <strong>Phone Number:</strong> {record.billingPhoneNumber}
            </div>
            <div>
              <strong>Street Address:</strong> {record.billingStreetAddress}
            </div>
            <div>
              <strong>City:</strong> {record.billingCity}
            </div>
            <div>
              <strong>State/Province:</strong> {record.billingState}
            </div>
            <div>
              <strong>Zip/Postal Code:</strong> {record.billingZip}
            </div>
            <div>
              <strong>Country:</strong> {record.billingCountry}
            </div>
          </Card>
        </Col>

        {/* Shipping Address */}
        <Col xs={24} sm={12} md={8}>
          <Card title="Shipping Address" bordered={false}>
            <div>
              <strong>First Name:</strong> {record.shippingFirstName}
            </div>
            <div>
              <strong>Middle Name:</strong> {record.shippingMiddleName}
            </div>
            <div>
              <strong>Last Name:</strong> {record.shippingLastName}
            </div>
            <div>
              <strong>Company Name:</strong> {record.shippingCompanyName}
            </div>
            <div>
              <strong>Phone Number:</strong> {record.shippingPhoneNumber}
            </div>
            <div>
              <strong>Street Address:</strong> {record.shippingStreetAddress}
            </div>
            <div>
              <strong>City:</strong> {record.shippingCity}
            </div>
            <div>
              <strong>State/Province:</strong> {record.shippingState}
            </div>
            <div>
              <strong>Zip/Postal Code:</strong> {record.shippingZip}
            </div>
            <div>
              <strong>Country:</strong> {record.shippingCountry}
            </div>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col xs={24} sm={12} md={8}>
          <Card title="Order Summary" bordered={false}>
            {checkoutProducts.length > 0 ? (
              checkoutProducts.map((product, index) => (
                <div key={index}>
                  <Row align="middle">
                    <Col span={6}>
                      <img
                        src={product.artworkFile}
                        alt={product.productName}
                        style={{ width: "50px", height: "auto" }}
                      />
                    </Col>
                    <Col span={18}>
                      <div>
                        <strong>{product.productName}</strong>
                      </div>
                      <div>Quantity: {product.quantity}</div>
                      <div>Style: {product.style || "N/A"}</div>
                      <div>Size: {product.size || "N/A"}</div>
                      <div>Options: {product.options.join(", ") || "N/A"}</div>
                      <div>Comments: {product.comments || "N/A"}</div>
                      <div>Total Price: ${product.totalPrice}</div>
                    </Col>
                  </Row>
                  {index < checkoutProducts.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <div>No items available</div>
            )}
          </Card>
        </Col>

        {/* Payment History */}
        {/* Payment Details */}
        <Col span={24}>
          <Card title="Payment Details" bordered={false}>
            <Table
              columns={[
                {
                  title: "Transaction ID",
                  dataIndex: "transactionId",
                  key: "transactionId",
                },
                { title: "Payment Method", dataIndex: "method", key: "method" },
                { title: "Currency", dataIndex: "currency", key: "currency" },
                {
                  title: "Total Amount",
                  dataIndex: "totalAmount",
                  key: "totalAmount",
                  render: (text) => `$${text}`, // Format amount as currency
                },
                {
                  title: "Payer Email",
                  dataIndex: "payerEmail",
                  key: "payerEmail",
                },
                { title: "Status", dataIndex: "status", key: "status" },
              ]}
              dataSource={[
                {
                  transactionId: record.paymentTransactionId || "N/A",
                  method: record.paymentMethod || "N/A",
                  currency: record.paymentCurrency || "N/A",
                  totalAmount: record.paymentTotalAmount || "N/A",
                  payerEmail: record.payerEmail || "N/A",
                  status: record.paymentStatus || "N/A",
                },
              ]}
              pagination={false}
              bordered
              size="middle"
              style={{ marginTop: "20px" }}
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
