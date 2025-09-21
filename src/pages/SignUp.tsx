import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { v4 as uuidv4 } from 'uuid';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'factory' | 'business' | 'bank' | 'admin' | ''>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [isValid, setIsValid] = useState<{[key: string]: boolean}>({
    name: false,
    email: false,
    password: false,
    role: false
  });

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Name cannot be empty';
    }
    if (name.trim().length < 4) {
      return 'Name must be at least 4 characters long';
    }
    return '';
  };

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

  const validateRole = (role: string): string => {
    if (!role) {
      return 'Please select a role';
    }
    return '';
  };

  // Check validation status whenever any field changes
  useEffect(() => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const roleError = validateRole(role);
    
    setIsValid({
      name: !nameError,
      email: !emailError,
      password: !passwordError,
      role: !roleError
    });
  }, [name, email, password, role]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!touched.name) {
      setTouched(prev => ({ ...prev, name: true }));
    }
  };

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

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as any);
    if (!touched.role) {
      setTouched(prev => ({ ...prev, role: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    // Validate all fields
    const nameError = validateName(name);
    if (nameError) {
      newErrors.name = nameError;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    const roleError = validateRole(role);
    if (roleError) {
      newErrors.role = roleError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, password: true, role: true });
      return;
    }

    setErrors({});
    const userId = uuidv4();

    dispatch(
      login({
        id: userId,
        name,
        email,
        role: role as 'factory' | 'business' | 'bank' | 'admin',
        token: 'dummy_jwt_token',
        isLoggedIn: true,
      })
    );

    // Clear form
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
    setTouched({});
  };

  const isFormValid = isValid.name && isValid.email && isValid.password && isValid.role;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Create Account
          </h1>
          <p className="text-xl text-gray-600">
            Join us and start your journey
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-3">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.name ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white hover:border-gray-400'
                } text-gray-900 placeholder-gray-500`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && touched.name && (
                <p className="mt-3 text-base text-red-600 flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
              {!isValid.name && (
                <p className="mt-2 text-sm text-gray-500">
                  Name must be at least 4 characters long
                </p>
              )}
            </div>

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
                placeholder="Create a strong password"
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
                onChange={handleRoleChange}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.role ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white hover:border-gray-400'
                } text-gray-900`}
                required
              >
                <option value="" className="text-gray-500">Select your role</option>
                <option value="factory">Factory</option>
                <option value="business">Business</option>
                <option value="bank">Bank</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && touched.role && (
                <p className="mt-3 text-base text-red-600 flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.role}
                </p>
              )}
              {!isValid.role && (
                <p className="mt-2 text-sm text-gray-500">
                  Please select a role
                </p>
              )}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </span>
              ) : (
                'Please complete all fields'
              )}
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-lg text-gray-600">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
