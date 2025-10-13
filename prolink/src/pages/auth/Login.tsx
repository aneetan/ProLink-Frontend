import React, { useState } from 'react';
import Logo from '../../components/Logo';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginProps {
   email: string;
   password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginProps>({
   email: '',
   password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const {name, value} = e.target;
   setFormData((prevValue) => ({
      ...prevValue,
      [name] : value
   }) )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log('Google sign-in');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
             <Logo isName={true} />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              WELCOME BACK
            </h2>
            <p className="text-gray-600">
              Sign in to your account to access all features
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

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
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 pr-12"
                     required
                  />
                  <button
                     type="button"
                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     {showPassword ? (
                      <FaEye/>
                     ) : (
                      <FaEyeSlash/>
                     )}
                  </button>
               </div>
               <div className="mt-1 text-right">
                  <a href="#" className="text-gray-500 hover:text-[var(--primary-color)] hover:underline text-sm transition-colors duration-200">
                     Forgot password?
                  </a>
               </div>
               </div>

            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-4 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-[var(--primary-lighter)]/50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <FcGoogle/>
              Sign in with Google
            </button>
          </div>

            <div className="mt-4 text-center">
               <span> New to platform? </span>
               <a href="/register" className="text-teal-800 hover:text-[Var(--primary-color)] hover:underline text-base transition-colors duration-200">
                 Create Account
               </a>
            </div>

        </div>

        {/* Right Side - System Info & Stats - Hidden on small screens */}
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
                Transform Your<br />
                <span className="text-white">Service Operations</span>
              </h2>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <p className="text-blue-200 text-lg lg:text-xl italic">
                "Transforming your services into simple, intelligent solutions"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;