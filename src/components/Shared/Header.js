import { useState, useEffect } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { isSignedIn, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // Effect hook to check admin status when user or sign-in status changes
  useEffect(() => {
    if (isSignedIn && user && user.email === "admin@example.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isSignedIn, user]);

  return (
    <header className="p-4 text-white bg-blue-600">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Capex Reservation
        </Link>
        <nav className="flex space-x-4">
          <Link href="/">Home</Link>
          {isSignedIn ? (
            <>
              <Link href="/user">Dashboard</Link>
              {isAdmin ? (
                <Link href="/admin">Admin Dashboard</Link>
              ) : (
                <Link href="/user/reserve">Reserve Item</Link>
              )}
              <SignOutButton>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                >
                  Sign Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton>
              <button
                onClick={() => {}}
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Sign In
              </button>
            </SignInButton>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
