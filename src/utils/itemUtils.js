// Utility function to validate item data
export const validateItemData = (item) => {
  const errors = [];

  if (!item.name || item.name.trim() === "") {
    errors.push("Item name is required.");
  }

  if (!item.description || item.description.trim() === "") {
    errors.push("Item description is required.");
  }

  if (!item.image || !item.image.startsWith("http")) {
    errors.push("A valid item image URL is required.");
  }

  if (item.price <= 0) {
    errors.push("Item price must be greater than zero.");
  }

  return errors.length === 0 ? null : errors;
};

// Utility function to format item data for display
export const formatItemForDisplay = (item) => {
  return {
    ...item,
    formattedPrice: `$${item.price.toFixed(2)}`,
    shortDescription:
      item.description.length > 100
        ? `${item.description.substring(0, 100)}...`
        : item.description,
  };
};

// Utility function to calculate the remaining time for reserved items
export const calculateRemainingTime = (reservationEndDate) => {
  const now = new Date();
  const endDate = new Date(reservationEndDate);

  const diffInMilliseconds = endDate - now;
  const diffInSeconds = Math.max(diffInMilliseconds / 1000, 0); // Ensure non-negative

  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = Math.floor(diffInSeconds % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
  };
};

// Utility function to check if an item is available for reservation
export const isItemAvailable = (item) => {
  const now = new Date();
  const reservedUntil = new Date(item.reservedUntil);

  return !item.isReserved || reservedUntil < now;
};

// Example usage
// const item = {
//   name: 'Laptop',
//   description: 'A powerful gaming laptop.',
//   image: 'https://example.com/laptop.jpg',
//   price: 1200,
//   reservedUntil: '2024-08-01T00:00:00Z',
//   isReserved: true
// };

// console.log(validateItemData(item)); // Output: null or array of errors
// console.log(formatItemForDisplay(item)); // Output: formatted item object
// console.log(calculateRemainingTime(item.reservedUntil)); // Output: remaining time object
// console.log(isItemAvailable(item)); // Output: true or false
