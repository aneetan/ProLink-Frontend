
const RegisterRightPanel = () => {
  return (
    <>
    <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  Join Our Community
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  Connect with trusted service providers or showcase your business to potential clients.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">For Clients</h3>
                    <p className="text-blue-200">Find reliable service providers with verified reviews and ratings.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">For Companies</h3>
                    <p className="text-blue-200">Showcase your services and connect with potential clients in your area.</p>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default RegisterRightPanel
