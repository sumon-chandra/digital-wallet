import type { IUserResponse } from "./user.type";

export interface Props {
	search: string;
	setSearch: (v: string) => void;
	limit: number;
	setLimit: (v: number) => void;
	users: IUserResponse[];
	isFetching: boolean;
	isError: boolean;
	meta: { page: number; limit: number; total: number; totalPage: number };
	page: number;
	setPage: (v: number) => void;

	// Send money dialog
	selectedUser: IUserResponse | null;
	amount: string;
	setAmount: (v: string) => void;
	openSendDialog: (user: IUserResponse) => void;
	closeSendDialog: () => void;
	handleConfirmTransfer: () => void;
	isTransferLoading: boolean;
}
