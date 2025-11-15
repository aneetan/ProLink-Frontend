import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router';

const NewRequirement = () => {
   const navigate = useNavigate();

   const handleCreateQuotation = () => {
      navigate('/create-requirement')
   }

  return (
    <div>
        <button
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)]
          text-white px-4 py-2 rounded-lg transition-colors"
          onClick={handleCreateQuotation}
          >
            <FiPlus className="w-5 h-5" />
            New Quotation
          </button>
    </div>
  )
}

export default NewRequirement
