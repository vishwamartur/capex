import { Clerk } from "@clerk/clerk-sdk-node";

// Initialize Clerk client with the backend API URL
const clerk = new Clerk({
  apiKey: process.env.CLERK_API_KEY, // Your Clerk API key
  apiVersion: 2,
  frontendApi: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API, // Your Clerk Frontend API URL
});

export default clerk;
