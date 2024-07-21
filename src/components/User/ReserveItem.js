import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { databases } from "../../api/appwrite"; // Import Appwrite configurations
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";

const ReserveItem = () => {
  const router = useRouter();
  const { id } = router.query; // Get the item ID from the query parameters
  const { userId } = useAuth(); // Get the current user ID from Clerk

  const [item, setItem] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [existingReservation, setExistingReservation] = useState(null);
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

          // Fetch existing reservation details for the item
          const reservationResponse = await databases.listDocuments(
            "6699dcc2003667696181",
            "6699dd01001714130df2",
            [Query.equal("itemId", id), Query.equal("userId", userId)]
          );

          if (reservationResponse.documents.length > 0) {
            setExistingReservation(reservationResponse.documents[0]);
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
    if (existingReservation && existingReservation.endDate) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const endDate = new Date(existingReservation.endDate);
        setCountdown(formatDistanceToNow(endDate, { addSuffix: true }));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [existingReservation]);

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
        id,
        {
          itemId: id,
          userId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }
      );

      alert("Item reserved successfully!");
      setExistingReservation({
        itemId: id,
        userId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
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
      <h1 className="mb-4 text-2xl font-bold">Reserve Item</h1>

      <div className="mb-4">
        <img
          src={`https://cloud.appwrite.io/console/project-6644a20e000c425c3ea2/storage/${item.imageUrl}`}
          alt={item.name}
          className="object-cover w-full h-64 rounded-lg"
        />
        <h2 className="mt-2 text-xl font-semibold">{item.name}</h2>
        <p className="mt-1 text-gray-600">{item.description}</p>
        <p className="mt-1 text-lg font-bold">${item.price}</p>
      </div>

      {existingReservation ? (
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
          <p className="text-sm text-yellow-700">
            Already reserved until: {countdown}
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleReserve();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full p-2 border border-gray-300 rounded"
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div>
            <label className="block text-gray-700">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="w-full p-2 border border-gray-300 rounded"
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Reserve
          </button>
        </form>
      )}
    </div>
  );
};

export default ReserveItem;
