import { useState } from "react";
import type { CompanySimilarity } from "../../pages/client/SimilarCompanies";
import { FcBiotech, FcCurrencyExchange } from "react-icons/fc";
import { useNavigate } from "react-router";
import { notificationService } from "../../api/notifications/notification.api";
import { useMutation } from "@tanstack/react-query";
import { getUserFromToken } from "../../utils/jwt.utils";
import { showSuccessToast } from "../../utils/toast.utils";
import { requestBidService } from "../../api/bid.api";

interface CompanyCardProps {
  company: CompanySimilarity;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { metadata, score } = company;
  const navigate = useNavigate();
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);
  const [isRequestBid, setIsRequestBid] = useState(false);
  const matchPercentage = (score * 100).toFixed(0);

  const token = localStorage.getItem("token") || null;
  const user = getUserFromToken(token);

  const sendQuoteRequestMutation = useMutation({
    mutationFn: requestBidService.requestBidWithNotifications,
    onSuccess: () => {
      console.log("Quote request notification sent!");
    },
    onError: (error) => {
      console.error("Failed to send quote request:", error);
    }
  });

  const handleRequestBid = (companyId: number) => {
    const formData = {
      userId: user.id,
      userName: user.name,
      requirementId: 1,
      companyId: companyId
    }
    sendQuoteRequestMutation.mutate(formData);
    setIsRequestBid(true);
    showSuccessToast("Request sent for quotation");
  }

  const handleViewProfile = (companyId: number) => {
    navigate('/client/requirement/profile')
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col">
      {/* Header with company name and rating */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-start mb-3">
          <div className="pr-4">
            <div className="flex justify-baseline items-center">
              <div className="mr-2">
                <img className="rounded-full w-14 h-14" src="https://imgs.search.brave.com/-zv4LBVBe6e6r9YnEHLp9F9yq9Id3ldYEyGEMkQkv_0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/LmRlc2lnbmhpbGwu/Y29tL3VwbG9hZHMv/bG9nby1tYWtlci8y/ODY0MzE5LzUwNjk3/NzEuc3Zn" alt=" logo"/>
              </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--primary-color)] ">
                {metadata.name} 
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">4.8</span>
                <span className="text-gray-400">·</span>
              </div>
            </div>
          </div>

          </div>
          
          {/* Match Score */}
          <div className="text-right">
            <div className={` flex items-center gap-1 text-sm font-bold px-4 py-2 rounded-full ${
              parseFloat(matchPercentage) >= 80 ? 'bg-green-300 text-green-700' :
              parseFloat(matchPercentage) >= 60 ? 'bg-blue-300 text-blue-700' :
              parseFloat(matchPercentage) >= 40 ? 'bg-amber-300 text-amber-700' : 'bg-gray-300 text-gray-700'
            }`}>
              {matchPercentage}% 
              <div className="text-xs text-gray-500 font-medium">Match</div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 line-clamp-2 ">
          {expandedDesc === metadata.id 
            ? metadata.description 
            : `${metadata.description.substring(0, 120)}${metadata.description.length > 120 ? '...' : ''}`
          }
        </p>
        {metadata.description && metadata.description.length > 120 && (
          <button
            onClick={() => setExpandedDesc(expandedDesc === metadata.id ? null : metadata.id)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {expandedDesc === metadata.id ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Specialties/Content Section */}
      <div className="px-5 pb-4">
        {metadata.services.length > 0 && (
          <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide"> Specialties </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {metadata.services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5  text-[var(--primary-color)] rounded-lg text-sm font-medium border border-teal-100 hover:border-blue-200 transition-colors pointer"
                  >
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </span>
                ))}
              </div>
            </div>
        )}

        {/* Stats - Compact Grid */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <div>
            <div className="flex gap-2 items-center text-sm text-gray-500 font-medium mb-1"> <FcCurrencyExchange/> Price Range</div>
            <div className="text-sm font-semibold text-gray-900">
              Rs. {(metadata.priceRangeMin / 1000).toFixed(0)}k - Rs. {(metadata.priceRangeMax / 1000).toFixed(0)}k
            </div>
          </div>
          <div>
            <div className="flex gap-2 items-center text-sm text-gray-500 font-medium mb-1"> <FcBiotech/> Delivery</div>
            <div className="text-sm font-semibold text-gray-900">{metadata.avgDeliveryTime}</div>
          </div>
        </div>
      </div>

      {/* Footer - Buttons */}
      <div className="px-5 pb-5 pt-4 border-t border-gray-100 bg-gray-50">
        <div className="flex gap-2">
          <button
            onClick={() => handleViewProfile(metadata.id)}
            className="flex-1 bg-[var(--primary-light)] hover:bg-[var(--primary-color)] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
          >
            View Profile
          </button>
           
           {isRequestBid ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span className="font-medium">Bid Requested</span>
            </div>
          ) : (
            <button 
              onClick={() => handleRequestBid(metadata.id)}
              className="flex-1 border-1 border-[var(--primary-color)] hover:bg-gray-100 text-[var(--primary-color)] font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              Request Bid
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;