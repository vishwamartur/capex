import { useState, useEffect } from "react";
import { databases } from "../../api/appwrite"; // Import Appwrite configurations
import Link from "next/link";
import { useRouter } from "next/router";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleDelete = async (itemId) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await databases.deleteDocument(
          "6699dcc2003667696181",
          "6699dcec00020a914aaa",
          itemId
        );
        // Remove the deleted item from the state
        setItems(items.filter((item) => item.$id !== itemId));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Item List</h2>
      <div className="mb-4">
        <Link href="/admin/add-item">
          <div className="text-blue-500 underline">Add New Item</div>
        </Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Description
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.$id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {item.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.description}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                ${item.price}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <Link href={`/admin/edit-item?id=${item.$id}`}>
                  <div className="mr-4 text-blue-500 hover:underline">Edit</div>
                </Link>
                <button
                  onClick={() => handleDelete(item.$id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
