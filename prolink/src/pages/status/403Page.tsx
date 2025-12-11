import React from 'react';

interface ForbiddenPageProps {
  onLoginClick?: () => void;
  onBackClick?: () => void;
  customMessage?: string;
}

const UnauthorizedPage: React.FC<ForbiddenPageProps> = ({
  onLoginClick,
  onBackClick,
  customMessage
}) => {
  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      window.location.href = '/login';
    }
  };

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen flex bg-white items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-2xl p-8 text-center">
        
        <div className="mb-8 flex justify-center">
          <div className="w-80 h-80 flex items-center justify-center ">
            <img src="https://imgs.search.brave.com/x1uxS2PXer_uVMRbPaGRov9KdOX51JEvNjVLt062Tw8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvNDAzLWVycm9y/LWZvcmJpZGRlbi13/aXRoLXBvbGljZS1j/b25jZXB0LWlsbHVz/dHJhdGlvbl8xMTQz/NjAtMTg4NC5qcGc_/c2VtdD1haXNfc2Vf/ZW5yaWNoZWQmdz03/NDAmcT04MA" alt="403 Forbidden" className="w-full h-full" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-[var(--primary-color)] mb-2">403</h1>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h2>
        
        {/* Message */}
        <p className="text-gray-600 mb-8">
          {customMessage || "Sorry, you don't have permission to access this resource. Please login with appropriate credentials."}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleLogin}
            className="flex-1 sm:flex-none px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-lg hover:bg-[var(--primary-dark)] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2"
          >
            Login
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

export default UnauthorizedPage;