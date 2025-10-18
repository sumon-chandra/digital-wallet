/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WithdrawAddUIProps {
  action: "Withdraw" | "Add" | "Transfer";
  onSubmit: (body: any) => void;
  isLoading: boolean;
}

const WithdrawAddUI = ({ action, onSubmit, isLoading }: WithdrawAddUIProps) => {
  const [amount, setAmount] = useState(100);
  const [targetId, setTargetId] = useState("");

  const handleClick = () => {
    let body: any = {};
    if (action === "Withdraw") body = { agent_id: targetId, amount };
    if (action === "Add") body = { user_id: targetId, amount };
    if (action === "Transfer") body = { receiver_id: targetId, amount };

    onSubmit(body);
  };

  return (
    <Card className="max-w-md mx-auto shadow-sm border hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle>{action} Money</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(action === "Withdraw" ||
          action === "Add" ||
          action === "Transfer") && (
          <>
            <input
              type="text"
              placeholder={
                action === "Transfer"
                  ? "Receiver ID"
                  : action === "Withdraw"
                  ? "Agent ID"
                  : "User ID"
              }
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="0"
              className="w-full border p-2 rounded"
            />

            <Button onClick={handleClick} disabled={isLoading}>
              {isLoading ? "Processing..." : action}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WithdrawAddUI;
