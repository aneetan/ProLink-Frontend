import React, { useState } from 'react';
import { Edit, Trash2, DollarSign, Calendar, MapPin, Tag, AlertCircle,Users,Clock,TrendingUp,FileText,Briefcase,ExternalLink,ChevronRight} from 'lucide-react';
import type { RequirementFormData } from '../../types/client/requirement.types';
import BidModal from '../modal/SendBidForm';
import { BidStatus, type BidFormData } from '../../types/company/bidRequest.types';
import { useMutation } from '@tanstack/react-query';
import { requestBidService } from '../../api/bid.api';
import { showSuccessToast } from '../../utils/toast.utils';
import { getUserIdFromToken } from '../../utils/jwt.utils';

export interface Quote {
  id: string;
  companyName: string;
  amount: number;
  deliveryTime: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  submittedDate: string;
  message?: string;
}

interface RequirementCardProps {
  requirement: RequirementFormData;
  quotesCount?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewQuotes?: () => void; // Callback for viewing quotes
  className?: string;
  isCompany?: boolean;
}

const RequirementCard: React.FC<RequirementCardProps> = ({
  requirement,
  quotesCount = 0,
  onEdit,
  onDelete,
  onViewQuotes,
  className = '',
  isCompany = false
}) => {
  const token = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBid, setCurrentBid] = useState(150);

  const mutation = useMutation({
    mutationFn: requestBidService.sendQuote,
    onSuccess: () => {
      showSuccessToast(`Quote submitted for ${requirement.title}`)
    },
    onError: (e) => {
      console.log(e)
    }
  })

   const handleSubmitBid = (data: BidFormData) => {
    const quoteData = {
      ...data,
      companyId: getUserIdFromToken(token),
      requirementId: requirement.id,
      status: "PENDING",
    }
    console.log('Bid submitted:', quoteData);
    mutation.mutate(quoteData);
    setCurrentBid(data.amount);
    setIsModalOpen(false);
  };
  // Urgency configuration
  const urgencyConfig = {
    LOW: { 
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700', 
      dot: 'bg-emerald-500',
      icon: <Clock size={14} />, 
      label: 'Low Priority' 
    },
    MEDIUM: { 
      color: 'bg-amber-50 border-amber-200 text-amber-700', 
      dot: 'bg-amber-500',
      icon: <AlertCircle size={14} />, 
      label: 'Medium Priority' 
    },
    HIGH: { 
      color: 'bg-rose-50 border-rose-200 text-rose-700', 
      dot: 'bg-rose-500',
      icon: <TrendingUp size={14} />, 
      label: 'High Priority' 
    }
  };

  // Work type configuration
  const workTypeConfig = {
    REMOTE: { 
      color: 'bg-sky-50 border-sky-200 text-sky-700', 
      icon: <MapPin size={14} />,
      label: 'Remote' 
    },
    ONSITE: { 
      color: 'bg-violet-50 border-violet-200 text-violet-700', 
      icon: <Briefcase size={14} />,
      label: 'On-site' 
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
        <>
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Card Header with Gradient */}
      <div className="relative p-6 border-b border-gray-100">        
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Title and Priority */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--primary-color)] rounded-lg">
                  <FileText className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{requirement.title}</h2>
              </div>
              <div className="flex items-center gap-2 w-1/3">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${urgencyConfig[requirement.urgency].color}`}>
                  <div className={`w-2 h-2 rounded-full ${urgencyConfig[requirement.urgency].dot}`}></div>
                  {urgencyConfig[requirement.urgency].label}
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6 line-clamp-2">{requirement.description}</p>
            
            {/* Skills Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="text-gray-500" size={18} />
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Required Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {requirement.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5  text-[var(--primary-color)]rounded-lg text-sm font-medium border border-teal-100 hover:border-blue-200 transition-colors pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {/* Work Type */}
              <div className={`p-3 rounded-xl border ${workTypeConfig[requirement.workType].color}`}>
                <div className="flex items-center gap-2 mb-1">
                  {workTypeConfig[requirement.workType].icon}
                  <span className="text-xs font-semibold uppercase tracking-wide">Work Type</span>
                </div>
                <div className="text-sm font-medium">{workTypeConfig[requirement.workType].label}</div>
              </div>
              
              {/* Category */}
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <Tag size={14} className="text-gray-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</span>
                </div>
                <div className="text-sm font-medium text-gray-800">{requirement.category}</div>
              </div>
              
              {/* Budget Range */}
              <div className="p-3 rounded-xl border border-teal-200 bg-teal-50">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={14} className="text-[var(--primary-color)]" />
                  <span className="text-xs font-semibold text-[var(--primary-color)] uppercase tracking-wide">Budget Range</span>
                </div>
                <div className="text-sm font-medium text-[var(--primary-color)]">
                  {formatCurrency(requirement.minimumBudget)} - {formatCurrency(requirement.maximumBudget)}
                </div>
              </div>
              
              {/* Timeline */}
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={14} className="text-gray-600" />
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Timeline</span>
                </div>
                <div className="text-sm font-medium text-gray-800">{requirement.timeline}</div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons - Desktop */}
      {!isCompany && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-blue-100"
                title="Edit requirement"
              >
                <Edit size={20} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-rose-100"
                title="Delete requirement"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
      )}
        </div>
        
        {/* Action Buttons - Mobile */}
      {!isCompany && (
        <div className="sm:hidden flex gap-2 mt-4">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 py-2.5 px-4 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors border border-blue-200 flex items-center justify-center gap-2"
            >
              <Edit size={18} />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex-1 py-2.5 px-4 bg-rose-50 text-rose-700 rounded-xl font-medium hover:bg-rose-100 transition-colors border border-rose-200 flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>
          )}
        </div>
      )}
      </div>

      {/* Footer with Quotes and Attachment */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left: Attachment */}
          <div className="flex items-center gap-3">
            {requirement.attachment && (
              <a
                href={requirement.attachment}
                className="group flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50  hover:text-teal-600 transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm font-medium">View Attachment</span>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
              </a>
            )}
          </div>
          
          {/* Right: Quotes Button */}
          {isCompany ? (
            <div className='flex justify-end items-center gap-4'>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group w-full sm:w-auto px-6 py-3 bg-[var(--primary-color)] text-white rounded-xl font-semibold hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <span> Send Quote</span>
                </div>
              </button>

              <button
                onClick={onViewQuotes}
                className="group w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
              > Decline
              </button>
            </div>
          ) : (
            <> 
            <button
            onClick={onViewQuotes}
            className="group w-full sm:w-auto px-6 py-3 bg-[var(--primary-color)] text-white rounded-xl font-semibold hover:bg-[var(--primary-dark)] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <div className="flex items-center gap-2">
              <span>View Quotes</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                {quotesCount}
              </span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          </>
          )}
        </div>
      </div>

      <BidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitBid}
        currentHighestBid={currentBid}
        requirement = {requirement}
      />
    </div>
      </>
    </>
  );
};

export default RequirementCard;