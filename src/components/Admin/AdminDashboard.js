import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const AdminDashboard = () => {
  const { user } = useAuth(); // Get the current user from Clerk

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {user.firstName}!</p>{" "}
      {/* Display user's first name */}
      <div className="space-y-4">
        <Link href="/admin/item-list">
          <div className="block p-4 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">
            Manage Items
          </div>
        </Link>
        <Link href="/admin/add-item">
          <div className="block p-4 text-white bg-green-600 rounded-lg shadow hover:bg-green-700">
            Add New Item
          </div>
        </Link>
        <Link href="/admin/reservation-list">
          <div className="block p-4 text-white bg-yellow-600 rounded-lg shadow hover:bg-yellow-700">
            View Reservations
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
