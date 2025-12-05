import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Calendar, CheckCircle, XCircle, Clock, MessageSquare, Download, Filter, Search, ChevronDown, Award, MessageCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import type { Quote } from '../../../components/cards/RequirementCard';

// Mock data for quotes
const mockQuotes: Quote[] = [
  {
    id: '1',
    companyName: 'TechSolutions Inc.',
    amount: 22000,
    deliveryTime: '3 months',
    status: 'PENDING',
    submittedDate: '2024-01-15',
    message: 'We have extensive experience with similar projects and can deliver high-quality results within your timeline. Our team includes certified React and Node.js developers.'
  },
  {
    id: '2',
    companyName: 'Digital Innovations LLC',
    amount: 18000,
    deliveryTime: '4 months',
    status: 'ACCEPTED',
    submittedDate: '2024-01-10',
    message: 'We offer competitive pricing without compromising on quality. Our approach focuses on scalable architecture and maintainable code.'
  },
  {
    id: '3',
    companyName: 'WebMasters Pro',
    amount: 28000,
    deliveryTime: '2.5 months',
    status: 'REJECTED',
    submittedDate: '2024-01-12',
    message: 'Premium development services with 24/7 support, daily updates, and dedicated project manager.'
  },
  {
    id: '4',
    companyName: 'CodeCrafters Studio',
    amount: 24000,
    deliveryTime: '3.5 months',
    status: 'PENDING',
    submittedDate: '2024-01-18'
  }
];

const QuotesPage: React.FC = () => {
  const { requirementId } = useParams();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'>('ALL');
  const [search, setSearch] = useState('');
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);

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

  // Filter quotes
  const filteredQuotes = quotes.filter(quote => {
    const matchesFilter = filter === 'ALL' || quote.status === filter;
    const matchesSearch = quote.companyName.toLowerCase().includes(search.toLowerCase()) ||
                         quote.message?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle quote actions
  const handleAcceptQuote = (quoteId: string) => {
    if (window.confirm('Are you sure you want to accept this quote?')) {
      setQuotes(prevQuotes => 
        prevQuotes.map(quote => {
          if (quote.id === quoteId) {
            return { ...quote, status: 'ACCEPTED' };
          }
          // Reject other pending quotes when accepting one
          if (quote.status === 'PENDING' && quote.id !== quoteId) {
            return { ...quote, status: 'REJECTED' };
          }
          return quote;
        })
      );
    }
  };

  const handleRejectQuote = (quoteId: string) => {
    if (window.confirm('Are you sure you want to reject this quote?')) {
      setQuotes(prevQuotes =>
        prevQuotes.map(quote =>
          quote.id === quoteId ? { ...quote, status: 'REJECTED' } : quote
        )
      );
    }
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
    REJECTED: {
      color: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: <XCircle size={14} />,
      label: 'Rejected'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quotes & Proposals</h1>
                <p className="text-gray-600">
                  Review and manage quotes for <span className="font-semibold">Full-Stack Web Application Development</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-[var(--primary-light)] rounded-full text-white">
                {quotes.length} Total Quotes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search quotes by company or message..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            {/* Filter */}
            <div className="flex gap-2">
              {(['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
                    filter === status
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
              <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Filter size={16} />
                More
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className={`bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                quote.status === 'ACCEPTED'
                  ? 'border-emerald-300'
                  : quote.status === 'REJECTED'
                  ? 'border-rose-300'
                  : 'border-gray-200'
              }`}
            >
              {/* Quote Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 w-18 h-18 rounded-full">
                      <img src='https://imgs.search.brave.com/UdGbnPJENo2m9qwWSvhZxU2od0jrhKaPGXcL1rHNXVI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYnJ1c2gtbGV0/dGVycy1sb2dvXzY4/NjU5Ny00NTM4Ni5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA' alt='company-logo'/>
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
                  <p className="text-gray-600 line-clamp-3">
                    {expandedQuote === quote.id ? quote.message : `${quote.message.substring(0, 120)}...`}
                  </p>
                  {quote.message.length && (
                    <button
                      onClick={() => setExpandedQuote(expandedQuote === quote.id ? null : quote.id)}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {expandedQuote === quote.id ? 'Show Less' : 'Read More'}
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
                        onClick={() => handleAcceptQuote(quote.id)}
                        className="flex-1 py-3 bg-[var(--primary-light)] text-white rounded-xl font-semibold hover:bg-[var(--primary-color)] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={18} />
                        Accept Quote
                      </button>
                      <button
                        onClick={() => handleRejectQuote(quote.id)}
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
                        onClick={() => handleAcceptQuote(quote.id)}
                        className="flex-1 py-3 bg-[var(--primary-light)] text-white rounded-xl font-semibold hover:bg-[var(--primary-color)] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} />
                        Chat
                      </button>
                    <button
                      className="flex-1 py-3 border-teal-600 border-1 text-[var(--primary-color)] rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => alert('Downloading contract...')}
                    >
                      <Download size={18} />
                      Download Contract
                    </button>
                    </>
                  )}
                  
                  {quote.status === 'REJECTED' && (
                    <button
                      onClick={() => handleAcceptQuote(quote.id)}
                      className="flex-1 py-3 bg-[var(--primary-light)] text-white rounded-xl font-semibold hover:bg-[var(--primary-color)] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      Reconsider Quote
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuotes.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <DollarSign size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No quotes found</h3>
            <p className="text-gray-600 mb-6">
              {search
                ? `No quotes match "${search}"`
                : filter !== 'ALL'
                ? `No ${filter.toLowerCase()} quotes`
                : 'No quotes have been submitted yet'}
            </p>
            {(search || filter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilter('ALL');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;