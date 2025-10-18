/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";
import { useUpdateUserRoleStatusMutation } from "@/redux/api/adminApi";
import UpdateUserRoleStatusUi from "./UpdateUserRoleStatusUi";

const apiFieldMap = {
  ROLE: "role",
  STATUS: "is_active",
} as const;

const UpdateUserRoleStatus: React.FC = () => {
  const { type } = useParams<{ type: "ROLE" | "STATUS" }>();
  const location = useLocation();

  const [userId, setUserId] = useState("");
  const [value, setValue] = useState("");

  const [updateUserRoleStatus, { isLoading }] =
    useUpdateUserRoleStatusMutation();

  // Determine type automatically if URL contains keywords
  const updateType: "ROLE" | "STATUS" =
    type === "ROLE"
      ? "ROLE"
      : type === "STATUS"
      ? "STATUS"
      : location.pathname.includes("update-user-role")
      ? "ROLE"
      : "STATUS";

  if (!updateType) return <div style={{ color: "var(--card-foreground)" }}>Invalid update type!</div>;

  const handleUpdate = async () => {
    if (!userId || !value) {
      return toast.error(`Please enter User ID and select a ${updateType}`);
    }

    const fieldName = apiFieldMap[updateType];

  try {
  await updateUserRoleStatus({
    id: userId,
    body: { [fieldName]: value }, // dynamic field
  }).unwrap();

  toast.success(
    `User ${updateType.toLowerCase()} updated to "${value}" successfully!`
  );
  setUserId("");
  setValue("");
} catch (err: any) {
  handleApiError(err);
}

  };

  return (
    <UpdateUserRoleStatusUi
      type={updateType}
      userId={userId}
      setUserId={setUserId}
      value={value}
      setValue={setValue}
      onSubmit={handleUpdate}
      isLoading={isLoading}
    />
  );
};

export default UpdateUserRoleStatus;
