import React from 'react'
import { FcGoogle } from 'react-icons/fc';

const GoogleSignupButton:React.FC = () => {

   const handleGoogleSignIn = () => {
      // Handle Google sign-in logic here
      console.log('Google sign-in');
   };

  return (
    <>
      <button
         onClick={handleGoogleSignIn}
         className="w-full mt-4 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-[var(--primary-lighter)]/50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
         >
         <FcGoogle/>
         Sign up with Google
      </button>
      
    </>
  )
}

export default GoogleSignupButton
