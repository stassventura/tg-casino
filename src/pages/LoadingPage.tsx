import React from 'react';

const LoadingPage = () => {
  return (
    <div className='loadingPage'>
        <div className="main"></div>
      <div className="loader-container">
        {Array.from({ length: 20 }, (_, i) => (
          <span className={`loader-span-${i + 1}`} key={i}></span>
        ))}
        <div>
          <i className="fas fa-rocket"></i>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
