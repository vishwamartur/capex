const BASE_URL = "http://localhost:3000/api";

// Function to make GET request to API
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to make POST request to API
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to post data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Add more utility functions for other HTTP methods as needed
