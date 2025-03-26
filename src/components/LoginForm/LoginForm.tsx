import React from 'react';
import { useLogin } from '../hooks/useLogin';
import './LoginForm.css';

export const LoginForm = () => {
  const { 
    email, 
    password, 
    isLoading, 
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit 
  } = useLogin();

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength={6}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};