import React, { useState } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import './css/SignupPage.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [mobile_no, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!mobile_no.trim()) {
      errors.mobile_no = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile_no)) {
      errors.mobile_no = "Mobile number must be 10 digits";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const signupHandler = async (e) => {
    // navigate('/');
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axiosInstance.post('/users', {
        name,
        mobile_no,
        email,
        password,
      });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={signupHandler}>
        <h2 className="form-title">Sign Up</h2>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Mobile No" 
            value={mobile_no} 
            onChange={(e) => setMobileNo(e.target.value)} 
            required 
          />
          {errors.mobile_no && <p className="error">{errors.mobile_no}</p>}
        </div>
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
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
