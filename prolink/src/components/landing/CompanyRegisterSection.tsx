const CompanyRegisterSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[var(--primary-bg)]/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          
          {/* Image Section - Left Side */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg order-2 lg:order-1">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Business professionals collaborating"
                  className="w-full h-auto rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
                />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 max-w-[180px] sm:max-w-xs">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  <div className="bg-green-100 p-1.5 sm:p-2 lg:p-3 rounded-md sm:rounded-lg">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">100+</p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-tight">Companies Registered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section - Right Side */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg order-1 lg:order-2">
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight">
                Register Your Company
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                Join thousands of businesses that trust our platform to grow their 
                operations.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-[var(--primary-color)] rounded-full flex items-center justify-center mt-0.5 sm:mt-1">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-base mb-1">Easy Setup Process</h3>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                    Get your company registered in minutes with our streamlined process.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-[var(--primary-color)] rounded-full flex items-center justify-center mt-0.5 sm:mt-1">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-base mb-1">24/7 Support</h3>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                    Round-the-clock customer support to help you with any issues.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-[var(--primary-color)] rounded-full flex items-center justify-center mt-0.5 sm:mt-1">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-base mb-1">Verified Clients</h3>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                    Connect with authentic clients and grow your business network securely.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
              <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg transition duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                Register As Company
              </button>
              <button className="border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg transition duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyRegisterSection;