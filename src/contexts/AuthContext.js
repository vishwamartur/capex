import React, { createContext, useContext, useState, useEffect } from "react";
import {
  useAuth as useClerkAuth,
  ClerkProvider,
  RedirectToSignIn,
} from "@clerk/nextjs";

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user, signOut } = useClerkAuth();
  const [authState, setAuthState] = useState({
    isLoaded: false,
    isSignedIn: false,
    user: null,
  });

  useEffect(() => {
    if (isLoaded) {
      setAuthState({
        isLoaded: true,
        isSignedIn: isSignedIn,
        user: user,
      });
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <AuthContext.Provider value={{ authState, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Optional: Redirect to sign-in if not authenticated
export const AuthRedirect = () => {
  const { authState } = useAuth();
  if (!authState.isSignedIn) {
    return <RedirectToSignIn />;
  }
  return null;
};
