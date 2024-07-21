import { useAuth } from "../contexts/AuthContext";
import { useItems } from "../contexts/ItemContext";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";
import Sidebar from "../components/Shared/Sidebar";
import Calendar from "../components/Shared/Calendar";
import Countdown from "../components/Shared/Countdown";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { authState, signOut } = useAuth();
  const { items, loading, error } = useItems();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("Error fetching items:", error);
      setHasError(true);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar />
      <main className="flex-grow p-4">
        <h1 className="mb-4 text-2xl font-bold">
          Welcome to Capex Reservation
        </h1>

        {/* Check if user is authenticated */}
        {authState.isSignedIn ? (
          <div>
            <p className="mb-4">
              Hello, {authState.user ? authState.user.firstName : "Guest"}!
            </p>
            <button
              onClick={() => signOut()}
              className="p-2 text-white bg-red-500 rounded"
            >
              Sign Out
            </button>

            {/* Display items */}
            <div className="mt-6">
              <h2 className="mb-2 text-xl font-semibold">Available Items</h2>
              {loading ? (
                <p>Loading items...</p>
              ) : hasError ? (
                <p>
                  There was an error fetching the items. Please try again later.
                </p>
              ) : items.length > 0 ? (
                <ul>
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 mb-2 border rounded shadow-sm"
                    >
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>{item.description}</p>
                      <p className="mt-2 text-sm text-gray-600">
                        Available from {item.availableFrom} to{" "}
                        {item.availableUntil}
                      </p>
                      <Calendar />
                      <Countdown endTime={item.availableUntil} />
                      <Link href={`/reserve/${item.id}`} passHref>
                        <div className="text-blue-500 hover:underline">
                          Reserve this item
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items available at the moment.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>Please sign in to view available items.</p>
            <Link href="/sign-in" passHref>
              <div className="text-blue-500 hover:underline">Sign In</div>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
