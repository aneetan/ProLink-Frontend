import React, { useState, useMemo } from 'react';
import { ArrowLeft, DollarSign, Search, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import QuoteCard from '../../../components/cards/QuoteCard';
import type { QuoteResponse } from '../../../types/company/bidRequest.types';
import { requestBidService } from '../../../api/bid.api';
import { useModal } from '../../../store/useModal';
import AcceptDeclineModal, { type ModalType } from '../../../components/modal/AcceptDeclineModal';

type SortOption = 'PRICE_LOW_TO_HIGH' | 'PRICE_HIGH_TO_LOW' | 'DATE_NEW_TO_OLD' | 'DATE_OLD_TO_NEW';

const QuotesPage: React.FC = () => {
  const { requirementId } = useParams<{ requirementId: string }>();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'ACCEPTED' | 'DECLINED'>('ALL');
  const [search, setSearch] = useState('');
  const [expandedQuote, setExpandedQuote] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('PRICE_LOW_TO_HIGH');
  const { modalState, openModal, closeModal, handleConfirm } = useModal();

  // React Query to fetch quotes
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['quotes', requirementId],
    queryFn: () => requestBidService.getQuoteForRequirement(requirementId!),
    enabled: !!requirementId,
  });
  
  // Transform API response to match Quote type with proper typing
  const quotes: QuoteResponse[] = useMemo(() => {
    if (!apiResponse) return [];
    
    // Handle both array response and object with data property
    const quotesData = apiResponse.data.quotes || [];
    
    return quotesData.map((quote) => ({
      id: quote.id,
      amount: quote.amount,
      deliveryTime: quote.deliveryTime,
      message: quote.message,
      companyId: quote.companyId,
      requirementId: quote.requirementId,
      status: quote.status,
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt,
      company: {
        id: quote.company.id,
        name: quote.company.name,
        logo: quote.company.logo
      },
      // For compatibility
      companyName: quote.company.name,
      submittedDate: new Date(quote.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }));
  }, [apiResponse]);

  // Filter quotes with useMemo for better performance
  const filteredQuotes = useMemo(() => {
    const filtered = quotes.filter(quote => {
      const matchesFilter = filter === 'ALL' || quote.status === filter;
      const matchesSearch = 
        (quote.company.name.toLowerCase().includes(search.toLowerCase()) || 
         quote.message?.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'PRICE_LOW_TO_HIGH':
          return a.amount - b.amount;
        case 'PRICE_HIGH_TO_LOW':
          return b.amount - a.amount;
        case 'DATE_NEW_TO_OLD':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'DATE_OLD_TO_NEW':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [quotes, filter, search, sortBy]);

  // Get sort icon based on current sort option
  const getSortIcon = () => {
    const isAscending = sortBy === 'PRICE_LOW_TO_HIGH' || sortBy === 'DATE_OLD_TO_NEW';
    return isAscending ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  // Get current sort label
  const getSortLabel = (): string => {
    switch (sortBy) {
      case 'PRICE_LOW_TO_HIGH':
        return 'Price: Low to High';
      case 'PRICE_HIGH_TO_LOW':
        return 'Price: High to Low';
      case 'DATE_NEW_TO_OLD':
        return 'Date: Newest';
      case 'DATE_OLD_TO_NEW':
        return 'Date: Oldest';
      default:
        return 'Sort By';
    }
  };

  // Handle quote actions
  const handleAcceptQuote = async (quoteId: number) => {
     openModal({
      title: 'Accept Quote',
      description: 'Are you sure you want to accept this quote? Once accepted, you can proceed with chat negotiation.',
      type: 'ACCEPT',
      confirmText: 'Accept Quote',
      cancelText: 'Cancel',
      onConfirm: async () => {
        // Your API call to accept the quote
        await requestBidService.acceptQuote(quoteId);
        refetch(); // Refresh quotes list
      },
      additionalContent: (
        <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-700">
            <span className="font-semibold">Note:</span> This action cannot be undone. You will enter into a phase of contract with selected company.
          </p>
        </div>
      )
    });
  };

  const handleRejectQuote = async (quoteId: number) => {
   openModal({
      title: 'Reject Quote',
      description: 'Are you sure you want to reject this quote? This action cannot be undone.',
      type: 'DECLINE',
      confirmText: 'Reject Quote',
      cancelText: 'Cancel',
      isDestructive: true,
      onConfirm: async () => {
        // Your API call to reject the quote
        const data = await requestBidService.declineQuote(quoteId);
        console.log(data)
        refetch(); // Refresh quotes list
      }
    });
  };

  const handleToggleExpand = (quoteId: number) => {
    setExpandedQuote(expandedQuote === quoteId ? null : quoteId);
  };

  // Calculate status counts
  const statusCounts = useMemo(() => {
    return {
      total: quotes.length,
      pending: quotes.filter(q => q.status === 'PENDING').length,
      accepted: quotes.filter(q => q.status === 'ACCEPTED').length,
      declined: quotes.filter(q => q.status === 'DECLINED').length
    };
  }, [quotes]);

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
                aria-label="Go back"
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
                {statusCounts.total} Total Quotes
              </div>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                aria-label="Refresh quotes"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
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
                  aria-label="Search quotes"
                />
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <div className="dropdown">
                <button
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  aria-label="Sort quotes"
                >
                  {getSortLabel()}
                  {getSortIcon()}
                  <ChevronDown size={16} />
                </button>
                <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10 hidden">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Sort by Price
                  </div>
                  <button
                    onClick={() => setSortBy('PRICE_LOW_TO_HIGH')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${sortBy === 'PRICE_LOW_TO_HIGH' ? 'text-[var(--primary-color)] font-medium' : 'text-gray-700'}`}
                  >
                    Price: Low to High
                    {sortBy === 'PRICE_LOW_TO_HIGH' && <ArrowUp size={14} />}
                  </button>
                  <button
                    onClick={() => setSortBy('PRICE_HIGH_TO_LOW')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${sortBy === 'PRICE_HIGH_TO_LOW' ? 'text-[var(--primary-color)] font-medium' : 'text-gray-700'}`}
                  >
                    Price: High to Low
                    {sortBy === 'PRICE_HIGH_TO_LOW' && <ArrowDown size={14} />}
                  </button>
                  
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                    Sort by Date
                  </div>
                  <button
                    onClick={() => setSortBy('DATE_NEW_TO_OLD')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${sortBy === 'DATE_NEW_TO_OLD' ? 'text-[var(--primary-color)] font-medium' : 'text-gray-700'}`}
                  >
                    Date: Newest First
                    {sortBy === 'DATE_NEW_TO_OLD' && <ArrowDown size={14} />}
                  </button>
                  <button
                    onClick={() => setSortBy('DATE_OLD_TO_NEW')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${sortBy === 'DATE_OLD_TO_NEW' ? 'text-[var(--primary-color)] font-medium' : 'text-gray-700'}`}
                  >
                    Date: Oldest First
                    {sortBy === 'DATE_OLD_TO_NEW' && <ArrowUp size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              {(['ALL', 'PENDING', 'ACCEPTED', 'DECLINED'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                    filter === status
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={`Filter ${status.toLowerCase()} quotes`}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                  {status === 'ALL' && (
                    <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">
                      {statusCounts.total}
                    </span>
                  )}
                  {status === 'PENDING' && (
                    <span className="text-xs bg-amber-500/20 px-1.5 py-0.5 rounded">
                      {statusCounts.pending}
                    </span>
                  )}
                  {status === 'ACCEPTED' && (
                    <span className="text-xs bg-emerald-500/20 px-1.5 py-0.5 rounded">
                      {statusCounts.accepted}
                    </span>
                  )}
                  {status === 'DECLINED' && (
                    <span className="text-xs bg-rose-500/20 px-1.5 py-0.5 rounded">
                      {statusCounts.declined}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Status summary and current sort info */}
          <div className="flex flex-wrap justify-between items-center mt-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-gray-600">
                  <span className="font-semibold">{statusCounts.pending}</span> pending
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-gray-600">
                  <span className="font-semibold">{statusCounts.accepted}</span> accepted
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span className="text-gray-600">
                  <span className="font-semibold">{statusCounts.declined}</span> Declined
                </span>
              </div>
            </div>
            {filteredQuotes.length > 0 && (
              <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                Sorted by: <span className="font-medium text-gray-700">{getSortLabel()}</span>
              </div>
            )}
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
              {quotes.length === 0 ? 'No quotes received yet' : 'No quotes found'}
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

      <AcceptDeclineModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={modalState.title}
        description={modalState.description}
        type={modalState.type as ModalType}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        isLoading={modalState.isLoading}
        isDestructive={modalState.isDestructive}
        additionalContent={modalState.additionalContent}
      />
    </div>
  );
};

export default QuotesPage;