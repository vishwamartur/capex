import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";

// Login Page Component
const LoginPage = () => {
  const router = useRouter();

  // Redirect if user is already authenticated
  useEffect(() => {
    // This effect will run after the component mounts
    // If user is already signed in, redirect to home page or another protected page
    if (router.isReady && router.query.redirect) {
      router.push(router.query.redirect);
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex items-center justify-center flex-grow p-4">
        <div className="w-full max-w-md">
          <h1 className="mb-4 text-2xl font-bold">Sign In</h1>
          <SignIn
            path="/login"
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
              variables: {
                colorPrimary: "#000", // Customize primary color as needed
              },
              elements: {
                // Customize additional styles if needed
                card: "bg-white shadow-lg rounded-lg",
                headerTitle: "text-xl font-bold text-gray-900",
              },
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
