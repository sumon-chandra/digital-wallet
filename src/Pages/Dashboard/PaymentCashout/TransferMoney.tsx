/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import {
  useCreateTransferMutation,
  useLazyGetAllUserQuery,
} from "@/redux/api/userApi";
import TransferMoneyUi from "./TransferMoneyUi";
import type { User} from "@/types/admin.type";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "react-toastify";

export default function TransferMoney() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<string>("");

  const [triggerGetUsers, { data: usersRes, isFetching, isError }] =
    useLazyGetAllUserQuery();
  const [createTransfer, { isLoading: isTransferLoading }] =
    useCreateTransferMutation();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  // search helper
  const looksLikePhone = (s: string) => /^\+?\d[\d\s-]*$/.test(s ?? "");
  const cleanPhone = (s: string) => s.replace(/[\s-]/g, "");

  const queryParams = useMemo(() => {
    const q: Record<string, any> = { page, limit };
    if (debouncedSearch) {
      if (debouncedSearch.includes("@")) q.email = debouncedSearch;
      else if (looksLikePhone(debouncedSearch))
        q.phone = cleanPhone(debouncedSearch);
      else q.searchTerm = debouncedSearch;
    }
    return q;
  }, [debouncedSearch, page, limit]);

  useEffect(() => {
    triggerGetUsers(queryParams);
  }, [triggerGetUsers, queryParams]);

  const users: User[] = usersRes?.data ?? [];
  const meta = usersRes?.meta ?? { page, limit, total: 0, totalPage: 1 };

  const openSendDialog = (user: User) => {
    setSelectedUser(user);
    setAmount("");
  };
  const closeSendDialog = () => setSelectedUser(null);

  const handleConfirmTransfer = async () => {
    const amt = Number(amount);
    if (!selectedUser) return;
    if (!amt || isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid amount")
      return;
    }
    try {
      await createTransfer({
        receiver_id: selectedUser._id,
        amount: amt,
      }).unwrap();
      toast.success("Money sent successfully")
      closeSendDialog();
    } catch (e: any) {
      handleApiError(e)
    }
  };

  return (
    <TransferMoneyUi
      search={search}
      setSearch={setSearch}
      limit={limit}
      setLimit={setLimit}
      users={users}
      isFetching={isFetching}
      isError={isError}
      meta={meta}
      page={page}
      setPage={setPage}
      selectedUser={selectedUser}
      amount={amount}
      setAmount={setAmount}
      openSendDialog={openSendDialog}
      closeSendDialog={closeSendDialog}
      handleConfirmTransfer={handleConfirmTransfer}
      isTransferLoading={isTransferLoading}
    />
  );
}
