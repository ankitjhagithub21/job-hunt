import React from 'react';

const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
     
      <h2 className="text-2xl font-semibold">Loading, Please Wait...</h2>
      <p className="text-lg mt-2">We are fetching the latest job listings for you</p>
    </div>
  );
};

export default LoadingPage;
