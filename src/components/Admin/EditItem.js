import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { databases, storage } from "../../api/appwrite"; // Import Appwrite configurations
import { useAuth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const EditItem = () => {
  const router = useRouter();
  const { itemId } = router.query; // Get the item ID from the query parameters
  const { userId } = useAuth(); // Get the user ID from Clerk

  const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (itemId) {
      // Fetch item details from Appwrite Database
      const fetchItem = async () => {
        try {
          const response = await databases.getDocument(
            "6699dcc2003667696181",
            "6699dcec00020a914aaa",
            itemId
          );
          setItem(response);
          setName(response.name);
          setDescription(response.description);
          setPrice(response.price);
          // image is fetched but not used in this example; adjust as needed
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      };
      fetchItem();
    }
  }, [itemId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("All fields are required.");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = item?.imageUrl; // Keep existing image URL if no new image is uploaded

      if (image) {
        // Upload new image to Appwrite Storage
        const newImageId = uuidv4();
        const uploadResponse = await storage.createFile(
          "6699dd150024819b80a3",
          newImageId,
          image
        );
        imageUrl = uploadResponse.$id; // Update with new image URL or ID
      }

      // Update item details in Appwrite Database
      await databases.updateDocument(
        "6699dcc2003667696181",
        "6699dcec00020a914aaa",
        itemId,
        {
          name,
          description,
          price,
          imageUrl, // Update image URL if a new image was uploaded
        }
      );

      alert("Item updated successfully!");
      router.push("/admin"); // Redirect to admin dashboard or another page
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    } finally {
      setUploading(false);
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded"
            rows="4"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="block w-full mt-1"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className={`mt-4 px-4 py-2 text-white bg-blue-600 rounded ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Updating..." : "Update Item"}
        </button>
      </form>
    </div>
  );
};

export default EditItem;
