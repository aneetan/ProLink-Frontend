import  { useState } from 'react';
import type { FormData } from '../../types/company.types';
import StepWiseForm from '../../components/company/setup/StepWiseForm';
import { getUserIdFromToken } from '../../utils/jwt.utils';

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
        priceRangeMin: 0,
        priceRangeMax: 0,
        avgDeliveryTime: ''
      },
      docs: {
        logo: null,
        businessLicense: null,
        taxCertificate: null,
        ownerId: null
      }
    });

  const handleFormSubmit = (finalData: FormData) => {
    const submittedData = {
      ...finalData,
      userId: getUserIdFromToken(localStorage.getItem('token') || '')
    }
    // (add here) handle final form submission
    console.log('Final form data:', submittedData);
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