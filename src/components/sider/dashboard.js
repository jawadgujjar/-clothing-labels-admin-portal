import React from 'react';
import { Card } from 'antd'; // Using Ant Design Card for layout
import { Fade } from 'react-awesome-reveal'; // Importing Fade from react-awesome-reveal
import './dashboard.css'; // Import your CSS file

const Dashboard = () => {
  const data = [
    { title: 'Total Users', number: 150, className: 'dashboard-card-user' },
    { title: 'Total Orders', number: 320, className: 'dashboard-card-orders' },
    { title: 'Products', number: 75, className: 'dashboard-card-products' },
    { title: 'Total Balance', number: '$12,500', className: 'dashboard-card-balance' },
  ];

  return (
    <div className="dashboard-container">
      {data.map((item, index) => (
        <Fade key={index} direction="up" triggerOnce>
          <Card className={`dashboard-card ${item.className}`}>
            <h3>{item.title}</h3>
            <p>{item.number}</p>
          </Card>
        </Fade>
      ))}
    </div>
  );
};

export default Dashboard;
