// Format date (e.g., Jan 20, 2025)
function formatDate(dateString: string): string {
	const date = new Date(dateString);

	// Options for date parts
	const day = date.getDate().toString().padStart(2, "0");
	const month = date.toLocaleString("en-GB", { month: "long" });
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
}

// Example usage:
// console.log(formatDate(new Date("2025-08-31T14:52:11.519+00:00")));
// Output: "31 August 2025, 02:52 PM"

// Format time (e.g., 08:45 PM)
const formatTime = (dateString: string): string => {
	const date = new Date(dateString);
	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12; // Convert to 12-hour clock
	const formattedHours = hours.toString().padStart(2, "0");

	return `${formattedHours}:${minutes} ${ampm}`;
};

// Relative time (e.g., "2 hours ago")
const getRelativeTime = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return "Just now";
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;

	return formatDate(dateString);
};

export { formatDate, formatTime, getRelativeTime };
