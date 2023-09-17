import React, { useState } from 'react'

export const useAuth = () => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        return user;
    }; 

    const getToken = () => {
        const tokenUser = sessionStorage.getItem('token');
        const token = tokenUser ? JSON.parse(tokenUser) : null;
        return token;
    };

    const login = ({user, token}) => {
        setUser(user);
        setToken(token);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', JSON.stringify(token));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    };

    const isAuthenticated = () => {
        const token = getToken(); 
        const user = getUser();
      
        return token !== null && user !== null;
    };
    return {
        getUser,
        getToken,
        login,
        logout,
        isAuthenticated
      };
}