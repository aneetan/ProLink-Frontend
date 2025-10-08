const CompanyRegisterSection = () => {
  return (
    <section className="py-8 md:px-28 px-8 md:py-16 bg-[var(--primary-bg)]/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Image Section - Left Side */}
          <div className="flex-1 w-full max-w-lg order-2 lg:order-1">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 sm:p-6 lg:p-8">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Business professionals collaborating"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-xs">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">100+</p>
                    <p className="text-xs sm:text-sm text-gray-600">Companies Registered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section - Right Side */}
          <div className="flex-1 w-full max-w-lg order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Register Your Company
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Join thousands of businesses that trust our platform to grow their 
              operations.
            </p>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[var(--primary-color)] rounded-full flex items-center justify-center mt-1">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Easy Setup Process</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Get your company registered in minutes with our streamlined process.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[var(--primary-color)] rounded-full flex items-center justify-center mt-1">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">24/7 Support</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Round-the-clock customer support to help you with any issues.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition duration-300 transform text-sm sm:text-base">
                Register As Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyRegisterSection;