import React, { useState, useEffect } from "react";
import type { CompanyInfo, ServicePricing } from "../../types/company/company.types";
import CompanyProfile from "./profile/CompanyProfile";
import PastProjects from "./profile/PastProjects";
import PaymentMethods from "./profile/PaymentMethods";
import { usePaymentMethodStore } from "../../store/usePaymentMethodStore";

type TabId = "profile" | "projects" | "payments";

// Sample data
const sampleCompanyInfo: CompanyInfo = {
  name: "Tech Solutions Inc.",
  registrationNo: "REG-2023-78945",
  description:
    "A leading technology company providing innovative software solutions and consulting services worldwide.",
  establishedYear: "2015",
  serviceCategory: "Technology & Software Development",
  websiteUrl: "https://www.techsolutions.com",
};

const sampleServicePricing: ServicePricing = {
  servicesOffered: [
    "Web Development",
    "Mobile App Development",
    "Cloud Consulting",
    "UI/UX Design",
    "Digital Transformation",
  ],
  priceRangeMin: 5000,
  priceRangeMax: 100000,
  avgDeliveryTime: "4–8 weeks",
};

const CompanyProfileContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const companyId = Number(localStorage.getItem("token")) || null;

  const { setPaymentMethods } = usePaymentMethodStore();

  /** 
   *  ONLY payment method fetching remains here.
   *  Projects are fetched internally inside <PastProjects />
   */
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(`/api/payment-methods?companyId=${companyId}`);
        if (response.ok) {
          const paymentMethodsData = await response.json();
          setPaymentMethods(paymentMethodsData);
        }
      } catch (error) {
        console.error("Failed to fetch payment methods:", error);
      }
    };

    if (companyId) {
      fetchPaymentMethods();
    }
  }, [companyId, setPaymentMethods]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: "profile", label: "Company Profile" },
                { id: "projects", label: "Past Projects" },
                { id: "payments", label: "Payment Methods" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-[var(--primary-color)] text-[var(--primary-color)]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <CompanyProfile
                companyInfo={sampleCompanyInfo}
                servicePricing={sampleServicePricing}
              />
            )}

            {activeTab === "projects" && <PastProjects />}

            {activeTab === "payments" && <PaymentMethods />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileContainer;
