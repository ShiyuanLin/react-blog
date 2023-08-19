import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.js';

const Register = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errorState, setErrorState] = useState(null);

  const handleChange = (e) => {
    setUserInput(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', userInput);
      navigate('/login');
      // console.log(res);
    } catch (e) {
      // console.log(e);
      setErrorState(e.response.data);
    }
  };

  // console.log('userInput', userInput);

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="username" name="username" onChange={handleChange} />
        <input required type="email" placeholder="email" name="email" onChange={handleChange} />
        <input required type="password" placeholder="password" name="password" onChange={handleChange} />
        <button>Register</button>
        {errorState && <p>{errorState}</p>}
        <span>Don't you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
};

export default Register;
