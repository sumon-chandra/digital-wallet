/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Clock, User, Calendar, RefreshCw, TrendingUp, Copy, Check } from "lucide-react";
import { useState, type JSX } from "react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { formatDate, formatTime, getRelativeTime } from "@/utils/dataTime";

interface WalletData {
  _id: string;
  balance: number;
  user: string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
}

interface WalletUiProps {
  data: WalletData[];
}

const Toast = ({ message, show }: { message: string; show: boolean }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-green-500 text-white dark:bg-green-700 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <Check className="h-5 w-5 mr-2" />
      <span>{message}</span>
    </div>
  );
};

const statusColors: Record<string, { bg: string; text: string; border: string; icon: JSX.Element }> = {
  ACTIVE: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    icon: <TrendingUp className="h-3 w-3 mr-1" />,
  },
  INACTIVE: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
    icon: <RefreshCw className="h-3 w-3 mr-1" />,
  },
  DEFAULT: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200",
    icon: <RefreshCw className="h-3 w-3 mr-1" />,
  },
};

const WalletUi = ({ data }: WalletUiProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleCopyId = async (id: string) => {
    const success = await copyToClipboard(id);
    if (success) {
      setCopiedId(id);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 dark:text-gray-400">
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl text-center max-w-md shadow-lg">
          <Wallet className="h-16 w-16 text-pink-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No Wallets Found</h3>
          <p className="text-gray-500 dark:text-gray-400">Wallet data will appear here once available.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {data.map((wallet) => {
          const statusConfig = statusColors[wallet.status] || statusColors.DEFAULT;

          return (
            <Card
              key={wallet._id}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative dark:border-gray-700"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-600"></div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-5 px-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/40 rounded-lg">
                    <Wallet className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Wallet
                  </CardTitle>
                </div>
                
                <Badge
                  variant="secondary"
                  className={`flex items-center text-xs uppercase px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                >
                  {statusConfig.icon}
                  {wallet.status}
                </Badge>
              </CardHeader>

              <CardContent className="pt-6 px-5 pb-5">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/50 dark:to-pink-900 p-4 rounded-xl border border-pink-100 dark:border-pink-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-pink-700 dark:text-pink-200 font-medium">
                        <Wallet className="h-4 w-4" />
                        Balance
                      </div>
                      <span className="text-2xl font-bold text-pink-700 dark:text-pink-200">
                        ${wallet.balance.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-pink-50/50 dark:group-hover:bg-pink-900/50 transition-colors">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4 text-pink-500 dark:text-pink-400" />
                      <span className="text-sm font-medium">User ID</span>
                    </div>
                    <button
                      onClick={() => handleCopyId(wallet.user)}
                      className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors group/copy"
                      title="Copy User ID"
                    >
                      <span className="truncate max-w-[80px] font-mono">{wallet.user.slice(-6)}</span>
                      {copiedId === wallet.user ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-pink-50/50 dark:group-hover:bg-pink-900/50 transition-colors">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                        <Calendar className="h-4 w-4 text-pink-500 dark:text-pink-400" />
                        <span className="text-xs font-medium">Created</span>
                      </div>
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{formatDate(wallet.createdAt)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(wallet.createdAt)}</span>
                    </div>

                    <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-pink-50/50 dark:group-hover:bg-pink-900/50 transition-colors">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                        <Clock className="h-4 w-4 text-pink-500 dark:text-pink-400" />
                        <span className="text-xs font-medium">Updated</span>
                      </div>
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{formatDate(wallet.updatedAt)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{getRelativeTime(wallet.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/0 to-pink-600/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"></div>
            </Card>
          );
        })}
      </div>
      <Toast message="User ID copied successfully!" show={showToast} />
    </>
  );
};

export default WalletUi;
