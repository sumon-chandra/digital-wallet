import { useState } from 'react';
import { DollarSign, User, TrendingUp, Calendar, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { formatDate, formatTime } from '@/utils/dataTime';
import { motion } from 'framer-motion';

type Commission = {
  _id: string;
  agent_id: string;
  amount: number;
  createdAt: string;
};

const Toast = ({ message, show }: { message: string; show: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
    >
      <Check className="h-5 w-5 mr-2" />
      <span>{message}</span>
    </motion.div>
  );
};

const AllCommissionUi = ({ data }: { data: Commission[] }) => {
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
      <div className="flex justify-center items-center p-12">
        <div className="bg-muted p-8 rounded-xl text-center max-w-xs w-full shadow-sm">
          <DollarSign className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Commissions Yet</h3>
          <p className="text-muted-foreground">Commission records will appear here once they are generated.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {data.map((cm) => (
          <motion.div
            key={cm._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="relative border border-border rounded-xl bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg group overflow-hidden"
          >
            {/* Gradient Top Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-600 to-purple-600" />

            {/* Header */}
            <div className="flex justify-between items-center p-5 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-pink-600" />
                </div>
                <h4 className="font-semibold">Commission</h4>
              </div>
              <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium">
                Agent
              </span>
            </div>

            {/* Content */}
            <div className="p-5 pt-0 flex flex-col gap-4">
              {/* Amount */}
              <div className="p-3 rounded-lg bg-muted border border-border flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Amount</span>
                </div>
                <span className="font-semibold text-green-600">${cm.amount.toFixed(2)}</span>
              </div>

              {/* Agent ID */}
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Agent ID</span>
                </div>
                <button
                  onClick={() => handleCopyId(cm.agent_id)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors group/copy"
                  title="Copy Agent ID"
                >
                  ...{cm.agent_id.slice(-6)}
                  <div className="opacity-0 group-hover/copy:opacity-100 transition-opacity">
                    {copiedId === cm.agent_id ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </div>
                </button>
              </div>

              {/* Date & Time */}
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Date</span>
                </div>
                <div className="text-right text-sm font-medium">
                  {formatDate(cm.createdAt)} • {formatTime(cm.createdAt)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Toast message="Agent ID copied successfully!" show={showToast} />
    </>
  );
};

export default AllCommissionUi;