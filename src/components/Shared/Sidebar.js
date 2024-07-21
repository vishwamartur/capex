import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const Sidebar = () => {
  const { isSignedIn, user } = useAuth(); // Get authentication status and user info from Clerk
  const [isAdmin, setIsAdmin] = useState(false); // Placeholder for admin role check

  // Mock function to check if user is an admin
  const checkAdminStatus = () => {
    // Placeholder logic for admin status
    if (isSignedIn && user && user.email === "admin@example.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [isSignedIn, user]);

  return (
    <aside className="w-64 h-full p-4 text-white bg-gray-800">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Navigation</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/">Home</Link>
          {isSignedIn && (
            <>
              {isAdmin ? (
                <>
                  <Link href="/admin">Admin Dashboard</Link>
                  <Link href="/admin/items">Manage Items</Link>
                </>
              ) : (
                <>
                  <Link href="/user">
                    <div className="p-2 rounded hover:bg-gray-700">
                      User Dashboard
                    </div>
                  </Link>
                  <Link href="/user/reserve">
                    <div className="p-2 rounded hover:bg-gray-700">
                      Reserve Item
                    </div>
                  </Link>
                </>
              )}
              <Link href="/user/profile">
                <div className="p-2 rounded hover:bg-gray-700">Profile</div>
              </Link>
            </>
          )}
          {!isSignedIn && (
            <Link href="/sign-in">
              <div className="p-2 rounded hover:bg-gray-700">Sign In</div>
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
