import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { v4 as uuidv4 } from 'uuid';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'factory' | 'business' | 'bank' | 'admin'>('factory');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = uuidv4();

    dispatch(
      login({
        id: userId,
        name,
        email,
        role,
        token: 'dummy_jwt_token',
        isLoggedIn: true,
      })
    );

    // Clear form
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Sign Up</h2>

      <label className="block mb-2 text-gray-700 dark:text-gray-300">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
        required
      />

      <label className="block mb-2 text-gray-700 dark:text-gray-300">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
        required
      />

      <label className="block mb-2 text-gray-700 dark:text-gray-300">Role</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        className="w-full mb-4 px-4 py-2 border rounded"
      >
        <option value="factory">Factory</option>
        <option value="business">Business</option>
        <option value="bank">Bank</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
