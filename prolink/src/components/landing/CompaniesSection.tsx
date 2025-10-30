import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CompaniesSection = () => {
  const [activeTab, setActiveTab] = useState('it');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  // Sample data for IT companies
  const itCompanies = [
    {
      id: 1,
      name: 'TechInnovate Solutions',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      description: 'Enterprise software development and digital transformation',
      projects: 250,
      rating: 4.8,
      specialties: ['Web Development', 'Mobile Apps', 'Cloud Solutions']
    },
    {
      id: 2,
      name: 'DataSphere Systems',
      logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=center',
      description: 'Big data analytics and AI-powered business intelligence',
      projects: 180,
      rating: 4.7,
      specialties: ['Data Analytics', 'Machine Learning', 'BI Tools']
    },
    {
      id: 3,
      name: 'CloudNova Technologies',
      logo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop&crop=center',
      description: 'Cloud infrastructure and DevOps solutions',
      projects: 320,
      rating: 4.9,
      specialties: ['AWS', 'Azure', 'DevOps', 'Microservices']
    },
    {
      id: 4,
      name: 'CyberSecure Pro',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
      description: 'Cybersecurity and network protection services',
      projects: 150,
      rating: 4.8,
      specialties: ['Network Security', 'Penetration Testing', 'Compliance']
    },
    {
      id: 5,
      name: 'BlockChain Ventures',
      logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop&crop=center',
      description: 'Blockchain development and cryptocurrency solutions',
      projects: 95,
      rating: 4.6,
      specialties: ['Smart Contracts', 'DeFi', 'NFT Platforms']
    },
    {
      id: 6,
      name: 'IoT Dynamics',
      logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
      description: 'Internet of Things and smart device solutions',
      projects: 120,
      rating: 4.5,
      specialties: ['IoT Devices', 'Sensor Networks', 'Automation']
    }
  ];

  // Sample data for MEP companies
  const mepCompanies = [
    {
      id: 1,
      name: 'MEP Engineering Pros',
      logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop&crop=center',
      description: 'Comprehensive MEP design and consulting services',
      projects: 420,
      rating: 4.9,
      specialties: ['HVAC Systems', 'Electrical Design', 'Plumbing']
    },
    {
      id: 2,
      name: 'GreenBuild Mechanical',
      logo: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=100&h=100&fit=crop&crop=center',
      description: 'Sustainable building systems and energy efficiency',
      projects: 280,
      rating: 4.7,
      specialties: ['Energy Efficiency', 'HVAC', 'Building Automation']
    },
    {
      id: 3,
      name: 'PowerGrid Solutions',
      logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop&crop=center',
      description: 'Electrical systems and power distribution experts',
      projects: 350,
      rating: 4.8,
      specialties: ['Electrical Systems', 'Power Distribution', 'Lighting']
    },
    {
      id: 4,
      name: 'AquaFlow Plumbing',
      logo: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=100&h=100&fit=crop&crop=center',
      description: 'Advanced plumbing and water management systems',
      projects: 190,
      rating: 4.6,
      specialties: ['Plumbing Systems', 'Water Treatment', 'Drainage']
    },
    {
      id: 5,
      name: 'ClimateControl Experts',
      logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&crop=center',
      description: 'HVAC and climate control system specialists',
      projects: 310,
      rating: 4.8,
      specialties: ['HVAC Design', 'Ventilation', 'AC Systems']
    },
    {
      id: 6,
      name: 'Integrated Building Systems',
      logo: 'https://images.unsplash.com/photo-1503387769f5e77ddb10c7c0?w=100&h=100&fit=crop&crop=center',
      description: 'Complete MEP integration and building management',
      projects: 270,
      rating: 4.7,
      specialties: ['System Integration', 'BIM', 'Facility Management']
    }
  ];

  const companies = activeTab === 'it' ? itCompanies : mepCompanies;

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Trusted Companies
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-4">
            Discover top-rated IT and MEP companies ready to bring your projects to life with expertise and innovation.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div 
          className="flex justify-center mb-6 sm:mb-8 lg:mb-12"
        >
          <div className="bg-white rounded-lg shadow-sm p-1 border border-gray-200 max-w-md w-full">
            <div className="flex">
              <button
                onClick={() => setActiveTab('it')}
                className={`flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  activeTab === 'it'
                    ? 'bg-[var(--primary-color)] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="whitespace-nowrap">IT Companies</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('mep')}
                className={`flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  activeTab === 'mep'
                    ? 'bg-[var(--primary-color)] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="whitespace-nowrap">MEP Companies</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Companies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8"
          >
            {companies.map((company) => (
              <motion.div
                key={company.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Company Header */}
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1 truncate">
                        {company.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 ${
                                i < Math.floor(company.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                          {company.rating} • {company.projects}+ projects
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {company.description}
                  </p>

                  {/* Specialties */}
                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {company.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-[var(--primary-color)] text-xs font-medium rounded-full whitespace-nowrap"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium py-2 px-2 sm:px-3 md:px-4 rounded-lg transition duration-300 text-xs sm:text-sm whitespace-nowrap">
                      View Profile
                    </button>
                    <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-2 sm:px-3 md:px-4 rounded-lg transition duration-300 text-xs sm:text-sm whitespace-nowrap">
                      Contact
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Button */}
        <motion.div 
          className="text-center mt-6 sm:mt-8 lg:mt-12"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-50 text-[var(--primary-color)] font-semibold py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg border border-[var(--primary-color)] transition duration-300 text-xs sm:text-sm md:text-base"
          >
            View All {activeTab === 'it' ? 'IT' : 'MEP'} Companies
            <svg className="w-3 h-3 sm:w-4 sm:h-4 inline-block ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CompaniesSection;