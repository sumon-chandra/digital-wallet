import type { User } from "./admin.type";

export interface Props {
  search: string;
  setSearch: (v: string) => void;
  limit: number;
  setLimit: (v: number) => void;
  users: User[];
  isFetching: boolean;
  isError: boolean;
  meta: { page: number; limit: number; total: number; totalPage: number };
  page: number;
  setPage: (v: number) => void;

  // Send money dialog
  selectedUser: User | null;
  amount: string;
  setAmount: (v: string) => void;
  openSendDialog: (user: User) => void;
  closeSendDialog: () => void;
  handleConfirmTransfer: () => void;
  isTransferLoading: boolean;
}
