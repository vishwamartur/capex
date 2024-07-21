import { ClerkProvider, RedirectToSignIn } from "@clerk/nextjs";
import { AuthProvider } from "../contexts/AuthContext";
import { ItemProvider } from "../contexts/ItemContext";
import "../styles/globals.css";

// Clerk frontend API URL from your environment variables
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const MyApp = ({ Component, pageProps }) => {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <AuthProvider>
        <ItemProvider>
          <Component {...pageProps} />
        </ItemProvider>
      </AuthProvider>
    </ClerkProvider>
  );
};

export const createRouteMatcher = (path) => {
  return new RegExp(`^${path}(.*)$`);
};
export default MyApp;
