import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { useItems } from "../../contexts/ItemContext";
import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import Sidebar from "../../components/Shared/Sidebar";
import ItemCard from "../../components/User/ItemCard";
import Link from "next/link";

const UserDashboard = () => {
  const { authState, signOut } = useAuth();
  const { items, loading, error } = useItems();
  const router = useRouter();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!authState.isSignedIn) {
      router.push("/login?redirect=/user");
    }
  }, [authState, router]);

  // Handle sign out
  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar />
      <main className="flex-grow p-4">
        <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="p-2 mb-4 text-white bg-red-500 rounded"
        >
          Sign Out
        </button>

        {/* Display items for reservation */}
        <div>
          <h2 className="mb-2 text-xl font-semibold">Available Items</h2>
          {loading ? (
            <p>Loading items...</p>
          ) : error ? (
            <p>Error fetching items: {error.message}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.length > 0 ? (
                items.map((item) => <ItemCard key={item.id} item={item} />)
              ) : (
                <p>No items available at the moment.</p>
              )}
            </div>
          )}
        </div>

        <Link href="/reserve">
          <div className="block mt-4 text-blue-500 hover:underline">
            Make a Reservation
          </div>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
