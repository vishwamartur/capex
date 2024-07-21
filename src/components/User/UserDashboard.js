import { useState, useEffect } from "react";
import { databases } from "../../api/appwrite"; // Import Appwrite configurations
import Link from "next/link";

const UserDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch items from Appwrite Database
        const response = await databases.listDocuments(
          "6699dcc2003667696181",
          "6699dcec00020a914aaa"
        );
        setItems(response.documents);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.$id}
            className="p-4 border border-gray-300 rounded-lg shadow-md"
          >
            <img
              src={`https://cloud.appwrite.io/console/project-6644a20e000c425c3ea2/storage/${item.imageUrl}`}
              alt={item.name}
              className="object-cover w-full h-48 rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <p className="mt-2 text-lg font-bold">${item.price}</p>
              <Link href={`/user/reserve/${item.$id}`}>
                <div className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700">
                  Reserve
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
