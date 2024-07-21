import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { databases } from "../../api/appwrite"; // Import Appwrite configurations
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";

const ItemDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the item ID from the query parameters
  const { userId } = useAuth(); // Get the current user ID from Clerk

  const [item, setItem] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          // Fetch item details from Appwrite Database
          const response = await databases.getDocument(
            "6699dcc2003667696181",
            "6699dcec00020a914aaa",
            id
          );
          setItem(response);

          // Fetch reservation details for the item
          const reservationResponse = await databases.listDocuments(
            "6699dcc2003667696181",
            "6699dd01001714130df2",
            [Query.equal("itemId", id), Query.equal("userId", userId)]
          );

          if (reservationResponse.documents.length > 0) {
            setReservation(reservationResponse.documents[0]);
          }
        } catch (error) {
          console.error("Error fetching item or reservation:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [id, userId]);

  useEffect(() => {
    if (reservation && reservation.endDate) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const endDate = new Date(reservation.endDate);
        setCountdown(formatDistanceToNow(endDate, { addSuffix: true }));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [reservation]);

  const handleReserve = async () => {
    if (!userId) {
      alert("You must be logged in to reserve an item.");
      return;
    }

    try {
      await databases.createDocument(
        "6699dcc2003667696181",
        "6699dd01001714130df2",
        id,
        {
          itemId: id,
          userId,
          startDate: new Date().toISOString(),
          endDate: new Date(
            new Date().getTime() + 24 * 60 * 60 * 1000
          ).toISOString(), // Example: Reserve for 1 day
        }
      );

      alert("Item reserved successfully!");
      setReservation({
        itemId: id,
        userId,
        startDate: new Date().toISOString(),
        endDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
      });
    } catch (error) {
      console.error("Error reserving item:", error);
      alert("Failed to reserve item.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="p-4">
      <img
        src={`https://cloud.appwrite.io/console/project-6644a20e000c425c3ea2/storage/${item.imageUrl}`}
        alt={item.name}
        className="object-cover w-full h-64 rounded-lg"
      />
      <h2 className="mt-4 text-2xl font-bold">{item.name}</h2>
      <p className="mt-2 text-gray-600">{item.description}</p>
      <p className="mt-2 text-lg font-bold">${item.price}</p>

      {reservation ? (
        <div className="p-2 mt-4 bg-yellow-100 border border-yellow-300 rounded">
          <p className="text-sm text-yellow-700">Reserved until: {countdown}</p>
        </div>
      ) : (
        <button
          onClick={handleReserve}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Reserve
        </button>
      )}
    </div>
  );
};

export default ItemDetail;
