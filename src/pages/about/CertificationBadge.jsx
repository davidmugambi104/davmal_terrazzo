import React from 'react';

const CertificationBadge = ({ certification }) => {
  return (
    <div className="certification-badge">
      <span>{certification}</span>
    </div>
  );
};

export default CertificationBadge;