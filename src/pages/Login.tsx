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
  const [isValid, setIsValid] = useState({
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
    const emailValid = email.trim() !== '' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const passwordValid = password.length >= 8 && password.length <= 16 && 
                         /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
    
    setIsValid({
      email: emailValid,
      password: passwordValid
    });
    console.log('Validation:', { email, password, emailValid, passwordValid });
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
      })
    );

    setEmail('');
    setPassword('');
    setTouched({});
  };

  const isFormValid = isValid.email && isValid.password;
  console.log('Button state:', { isFormValid, isValid });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                  errors.email ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''
                }`}
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
              <label 
                htmlFor="password" 
                className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                  errors.password ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''
                }`}
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
              <label 
                htmlFor="role" 
                className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              >
                <option value="factory">Factory</option>
                <option value="business">Business</option>
                <option value="bank">Bank</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={!isFormValid}
                className={
                  isFormValid 
                    ? 'w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 transform hover:-translate-y-1 hover:shadow-lg' 
                    : 'w-full bg-red-500 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 cursor-not-allowed'
                }
                style={{ backgroundColor: isFormValid ? 'green' : 'red' }}
              >
                {isFormValid ? 'Sign In (VALID)' : 'Please complete all fields (INVALID)'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <a 
              href="/signup" 
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Create one here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
