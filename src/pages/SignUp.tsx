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
    const nameValid = name.trim().length >= 4;
    const emailValid = email.trim() !== '' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const passwordValid = password.length >= 8 && password.length <= 16 && 
                         /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
    const roleValid = role !== '';
    
    setIsValid({
      name: nameValid,
      email: emailValid,
      password: passwordValid,
      role: roleValid
    });
    console.log('SignUp Validation:', { name, email, password, role, nameValid, emailValid, passwordValid, roleValid });
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
  console.log('SignUp Button state:', { isFormValid, isValid });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Create Account
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join us and start your journey
          </p>
        </div>

        {/* SignUp Form */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                className={`w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                  errors.name ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''
                }`}
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
              <label 
                htmlFor="role" 
                className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={handleRoleChange}
                className={`w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                  errors.role ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''
                }`}
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
                {isFormValid ? 'Create Account' : 'Please complete all fields'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <a 
              href="/login" 
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
