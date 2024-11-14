import React from 'react';
import { Table, Image } from 'antd';
import './quote.css';

function Quote() {
  // Data for the table
  const data = [
    {
      key: '1',
      product: 'T-shirt',
      artworkImage: 'https://example.com/artwork1.jpg',
      width: '20',
      height: '30',
      quantity: 100,
      contact: '123-456-7890',
      name: 'John Doe',
      email: 'johndoe@example.com',
      comments: 'Urgent order',
    },
    {
      key: '2',
      product: 'Mug',
      artworkImage: 'https://example.com/artwork2.jpg',
      width: '15',
      height: '25',
      quantity: 50,
      contact: '987-654-3210',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      comments: 'No rush',
    },
    // Add more data rows as needed
  ];

  // Columns configuration for the table
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Artwork Image',
      dataIndex: 'artworkImage',
      key: 'artworkImage',
      render: (text) => <Image width={50} src={text}   />,
    },
    {
      title: 'Width',
      dataIndex: 'width',
      key: 'width',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
  ];

  return (
    <div className="quote-container">
      <h2 className="quote-title">Quote Table</h2>
      <div className="quote-table-wrapper">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false} // Optional: Add pagination if needed
          className="custom-table" // Add a custom class to apply styles
        />
      </div>
    </div>
  );
}

export default Quote;
