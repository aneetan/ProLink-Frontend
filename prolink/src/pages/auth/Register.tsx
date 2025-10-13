import React, { useState } from 'react';
import Logo from '../../components/Logo';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleSignupButton from '../../components/auth/GoogleSignupButton';

interface RegisterProps {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
}

interface ErrorProps {
   formError: string;
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterProps>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<ErrorProps>({
    formError: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorProps = {
      formError: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ErrorProps]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        formError: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle successful registration logic here
      console.log('Registration successful:', formData);
      // You can make API call here
    } else {
      setErrors(prev => ({
        ...prev,
        formError: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side Content */}
        <div className="hidden lg:block relative bg-gradient-to-br from-blue-900 to-[var(--secondary-color)] p-8 lg:p-12 text-white overflow-hidden">
          {/* Background Image Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFwcHklMjBjbGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600")'
            }}
          ></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Get started for<br />
                <span className="text-white">Trusted Service Providers</span>
              </h2>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <p className="text-blue-200 text-lg lg:text-xl italic">
                 "From quotation to completion, connect only with vetted service providers who deliver on their promise."
              </p>
            </div>
          </div>
        </div>
      
        {/* Right Side Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-4">
             <Logo isName={true} />
          </div>

          <div className="mb-3">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Register Here
            </h2>
          </div>

          {/* Form Error Message */}
          {errors.formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{errors.formError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
               </label>
               <div className="relative">
                  <input
                     id="password"
                     type={showPassword ? "text" : "password"}
                     name='password'
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Enter your password"
                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 pr-12 ${
                       errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                     }`}
                  />
                  <button
                     type="button"
                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
               </div>
               {errors.password ? (
                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
               ) : (
                 <p className="mt-1 text-xs text-gray-500">
                   Must be at least 8 characters with uppercase, lowercase, and number
                 </p>
               )}
            </div>

            {/* Confirm Password Field */}
            <div>
               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
               </label>
               <div className="relative">
                  <input
                     id="confirmPassword"
                     type={showConfirmPassword ? "text" : "password"}
                     name='confirmPassword'
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     placeholder="Re-enter your password"
                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 pr-12 ${
                       errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                     }`}
                  />
                  <button
                     type="button"
                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                     {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
               </div>
               {errors.confirmPassword && (
                 <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
               )}
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <GoogleSignupButton/>
          </div>

          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <a href="/login" className="text-teal-800 hover:text-[var(--primary-color)] hover:underline text-base transition-colors duration-200">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;