export const getLocalToken = (key) => {
    if (typeof window !== "undefined") {
        const storageItem = window.localStorage.getItem(key);
        if (storageItem) return (storageItem);
        return null;
      }
      return null;
}
export const formatString = (string, number) => {
  if (string.length > number - 2) {
    return string.substring(0, number).concat("...");
  } else return string;
};

export const formatAsNgnMoney = (value) => {
  if (!value) return "";
  return `₦${value
    .toLocaleString("en-US")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
export const formatDateTime = (dateTimeStr) => {
  const dateObj = new Date(dateTimeStr);

  // Get date components
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Get the day of the week in short form (e.g., Mon, Tue)
  const shortDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = shortDaysOfWeek[dateObj.getDay()];

  // Get time components in 12-hour format
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set it to 12

  // Return the formatted date, day, and time in 12-hour format
  return `${year}-${month}-${day} (${dayOfWeek}) ${hours}:${minutes}:${seconds} ${ampm}`;
};



