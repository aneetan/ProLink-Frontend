import type { CompanySimilarity } from "../../pages/client/SimilarCompanies";

interface CompanyCardProps {
  company: CompanySimilarity;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { metadata, score } = company;
  const matchPercentage = (score * 100).toFixed(1);

  // Determine match badge color based on percentage
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const matchColor = getMatchColor(parseFloat(matchPercentage));

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-400 p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white pr-4 group-hover:text-teal-50 transition-colors duration-200">
            {metadata.name}
          </h3>
          <div className={`${matchColor} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex-shrink-0`}>
            {matchPercentage}% Match
          </div>
        </div>
        <p className="text-teal-100 text-sm line-clamp-2">
          {metadata.description}
        </p>
      </div>

      {/* Company Details */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Service Category */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
              <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Service Category</span>
              <p className="text-gray-900 font-medium">{metadata.serviceCategory}</p>
            </div>
          </div>

          {/* Services */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
              <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Services</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {metadata.services.slice(0, 3).map((service, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
                  >
                    {service}
                  </span>
                ))}
                {metadata.services.length > 3 && (
                  <span className="inline-block bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">
                    +{metadata.services.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
              <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Price Range</span>
              <p className="text-gray-900 font-medium">
                ${metadata.priceRangeMin.toLocaleString()} - ${metadata.priceRangeMax.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Delivery Time */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
              <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Avg. Delivery Time</span>
              <p className="text-gray-900 font-medium">{metadata.avgDeliveryTime}</p>
            </div>
          </div>

          {/* Established Year */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
              <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Established</span>
              <p className="text-gray-900 font-medium">{metadata.establishedYear}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 pt-4 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-3">
          <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 text-sm">
            Contact Company
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 transition duration-200 transform hover:scale-105 text-sm">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;