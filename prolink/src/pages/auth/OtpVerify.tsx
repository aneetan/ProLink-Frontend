import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import type { OTPVerifyData } from '../../types/auth.types';
import { showErrorToast } from '../../utils/toast.utils';
import OTPInput from '../../components/auth/OtpInput';
import Logo from '../../components/Logo';

const OtpVerify = () => {
   const navigate = useNavigate();
   const location = useLocation();

    const {email, token} = location.state || {};
    const [formData, setFormData] = useState<OTPVerifyData>({
            token: "",
            email: "",
            otp: ""
    })

   useEffect(() => {
        if(email && token){
            setFormData({
                token: token,
                email: email,
                otp: ""
            })
        } else {
            showErrorToast("Session expired. Please try again.");
        }
   }, [email, token, navigate])
 
    const handleOTPComplete = (otp:string) => {
        const submissionData = {
            ...formData,
            otp: otp
        };
        console.log(submissionData);
    };

  return (
   <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-indigo-100 p-4">
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <div className='flex justify-center items-center mb-3'>
                     <Logo isName={true}/>
                  </div>
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Enter Verification Code</h1>
                        <p className="text-gray-600 mt-2 text-base"> We've sent a 6-digit code to your email. Enter it below to continue. </p>
                    </div>
                    
                    <form className="space-y-6" onSubmit={() => handleOTPComplete}>
                        <div>   
                                <OTPInput onComplete={handleOTPComplete}/>
                        </div>

                        <button
                            type="submit"
                           //  disabled={mutation.isPending}
                           // css ${mutation.isPending ? 'opacity-70 cursor-not-allowed
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--primary-color)]
                                hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition ' : ''}`}
                        > Verify
                            {/* {mutation.isPending ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Redirecting....
                                </>
                            ) : 'Verify'} */}
                        </button>
                    </form>
                </div>
                
                <div className="px-8 py-6 text-center">
                    <p className="text-sm text-gray-600">
                        Didn't get an OTP?{' '}
                        <a href="/resend-otp" className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-color-hover)">
                            Resend
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default OtpVerify