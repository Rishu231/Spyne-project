import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; 
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import './css/LoginPage.css'; 

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });
      const user = response.data[0]; // Get the first item from the array
      if (user){
        login(user);
        navigate('/home'); 
      }else{
      setResponseMessage("Please check your credentials."); 
      }
    } catch (error) {
      console.error(error);
      setErrors({ api: 'Login failed. Please check your credentials.' });
      setResponseMessage('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginHandler}>
        <h2 className="form-title">Login</h2>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {errors.api && <p className="error">{errors.api}</p>}
        {responseMessage && <p className="response-message">{responseMessage}</p>}
        <button type="submit" className="submit-button">Login</button>
        <Link to="/signup" className="signup-link">Sign Up</Link>
      </form>
    </div>
  );
};

export default LoginPage;
