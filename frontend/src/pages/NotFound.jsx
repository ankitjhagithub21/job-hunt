import React from 'react';
import { Link } from 'react-router-dom';  // Assuming you're using React Router for navigation

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-gray-800">
      <div className="text-center">
      
        <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-lg mb-6">Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="px-6 py-2 bg-purple-600 hover:bg-purple-600 text-white font-semibold rounded-lg transition duration-300"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
