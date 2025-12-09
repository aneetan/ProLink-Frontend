import React from 'react';
import { DollarSign, Calendar, CheckCircle, XCircle, Clock, MessageSquare, Download, Award, MessageCircle } from 'lucide-react';
import type { QuoteResponse } from '../../types/company/bidRequest.types';

interface QuoteCardProps {
  quote: QuoteResponse;
  onAccept: (quoteId: number) => void;
  onReject: (quoteId: number) => void;
  expandedQuote: number | null;
  onToggleExpand: (quoteId: number) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ 
  quote, 
  onAccept, 
  onReject, 
  expandedQuote, 
  onToggleExpand 
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Quote status configuration
  const statusConfig = {
    PENDING: {
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: <Clock size={14} />,
      label: 'Pending Review'
    },
    ACCEPTED: {
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: <CheckCircle size={14} />,
      label: 'Accepted'
    },
    DECLINED: {
      color: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: <XCircle size={14} />,
      label: 'Declined'
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl ${
        quote.status === 'ACCEPTED'
          ? 'border-emerald-300'
          : quote.status === 'DECLINED'
          ? 'border-rose-300'
          : 'border-gray-200'
      }`}
    >
      {/* Quote Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 w-18 h-18 rounded-full">
               {quote.company?.logo ? (
               <img 
                  src={quote.company.logo} 
                  alt={`${quote.companyName || quote.company?.name} logo`}
                  className="w-full h-full object-cover rounded-full"
               />
            ) : (
               <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">
                  {(quote.companyName || quote.company?.name || 'C').charAt(0).toUpperCase()}
                  </span>
               </div>
            )}
            </div>
            <div>
              <a className='cursor-pointer hover:underline transition-all duration-400 '>
                <span className="text-lg font-bold text-gray-900 hover:text-[var(--primary-color)]">{quote.companyName}</span>
              </a>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${statusConfig[quote.status].color}`}>
                  {statusConfig[quote.status].icon}
                  {statusConfig[quote.status].label}
                </span>
                <span className="text-xs text-gray-500">
                  Submitted: {formatDate(quote.submittedDate)}
                </span>
              </div>
            </div>
          </div>
          
          {quote.status === 'ACCEPTED' && (
            <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
              <Award size={14} className="text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Selected</span>
            </div>
          )}
        </div>

        {/* Quote Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-teal-600" />
              <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">Quote Amount</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(quote.amount)}</div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-amber-600" />
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Delivery Time</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{quote.deliveryTime}</div>
          </div>
        </div>
      </div>

      {/* Quote Message */}
      {quote.message && (
      <div className="p-6 bg-gray-50 border-b border-gray-200">
         <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={16} className="text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Company Message</span>
         </div>
         
         {/* Determine if we need truncation */}
         {quote.message.length <= 120 || expandedQuote === quote.id ? (
            // Show full message if short or expanded
            <p className="text-gray-600">{quote.message}</p>
         ) : (
            // Show truncated message
            <>
            <p className="text-gray-600">
               {`${quote.message.substring(0, 120)}...`}
            </p>
            <button
               onClick={() => onToggleExpand(quote.id)}
               className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
               Read More
            </button>
            </>
         )}
         
         {/* Show "Show Less" only when expanded */}
         {expandedQuote === quote.id && quote.message.length > 120 && (
            <button
            onClick={() => onToggleExpand(quote.id)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
            Show Less
            </button>
         )}
      </div>
      )}

      {/* Quote Actions */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status-based actions */}
          {quote.status === 'PENDING' && (
            <>
              <button
                onClick={() => onAccept(quote.id)}
                className="flex-1 py-3 bg-[var(--primary-light)] text-white rounded-xl font-semibold hover:bg-[var(--primary-color)] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                Accept Quote
              </button>
              <button
                onClick={() => onReject(quote.id)}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <XCircle size={18} />
                Reject
              </button>
            </>
          )}
          
          {quote.status === 'ACCEPTED' && (
            <>
              <button
                onClick={() => onAccept(quote.id)}
                className="flex-1 py-3 bg-[var(--primary-light)] text-white rounded-xl font-semibold hover:bg-[var(--primary-color)] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Chat
              </button>
            </>
          )}

           {quote.status === 'INITIATED' && (
            <>
              <button
                className="flex-1 py-3 border-teal-600 border-1 text-[var(--primary-color)] rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => alert('Downloading contract...')}
              >
                <Download size={18} />
                View Contract
              </button>
            </>
          )}
          
          {quote.status === 'DECLINED' && (
            <button
              onClick={() => onAccept(quote.id)}
              className="flex-1 py-3 bg-[var(--primary-light)] text-white rounded-xl font-semibold hover:bg-[var(--primary-color)] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              Reconsider Quote
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;