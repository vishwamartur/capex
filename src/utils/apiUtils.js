// Import Axios for making HTTP requests
import axios from "axios";

// Define the base URLs for Clerk and Appwrite APIs
const CLERK_API_URL =
  process.env.NEXT_PUBLIC_CLERK_API_URL || "https://api.clerk.com";
const APPWRITE_API_URL =
  process.env.NEXT_PUBLIC_APPWRITE_API_URL || "https://api.appwrite.io/v1";

// Set up Axios instances for Clerk and Appwrite
const clerkApi = axios.create({
  baseURL: CLERK_API_URL,
  headers: {
    "Content-Type": "application/json",
    // Add any other required headers, e.g., Authorization tokens
  },
});

const appwriteApi = axios.create({
  baseURL: APPWRITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // Add any other required headers, e.g., Authorization tokens
  },
});

// Utility function to handle GET requests for Clerk
export const getClerkUser = async (userId) => {
  try {
    const response = await clerkApi.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Clerk user:", error);
    throw error;
  }
};

// Utility function to handle POST requests for Clerk
export const createClerkSession = async (sessionData) => {
  try {
    const response = await clerkApi.post("/sessions", sessionData);
    return response.data;
  } catch (error) {
    console.error("Error creating Clerk session:", error);
    throw error;
  }
};

// Utility function to handle GET requests for Appwrite
export const getAppwriteItems = async (collectionId) => {
  try {
    const response = await appwriteApi.get(
      `/databases/your-database-id/collections/${collectionId}/documents`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Appwrite items:", error);
    throw error;
  }
};

// Utility function to handle POST requests for Appwrite
export const createAppwriteItem = async (collectionId, itemData) => {
  try {
    const response = await appwriteApi.post(
      `/databases/your-database-id/collections/${collectionId}/documents`,
      itemData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating Appwrite item:", error);
    throw error;
  }
};

// Utility function to handle PUT requests for Appwrite
export const updateAppwriteItem = async (
  collectionId,
  documentId,
  itemData
) => {
  try {
    const response = await appwriteApi.put(
      `/databases/your-database-id/collections/${collectionId}/documents/${documentId}`,
      itemData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Appwrite item:", error);
    throw error;
  }
};

// Utility function to handle DELETE requests for Appwrite
export const deleteAppwriteItem = async (collectionId, documentId) => {
  try {
    const response = await appwriteApi.delete(
      `/databases/your-database-id/collections/${collectionId}/documents/${documentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Appwrite item:", error);
    throw error;
  }
};
