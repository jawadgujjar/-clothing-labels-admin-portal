import React from 'react';
import { Table, Card, Row, Col, Typography } from 'antd';
import './requestquote.css'; // Custom CSS file

const { Title } = Typography;

const Requestquote1 = () => {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (text) => <img src={text} alt="Product" className="reqquote-image" />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Width',
      dataIndex: 'width',
    },
    {
      title: 'Height',
      dataIndex: 'height',
    },
    {
      title: 'Paper Weight',
      dataIndex: 'paperWeight',
    },
    {
      title: 'Paper Finish',
      dataIndex: 'paperFinish',
    },
    {
      title: 'Print Option',
      dataIndex: 'printOption',
    },
    {
      title: 'Hole Punch Position',
      dataIndex: 'holePunchPosition',
    },
    {
      title: 'Emboss or Deboss',
      dataIndex: 'embossDeboss',
    },
    {
      title: 'Round Corner',
      dataIndex: 'roundCorner',
    },
    {
      title: 'UV Spot Gloss',
      dataIndex: 'uvSpotGloss',
    },
    {
      title: 'Metallic Foil Color',
      dataIndex: 'metallicFoilColor',
    },
    {
      title: 'String Color',
      dataIndex: 'stringColor',
    },
    {
      title: 'Safety Color',
      dataIndex: 'safetyColor',
    },
    {
      title: 'Hole Grommet',
      dataIndex: 'holeGrommet',
    },
    {
      title: 'Proof Options',
      dataIndex: 'proofOptions',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
    },
  ];

  // Dummy data for the table
  const data = [
    {
      key: '1',
      image: 'https://via.placeholder.com/50',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      width: '8.5"',
      height: '11"',
      paperWeight: '100gsm',
      paperFinish: 'Glossy',
      printOption: 'Full Color',
      holePunchPosition: 'Top Center',
      embossDeboss: 'Emboss',
      roundCorner: 'Yes',
      uvSpotGloss: 'Yes',
      metallicFoilColor: 'Gold',
      stringColor: 'Red',
      safetyColor: 'Yellow',
      holeGrommet: 'Yes',
      proofOptions: 'Digital Proof',
      quantity: 500,
      comments: 'Please ensure high-quality print.',
    },
    {
      key: '2',
      image: 'https://via.placeholder.com/50',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
      width: '8.5"',
      height: '14"',
      paperWeight: '200gsm',
      paperFinish: 'Matte',
      printOption: 'Black & White',
      holePunchPosition: 'Bottom Center',
      embossDeboss: 'Deboss',
      roundCorner: 'No',
      uvSpotGloss: 'No',
      metallicFoilColor: 'Silver',
      stringColor: 'Black',
      safetyColor: 'Blue',
      holeGrommet: 'No',
      proofOptions: 'Physical Proof',
      quantity: 1000,
      comments: 'Need to verify print colors.',
    },
  ];

  return (
    <div className="reqquote-container">
      <Title level={2} className="reqquote-title">Request a Quote</Title>

      <Row gutter={[16, 16]}>
        {/* Table for larger screens */}
        <Col span={24} className="reqquote-table-container">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: 'max-content' }}
            pagination={{ pageSize: 5 }}
            className="reqquote-table"
          />
        </Col>

        {/* Card layout for smaller screens */}
        <Col xs={24} sm={24} md={0}>
          {data.map((item) => (
            <Card
              key={item.key}
              title={item.name}
              extra={<img src={item.image} alt="Product" className="reqquote-image-small" />}
              className="reqquote-card"
            >
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Width x Height:</strong> {item.width} x {item.height}</p>
              <p><strong>Paper Weight:</strong> {item.paperWeight}</p>
              <p><strong>Print Option:</strong> {item.printOption}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Comments:</strong> {item.comments}</p>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Requestquote1;
