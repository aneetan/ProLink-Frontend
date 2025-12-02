import React, { useState } from 'react';
import type { CompanyInfo, ServicePricing } from '../../types/company/company.types';
import CompanyProfile from './profile/CompanyProfile';
import PastProjects from './profile/PastProjects';
import PaymentMethods from './profile/PaymentMethods';
import type { Project } from '../../types/company/project.types';
import type { PaymentMethod } from '../../types/company/payment.type';

// Sample data
const sampleCompanyInfo: CompanyInfo = {
  name: "Tech Solutions Inc.",
  registrationNo: "REG-2023-78945",
  description: "A leading technology company providing innovative software solutions and consulting services to businesses worldwide. We specialize in web development, mobile applications, and cloud solutions.",
  establishedYear: "2015",
  serviceCategory: "Technology & Software Development",
  websiteUrl: "https://www.techsolutions.com"
};

const sampleServicePricing: ServicePricing = {
  servicesOffered: [
    "Web Development",
    "Mobile App Development",
    "Cloud Consulting",
    "UI/UX Design",
    "Digital Transformation"
  ],
  priceRangeMin: 5000,
  priceRangeMax: 100000,
  avgDeliveryTime: "4-8 weeks"
};

const CompanyProfileContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'payments'>('profile');
  const companyId = Number(localStorage.getItem("token")) || null
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Built a scalable e-commerce platform with React and Node.js",
      completionDate: "2024-01-15",
      projectUrl: "https://example.com/project1"
    },
    {
      id: "2",
      title: "Mobile Banking App",
      description: "Developed a secure mobile banking application for financial institution",
      completionDate: "2023-11-20",
      projectUrl: "https://example.com/project2"
    }
  ]);
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "ESEWA",
      accountName: "Anita Neupane",
      accountNumber: "9845766733",
      isDefault: true
    }
  ]);

  // Handle adding a new project
  const handleProjectAdd = (projectData: Omit<Project, 'id'>) => {
    // In a real app, this would be an API call
    const newProject: Project = {
      ...projectData,
      companyId: companyId
    };
    
    // Add the new project to the state
    setProjects(prev => [newProject, ...prev]); // Add to beginning
    console.log(projectData)
    
    // You would typically make an API call here:
    // try {
    //   const response = await api.post('/projects', projectData);
    //   setProjects(prev => [response.data, ...prev]);
    // } catch (error) {
    //   console.error('Failed to add project:', error);
    //   // Show error message to user
    // }
  };

  // Handle payment methods update
  const handlePaymentMethodsUpdate = (updatedMethods: PaymentMethod[]) => {
    setPaymentMethods(updatedMethods);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'profile', label: 'Company Profile' },
                { id: 'projects', label: 'Past Projects' },
                { id: 'payments', label: 'Payment Methods' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <CompanyProfile 
                companyInfo={sampleCompanyInfo} 
                servicePricing={sampleServicePricing} 
              />
            )}
            
            {activeTab === 'projects' && (
              <PastProjects 
                projects={projects} 
                onProjectAdd={handleProjectAdd} 
              />
            )}
            
            {activeTab === 'payments' && (
              <PaymentMethods 
                paymentMethods={paymentMethods}
                onPaymentMethodsUpdate={handlePaymentMethodsUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileContainer;