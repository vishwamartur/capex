import React, { createContext, useContext, useState, useEffect } from "react";
import { getItems, addItem, updateItem, deleteItem } from "../api/appwrite"; // Example API functions

// Create the ItemContext
const ItemContext = createContext();

// Create a provider component
export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getItems();
        setItems(fetchedItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = async (item) => {
    try {
      const newItem = await addItem(item);
      setItems((prevItems) => [...prevItems, newItem]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateItem = async (itemId, updatedData) => {
    try {
      const updatedItem = await updateItem(itemId, updatedData);
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? updatedItem : item))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        loading,
        error,
        handleAddItem,
        handleUpdateItem,
        handleDeleteItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

// Custom hook to use the ItemContext
export const useItems = () => {
  return useContext(ItemContext);
};
