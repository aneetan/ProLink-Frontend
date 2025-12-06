import { useState } from 'react';
import { FiPlus } from 'react-icons/fi'
import AddRequirement from '../../pages/client/requirement/AddRequirement';

const NewRequirement = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
 

   const handleRequirementSubmitted = () => {
      handleCloseModal();
    };

  return (
     <div>
      <button
        className="mt-4 sm:mt-0 flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)]
        text-white px-4 py-2 rounded-lg transition-colors"
        onClick={handleOpenModal}
      >
        <FiPlus className="w-5 h-5" />
        New Quotation
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 bg-opacity-50 transition-opacity"
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Content */}
            <div 
              className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className='flex flex-col'>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Post New Requirement
                  </h2>
                    <span className="text-sm text-gray-600 max-w-2xl">
                    Tell us about your project and get quotes from qualified service providers
                  </span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <AddRequirement 
                  onCancel={handleCloseModal}
                  onSuccess={handleRequirementSubmitted}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewRequirement
