// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create context
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, initialState = {} }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    initialState.isLoggedIn || false
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API call
      // const response = await fetch('your-api-endpoint/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Mock successful login
      const userData = {
        id: "1",
        name: "Салон Beauty",
        email: email,
        token: "mock-token-xyz",
      };

      // Store user data and token
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("token", userData.token);

      setUser(userData);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      console.log("Login error:", error);
      return { success: false, error: "Нэвтрэх үед алдаа гарлаа." };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Clear stored credentials
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");

      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API call
      // const response = await fetch('your-api-endpoint/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });
      // const data = await response.json();

      // Mock successful registration
      return { success: true };
    } catch (error) {
      console.log("Registration error:", error);
      return { success: false, error: "Бүртгүүлэх үед алдаа гарлаа." };
    } finally {
      setLoading(false);
    }
  };

  // Check if user is already logged in (on app start)
  const checkAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Error checking auth status:", error);
    }
  };

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, []);

  // Provide auth context value
  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
