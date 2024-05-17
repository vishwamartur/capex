// Function to check if user is authenticated
export const isAuthenticated = () => {
  // Logic to check if user is authenticated (e.g., checking if token is present in localStorage)
  const token = localStorage.getItem("token");
  return token !== null;
};

// Function to get user token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Function to set user token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to remove user token (logout)
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Add more authentication-related utility functions as needed
