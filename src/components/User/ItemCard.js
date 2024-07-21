import { useState, useEffect } from "react";
import { databases } from "../../api/appwrite"; // Import Appwrite configurations
import { formatDistanceToNow } from "date-fns"; // For countdown
import { useAuth } from "@clerk/nextjs";

const ItemCard = ({ item }) => {
  const [reservation, setReservation] = useState(null);
  const [countdown, setCountdown] = useState("");
  const { userId } = useAuth(); // Get the current user ID from Clerk

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        // Fetch reservation details from Appwrite Database
        const response = await databases.listDocuments(
          "6699dcc2003667696181",
          "6699dd01001714130df2",
          [Query.equal("itemId", item.$id), Query.equal("userId", userId)]
        );

        if (response.documents.length > 0) {
          setReservation(response.documents[0]);
        }
      } catch (error) {
        console.error("Error fetching reservation:", error);
      }
    };

    fetchReservation();
  }, [item.$id, userId]);

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
      // Add reservation details to Appwrite Database
      await databases.createDocument(
        "6699dcc2003667696181",
        "6699dd01001714130df2",
        item.$id,
        {
          itemId: item.$id,
          userId,
          startDate: new Date().toISOString(),
          endDate: new Date(
            new Date().getTime() + 24 * 60 * 60 * 1000
          ).toISOString(), // Example: Reserve for 1 day
        }
      );

      alert("Item reserved successfully!");
      setReservation({
        itemId: item.$id,
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

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <img
        src={`https://cloud.appwrite.io/console/project-6644a20e000c425c3ea2/storage/${item.imageUrl}`}
        alt={item.name}
        className="object-cover w-full h-48 rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <p className="mt-2 text-gray-600">{item.description}</p>
        <p className="mt-2 text-lg font-bold">${item.price}</p>

        {reservation ? (
          <div className="p-2 mt-4 bg-yellow-100 border border-yellow-300 rounded">
            <p className="text-sm text-yellow-700">
              Reserved until: {countdown}
            </p>
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
    </div>
  );
};

export default ItemCard;
