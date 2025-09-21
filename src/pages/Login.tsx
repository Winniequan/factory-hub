import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { v4 as uuidv4 } from 'uuid';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'factory' | 'business' | 'bank' | 'admin'>('factory');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [isValid, setIsValid] = useState<{[key: string]: boolean}>({
    email: false,
    password: false
  });

  const validateEmail = (email: string): string => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      return 'Email cannot be empty';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (password.length < 8 || password.length > 16) {
      return 'Password must be 8-16 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  // Check validation status whenever email or password changes
  useEffect(() => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setIsValid({
      email: !emailError,
      password: !passwordError
    });
  }, [email, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!touched.email) {
      setTouched(prev => ({ ...prev, email: true }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!touched.password) {
      setTouched(prev => ({ ...prev, password: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ email: true, password: true });
      return;
    }

    setErrors({});
    const userId = uuidv4(); // simulate backend ID

    dispatch(
      login({
        id: userId,
        name: 'User', // in real case, backend returns name
        email,
        role,
        token: 'dummy_jwt_token',
        isLoggedIn: true,
      })
    );

    setEmail('');
    setPassword('');
    setTouched({});
  };

  const isFormValid = isValid.email && isValid.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-3">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.email ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white hover:border-gray-400'
                } text-gray-900 placeholder-gray-500`}
                placeholder="Enter your email"
                required
              />
              {errors.email && touched.email && (
                <p className="mt-3 text-base text-red-600 flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
              {!isValid.email && (
                <p className="mt-2 text-sm text-gray-500">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-semibold text-gray-800 mb-3">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.password ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white hover:border-gray-400'
                } text-gray-900 placeholder-gray-500`}
                placeholder="Enter your password"
                required
              />
              {errors.password && touched.password && (
                <p className="mt-3 text-base text-red-600 flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
              {!isValid.password && (
                <p className="mt-2 text-sm text-gray-500">
                  Password must be 8-16 characters with uppercase, lowercase letters and numbers
                </p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="block text-lg font-semibold text-gray-800 mb-3">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 bg-gray-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white hover:border-gray-400 text-gray-900"
              >
                <option value="factory">Factory</option>
                <option value="business">Business</option>
                <option value="bank">Bank</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button 
              type="submit" 
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all duration-200 transform ${
                isFormValid 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-sm'
              }`}
            >
              {isFormValid ? (
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </span>
              ) : (
                'Please complete all fields'
              )}
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-lg text-gray-600">
              Don't have an account?{' '}
              <a 
                href="/signup" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                Create one here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
