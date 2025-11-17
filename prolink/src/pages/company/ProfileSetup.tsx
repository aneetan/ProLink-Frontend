import type { CompanyInfo, ServicePricing, VerificationDocuments } from '../../types/company.types';
import StepWiseForm from '../../components/company/setup/StepWiseForm';
import { getUserIdFromToken } from '../../utils/jwt.utils';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { createCompanyProfile } from '../../api/company.api';
import { showSuccessToast } from '../../utils/toast.utils';


const defaultCompanyInfo: CompanyInfo = {
  name: '',
  registrationNo: '',
  description: '',
  establishedYear: '',
  serviceCategory: '',
  websiteUrl: ''
};
const defaultServicePricing: ServicePricing = {
  servicesOffered: [],
  priceRangeMin: 0,
  priceRangeMax: 0,
  avgDeliveryTime: ''
};
const defaultDocs: VerificationDocuments = {
  logo: "",
  businessLicense: "",
  taxCertificate: "",
  ownerId: ""
};

function CompanySetupPage() {

  const mutation = useMutation<AxiosResponse, AxiosError, any>({
    mutationFn: createCompanyProfile,
    onSuccess: (response) => {
      showSuccessToast("Added company");
      console.log(response);
    },
    onError: (e: AxiosError) => {
      if (e.response) {
        console.log('Error response data:', e.response);
        console.log('Error status:', e.response.status);
      }
    }
  });

  const handleFormSubmit = (finalData: any) => {
    const userId = getUserIdFromToken(localStorage.getItem('token') || '') || 0;

    const formattedData = {
      body: {
        companyInfoSchema: { ...finalData.companyInfo },
        servicePricingSchema: { ...finalData.servicePricing },
        docsValidationSchema: { ...finalData.docs },
        userId: userId
      }
    };

    mutation.mutate(formattedData.body);
    showSuccessToast("Data added successfully")
  };

  return (
    <div>
      <StepWiseForm 
        initialData={{
          companyInfo: defaultCompanyInfo,
          servicePricing: defaultServicePricing,
          docs: defaultDocs,
          userId: 0
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default CompanySetupPage;