import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  CheckCircle2,
  Copy,
  // User,
  Calendar,
} from "lucide-react";
import type { TransactionUiProps } from "@/types/admin.type";
import { Button } from "@/components/ui/button";
import { useState, type JSX } from "react";
import { formatDate, formatTime, getRelativeTime } from "@/utils/dataTime";
import { copyToClipboard } from "@/utils/copyToClipboard";

const statusColors: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-700 border-green-300",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  FAILED: "bg-red-100 text-red-700 border-red-300",
};

const typeIcons: Record<string, JSX.Element> = {
  TRANSFER: <ArrowUpCircle className="h-5 w-5 text-[#E2136E]" />,
  WITHDRAW: <ArrowUpCircle className="h-5 w-5 text-[#E2136E]" />,
  DEPOSIT: <ArrowDownCircle className="h-5 w-5 text-teal-600" />,
};

const typeLabels: Record<string, string> = {
  TRANSFER: "Money Transfer",
  WITHDRAW: "Withdrawal",
  DEPOSIT: "Deposit",
};

function TransactionUi({ data }: TransactionUiProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = async (id: string) => {
    const success = await copyToClipboard(id);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((tx) => (
        <Card
          key={tx._id}
          className="shadow-sm border hover:shadow-md transition-all hover:scale-[1.02] group overflow-hidden"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
            <div className="flex items-center gap-2">
              {typeIcons[tx.type] || (
                <ArrowDownCircle className="h-5 w-5 text-gray-500" />
              )}
              <CardTitle className="text-lg font-semibold dark:text-gray-100 text-gray-700">
                {typeLabels[tx.type] || tx.type}
              </CardTitle>
            </div>
            <Badge
              variant="default"
              className={
                statusColors[tx.status] ||
                "bg-gray-100 dark:text-gray-100 text-gray-700 border-gray-200"
              }
            >
              {tx.status}
            </Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3 text-sm dark:text-gray-100 text-gray-700">
              {/* Amount */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  Amount
                </span>
                <span className="font-semibold text-lg dark:text-gray-100 text-gray-900">
                  ৳{tx.amount.toLocaleString()}
                </span>
              </div>

              {tx.transaction_fee > 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-teal-500" />
                      Fee
                    </span>
                    <span className="dark:text-gray-100 text-gray-700">
                      ৳{(tx.transaction_fee).toLocaleString()}
                    </span>
                  </div>
                  {/* Total */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="flex items-center gap-2 font-medium">
                      Total
                    </span>
                    <span className="font-bold text-lg dark:text-gray-100 text-gray-900">
                      ৳{(tx.transaction_fee + tx.amount).toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              {/* Date and Time */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Date
                </span>
                <div className="text-right">
                  <div className="dark:text-gray-100 text-gray-700">
                    {formatDate(tx.createdAt)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTime(tx.createdAt)}
                  </div>
                </div>
              </div>

              {/* Relative Time */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-gray-500" />
                  Relative
                </span>
                <span className="text-sm text-muted-foreground">
                  {getRelativeTime(tx.createdAt)}
                </span>
              </div>

              {/* Transaction ID */}
              {tx._id && (
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    Transaction ID
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => handleCopyId(tx._id)}
                  >
                    {tx._id.substring(0, 6)}...
                    <Copy className="h-3 w-3 ml-1" />
                    {copiedId === tx._id && (
                      <span className="ml-1 text-xs text-green-600">
                        Copied!
                      </span>
                    )}
                  </Button>
                </div>
              )}

              {/* Sender/Receiver Info if available */}
              {/* {(tx.sender || tx.receiver) && (
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Parties</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {tx.sender && (
                      <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                        <User className="h-3 w-3" />
                        <span className="truncate">From: {tx.sender}</span>
                      </div>
                    )}
                    {tx.receiver && (
                      <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                        <User className="h-3 w-3" />
                        <span className="truncate">To: {tx.receiver}</span>
                      </div>
                    )}
                  </div>
                </div>
              )} */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TransactionUi;
