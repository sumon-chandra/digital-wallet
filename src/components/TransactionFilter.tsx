import { useState, useEffect } from "react";
import { Filter, XCircle, Calendar } from 'lucide-react'; 

interface TransactionFilterProps {
  onFilter: (filters: { type?: string; startDate?: string; endDate?: string }) => void;
}

const TransactionFilter = ({ onFilter }: TransactionFilterProps) => {
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // This hook ensures that filters are applied automatically whenever any value changes.
  useEffect(() => {
    onFilter({
      type: type || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  }, [type, startDate, endDate, onFilter]);

  // Function to reset all filter states.
  const handleClear = () => {
    setType("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="flex flex-col p-6 rounded-xl bg-[var(--card)] shadow-sm border border-[var(--border)] space-y-4">
      {/* Filter Heading */}
      <div className="flex items-center gap-2 text-[var(--foreground)]">
        <Filter className="w-5 h-5" />
        <span className="font-semibold">Filter Transactions</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Select input for transaction type */}
        <div className="md:col-span-1">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-[var(--input)] rounded-lg px-4 py-3 bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent outline-none transition-all duration-200 appearance-none"
          >
            <option value="">All Types</option>
            <option value="ADD">Add</option>
            <option value="WITHDRAW">Withdraw</option>
            <option value="TRANSFER">Transfer</option>
          </select>
        </div>

        {/* Date inputs container */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="w-5 h-5 text-[var(--muted-foreground)]" />
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-10 border border-[var(--input)] rounded-lg px-4 py-3 bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent outline-none transition-all duration-200"
            />
            <label className="absolute -top-2 left-2 px-1 text-xs bg-[var(--card)] text-[var(--muted-foreground)]">
              Start Date
            </label>
          </div>

          {/* End Date input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="w-5 h-5 text-[var(--muted-foreground)]" />
            </div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-10 border border-[var(--input)] rounded-lg px-4 py-3 bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent outline-none transition-all duration-200"
            />
            <label className="absolute -top-2 left-2 px-1 text-xs bg-[var(--card)] text-[var(--muted-foreground)]">
              End Date
            </label>
          </div>
        </div>
        
        {/* Clear Button */}
        <div className="md:col-span-1">
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[var(--primary)] shadow-sm hover:bg-[var(--secondary-foreground)] transition-all duration-200 text-white dark:text-black"
          >
            <XCircle className="w-5 h-5" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilter;