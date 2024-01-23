import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader">Fetching countries...</div>
    </div>
  );
};

export default Loader;