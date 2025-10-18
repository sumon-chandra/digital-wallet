/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

export const handleApiError = (err: any) => {
  console.error("API Error:", err);

  let messages: string[] = [];

  if (err?.data?.err?.issues) {
    // Zod validation errors
    messages = err.data.err.issues.map(
      (issue: { message: string }) => issue.message
    );
  } else if (err?.data?.message) {
    // Single error message
    messages = [err.data.message];
  } else {
    // Generic fallback
    messages = ["Something went wrong ❌"];
  }

  // Show messages in one toast (multi-line)
  toast.error(messages.join("\n"));
  
  // Or if you prefer separate toasts:
  // messages.forEach(msg => toast.error(msg));
};
