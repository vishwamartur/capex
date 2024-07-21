// Import date-fns library for date manipulation
import {
  format,
  parseISO,
  differenceInDays,
  isBefore,
  isAfter,
} from "date-fns";

// Format a date to a readable string
export const formatDate = (date, dateFormat = "yyyy-MM-dd") => {
  try {
    return format(parseISO(date), dateFormat);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

// Calculate the difference in days between two dates
export const daysBetweenDates = (startDate, endDate) => {
  try {
    return differenceInDays(parseISO(endDate), parseISO(startDate));
  } catch (error) {
    console.error("Error calculating days between dates:", error);
    return 0;
  }
};

// Check if a date is before another date
export const isDateBefore = (dateToCheck, referenceDate) => {
  try {
    return isBefore(parseISO(dateToCheck), parseISO(referenceDate));
  } catch (error) {
    console.error("Error checking if date is before reference date:", error);
    return false;
  }
};

// Check if a date is after another date
export const isDateAfter = (dateToCheck, referenceDate) => {
  try {
    return isAfter(parseISO(dateToCheck), parseISO(referenceDate));
  } catch (error) {
    console.error("Error checking if date is after reference date:", error);
    return false;
  }
};

// Example usage
// console.log(formatDate('2024-07-21T00:00:00Z')); // Output: "2024-07-21" (default format)
// console.log(daysBetweenDates('2024-07-21T00:00:00Z', '2024-07-25T00:00:00Z')); // Output: 4
// console.log(isDateBefore('2024-07-21T00:00:00Z', '2024-07-25T00:00:00Z')); // Output: true
// console.log(isDateAfter('2024-07-21T00:00:00Z', '2024-07-20T00:00:00Z')); // Output: true
