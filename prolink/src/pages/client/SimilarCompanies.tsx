import React from 'react';
import { useSimilarCompanies } from '../../hooks/useSimilarCompanies';
import { useParams } from 'react-router';

// Define TypeScript interfaces
interface CompanyMetadata {
  name: string;
  description: string;
  serviceCategory: string;
  services: string[];
  priceRangeMin: number;
  priceRangeMax: number;
  avgDeliveryTime: string;
  establishedYear: string;
  [key: string]: any; // For additional properties
}

interface Company {
  id: string;
  score: number;
  text: string;
  metadata: CompanyMetadata;
}

interface SimilarCompaniesData {
  success: boolean;
  requirementId: number;
  matches: Company[];
  totalMatches: number;
}

interface SimilarCompaniesProps {
  topK?: number;
}

const SimilarCompanies: React.FC<SimilarCompaniesProps> = ({ topK = 5 }) => {
  // Get requirementId from URL params
//   const { requirementId } = useParams<{ requirementId: string }>();
  const requirementId = "7";
  const parsedRequirementId = requirementId ? parseInt(requirementId) : null;

  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching 
  } = useSimilarCompanies(parsedRequirementId!, topK);

  if (!parsedRequirementId) {
    return (
      <div className="similar-companies">
        <div className="no-requirement">
          <h3>Requirement Not Found</h3>
          <p>Please check the URL or select a valid requirement.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="similar-companies">
        <div className="loading">
          <div className="spinner"></div>
          <p>Finding similar companies...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="similar-companies">
        <div className="error">
          <h3>Error loading companies</h3>
          <p>{error?.message || 'An error occurred while loading companies'}</p>
          <button onClick={() => refetch()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { matches, totalMatches } = data as SimilarCompaniesData;

  return (
    <div className="similar-companies">
      <div className="header">
        <h2>Similar Companies</h2>
        <div className="header-info">
          <span className="match-count">{totalMatches} companies found</span>
          <button 
            onClick={() => refetch()} 
            disabled={isFetching}
            className="refresh-btn"
          >
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {totalMatches === 0 ? (
        <div className="no-matches">
          <p>No similar companies found for requirement #{parsedRequirementId}.</p>
          <p>Try adjusting your search criteria or check back later.</p>
        </div>
      ) : (
        <div className="companies-list">
          {matches.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
};

// Company Card Component
interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { metadata, score } = company;
  const matchPercentage = (score * 100).toFixed(1);

  return (
    <div className="company-card">
      <div className="company-header">
        <h3 className="company-name">{metadata.name}</h3>
        <div className="match-badge">
          {matchPercentage}% Match
        </div>
      </div>

      <div className="company-details">
        <p className="company-description">{metadata.description}</p>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Service Category:</span>
            <span className="value">{metadata.serviceCategory}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Services:</span>
            <span className="value">{metadata.services.join(', ')}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Price Range:</span>
            <span className="value">
              ${metadata.priceRangeMin.toLocaleString()} - ${metadata.priceRangeMax.toLocaleString()}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="label">Delivery Time:</span>
            <span className="value">{metadata.avgDeliveryTime}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Established:</span>
            <span className="value">{metadata.establishedYear}</span>
          </div>
        </div>
      </div>

      <div className="company-actions">
        <button className="contact-btn">Contact Company</button>
        <button className="view-profile-btn">View Profile</button>
      </div>
    </div>
  );
};

export default SimilarCompanies;