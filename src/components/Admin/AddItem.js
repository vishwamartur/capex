import { useState } from "react";
import { databases, storage } from "../../api/appwrite"; // Import Appwrite configurations
import { useAuth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { userId } = useAuth(); // Assuming user ID is needed for Appwrite operations

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !image) {
      alert("All fields are required.");
      return;
    }

    setUploading(true);

    try {
      // Upload image to Appwrite Storage
      const imageId = uuidv4();
      const uploadResponse = await storage.createFile(
        "6699dd150024819b80a3",
        imageId,
        image
      );

      // Add item data to Appwrite Database
      await databases.createDocument(
        "6699dcc2003667696181",
        "6699dcec00020a914aaa",
        uuidv4(),
        {
          name,
          description,
          price,
          imageUrl: uploadResponse.$id, // Store image ID or URL
          userId, // Store user ID if needed
        }
      );

      alert("Item added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Add New Item</h2>
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
          {uploading ? "Uploading..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
