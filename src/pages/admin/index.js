import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import Sidebar from "../../components/Shared/Sidebar";
import ItemList from "../../components/Admin/ItemList";

const AdminDashboard = () => {
  const { authState, signOut } = useAuth();
  const router = useRouter();

  // Redirect to sign-in page if user is not authenticated or not an admin
  useEffect(() => {
    const checkAdminStatus = () => {
      if (!authState.isSignedIn || !authState.user?.roles?.includes("admin")) {
        router.push("/login?redirect=/admin");
      }
    };

    checkAdminStatus();
  }, [authState, router]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Loading state or early return if user not authorized
  if (!authState.isSignedIn || !authState.user?.roles?.includes("admin")) {
    return null; // or show a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar />
      <main className="flex-grow p-4">
        <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="p-2 mb-4 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
        <ItemList />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
