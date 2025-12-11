import React from 'react';

const PageNotFound: React.FC = () => {
  const handleGotoHome = () => {
      window.location.href = '/';
  };

  const handleBack = () => {
      window.history.back();
  };

  return (
    <div className="min-h-screen flex bg-white items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-2xl p-8 text-center">
        
        <div className="flex justify-center">
          <div className="flex items-center justify-center ">
            <img src="https://imgs.search.brave.com/As3GFAwbujUT7NWJ4TVlfnYgyegGQzrKcBrJOLsys6U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvYm95/LXdvcnJpZWQtYWJv/dXQtNDA0LWVycm9y/LTNkLWljb24tcG5n/LWRvd25sb2FkLTEy/MDQ1MTQ2LnBuZw" alt="403 Forbidden" className="w-full h-full" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-semibold text-[var(--primary-color)] mb-4">
          Oops! Page Not Found
        </h2>
        
        {/* Message */}
        <p className="text-gray-600 mb-8">
          "Sorry, cannot find the page you are looking for."
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGotoHome}
            className="flex-1 sm:flex-none px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-lg hover:bg-[var(--primary-dark)] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2"
          >
            Go to Home
          </button>
          
          <button
            onClick={handleBack}
            className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;