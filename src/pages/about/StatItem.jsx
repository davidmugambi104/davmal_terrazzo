import React from 'react';

const StatItem = ({ label, value, icon }) => {
  return (
    <div className="stat-item">
      <div className="icon">{icon}</div>
      <div className="details">
        <h3>{label}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default StatItem;