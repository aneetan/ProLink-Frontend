import  { useState } from 'react';
import type { FormData } from '../../types/company.types';
import StepWiseForm from '../../components/company/setup/StepWiseForm';

function App() {
  const [formData, setFormData] = useState<FormData>({
      companyInfo: {
        name: '',
        registrationNo: '',
        description: '',
        establishedYear: '',
        serviceCategory: '',
        websiteUrl: ''
      },
      servicePricing: {
        servicesOffered: [],
        priceRangeMin: '',
        priceRangeMax: '',
        avgDeliveryTime: ''
      },
    });

  const handleFormSubmit = (finalData: FormData) => {
    // (add here) handle final form submission
    console.log('Final form data:', finalData);
  };

  return (
    <div>
      <StepWiseForm 
        initialData={formData}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;