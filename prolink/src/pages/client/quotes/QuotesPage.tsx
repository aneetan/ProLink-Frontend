import React, { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Filter, Search, ChevronDown } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import QuoteCard from '../../../components/cards/QuoteCard';
import { api } from '../../../lib/api';
import type { Quote } from '../../../types/company/bidRequest.types';

// Define the API response type
interface ApiQuote {
  id: number;
  amount: number;
  deliveryTime: string;
  message: string;
  companyId: number;
  status: string;
  company: {
    id: number;
    name: string;
    docs: Array<{
      logo: string;
    }>;
  };
}

// API function to fetch quotes
const fetchQuotesForRequirement = async (requirementId: string): Promise<Quote[]> => {
  const response = await api.get(`/client/${requirementId}/quote`);
  const apiQuotes: ApiQuote[] = response.data;
  
  // Transform API response to match Quote type
  return apiQuotes.map(quote => ({
    id: quote.id,
    amount: quote.amount,
    deliveryTime: quote.deliveryTime,
    message: quote.message,
    companyName: quote.company.name,
    companyId: quote.companyId,
    company: quote.company,
    status: quote.status, // Default status from API
    submittedDate: new Date().toISOString().split('T')[0], // Use current date or get from API if available
  }));
};

const QuotesPage: React.FC = () => {
  const { requirementId } = useParams<{ requirementId: string }>();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'>('ALL');
  const [search, setSearch] = useState('');
  const [expandedQuote, setExpandedQuote] = useState<number | null>(null);
  const [localQuotes, setLocalQuotes] = useState<Quote[]>([]);

  // React Query to fetch quotes
  const {
    data: apiQuotes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['quotes', requirementId],
    queryFn: () => fetchQuotesForRequirement(requirementId!),
    enabled: !!requirementId,
  });

  // Initialize local quotes with API data
  useEffect(() => {
    if (apiQuotes.length > 0) {
      setLocalQuotes(apiQuotes);
    }
  }, [apiQuotes]);

  // Filter quotes
  const filteredQuotes = localQuotes.filter(quote => {
    const matchesFilter = filter === 'ALL' || quote.status === filter;
    const matchesSearch = 
      (quote.companyName?.toLowerCase().includes(search.toLowerCase()) || 
       quote.message?.toLowerCase().includes(search.toLowerCase()) ||
       quote.company?.name.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Handle quote actions
  const handleAcceptQuote = async (quoteId: number) => {
    if (window.confirm('Are you sure you want to accept this quote?')) {
      // You can add API call here to update quote status on the server
      // await api.put(`/client/quote/${quoteId}/accept`);
      
      setLocalQuotes(prevQuotes => 
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

  const handleRejectQuote = async (quoteId: number) => {
    if (window.confirm('Are you sure you want to reject this quote?')) {
      // You can add API call here to update quote status on the server
      // await api.put(`/client/quote/${quoteId}/reject`);
      
      setLocalQuotes(prevQuotes =>
        prevQuotes.map(quote =>
          quote.id === quoteId ? { ...quote, status: 'REJECTED' } : quote
        )
      );
    }
  };

  const handleToggleExpand = (quoteId: number) => {
    setExpandedQuote(expandedQuote === quoteId ? null : quoteId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quotes...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft size={24} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Quotes</h3>
          <p className="text-gray-600 mb-6">
            {error instanceof Error ? error.message : 'Failed to load quotes. Please try again.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-xl font-semibold hover:bg-[var(--primary-dark)] transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                  Review and manage quotes for <span className="font-semibold">Requirement #{requirementId}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-[var(--primary-light)] rounded-full text-white">
                {localQuotes.length} Total Quotes
              </div>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Refresh
              </button>
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
            <QuoteCard
              key={quote.id}
              quote={quote}
              onAccept={handleAcceptQuote}
              onReject={handleRejectQuote}
              expandedQuote={expandedQuote}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredQuotes.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <DollarSign size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {localQuotes.length === 0 ? 'No quotes received yet' : 'No quotes found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {search
                ? `No quotes match "${search}"`
                : filter !== 'ALL'
                ? `No ${filter.toLowerCase()} quotes`
                : 'No quotes have been submitted for this requirement yet'}
            </p>
            <div className="flex gap-3 justify-center">
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
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;