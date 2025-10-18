import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import type { RecentActivitiesUiProps } from "@/types/overview.type";

const RecentActivitiesUi: React.FC<RecentActivitiesUiProps> = ({
  activities,
  loading,
  role,
}) => {
  return (
    <Card className="p-6 rounded-2xl shadow-md">
      <CardTitle className="text-lg font-semibold mb-4">
        {role === "ADMIN"
          ? "All Recent Transactions"
          : role === "USER"
          ? "Recent Transactions"
          : role === "AGENT"
          ? "Recent Commissions"
          : ""}
      </CardTitle>
      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : activities.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No recent activities
        </p>
      ) : (
        <ul className="space-y-3">
          {activities.map((txn) => (
            <li
              key={txn._id}
              className="flex justify-between activities-center p-3 rounded-lg bg-muted shadow-sm"
            >
              <div>
                {role !== "AGENT" && <p className="font-medium">{txn.type}</p>}

                <p className="text-sm text-muted-foreground">
                  {new Date(txn.createdAt).toLocaleString()}
                </p>
              </div>
              <div
                className={`font-bold ${
                  txn.amount >= 0 ? "text-primary" : "text-destructive"
                }`}
              >
                ${txn.amount.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default RecentActivitiesUi;
