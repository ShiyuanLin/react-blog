import api from '../api.js';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('User')) || null);
  // console.log(setCurrentUser);

  const login = async (inputs) => {
    console.log('login in authCOnete');
    console.log('currentUser before login', currentUser);
    const res = await api.post('/auth/login', inputs);
    console.log('res.data', res.data);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await api.post('/auth/logout');
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
    // localStorage.setItem('theo', 'yes');
    console.log('currentUser after login in useEffect', currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
