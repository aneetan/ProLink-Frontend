import { FaCoins } from "react-icons/fa";
import type { CompanySimilarity } from "../../pages/client/SimilarCompanies";
import { FcBiotech, FcCurrencyExchange } from "react-icons/fc";

interface CompanyCardProps {
  company: CompanySimilarity;
  onContact?: (companyId: string) => void;
  onViewProfile?: (companyId: string) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onContact, onViewProfile }) => {
  const { metadata, score } = company;
  const matchPercentage = (score * 100).toFixed(0);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col">
      {/* Header with company name and rating */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-start mb-3">
          <div className="pr-4">
            <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2 group-hover:text-gray-800">
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
              <span className="text-sm text-gray-600">{Math.floor(Math.random() * 200) + 100}+ projects</span>
            </div>
          </div>
          
          {/* Match Score */}
          <div className="text-right">
            <div className={`text-2xl font-bold ${
              parseFloat(matchPercentage) >= 80 ? 'text-green-600' :
              parseFloat(matchPercentage) >= 60 ? 'text-blue-600' :
              parseFloat(matchPercentage) >= 40 ? 'text-amber-600' : 'text-gray-600'
            }`}>
              {matchPercentage}%
            </div>
            <div className="text-xs text-gray-500 font-medium">Match</div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {metadata.description}
        </p>
      </div>

      {/* Specialties/Content Section */}
      <div className="px-5 pb-4">
        {metadata.services.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialties:</h4>
            <div className="flex flex-wrap gap-2">
              {metadata.services.slice(0, 3).map((service, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  {service}
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
              ${(metadata.priceRangeMin / 1000).toFixed(0)}k - ${(metadata.priceRangeMax / 1000).toFixed(0)}k
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
            onClick={() => onContact?.(metadata.id)}
            className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
          >
            View Profile
          </button>
          <button
            onClick={() => onViewProfile?.(metadata.id)}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-medium py-2.5 px-4 rounded-lg border border-gray-300
            pointer hover:border-gray-400 transition-colors duration-200 text-sm"
          >
            Request Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;