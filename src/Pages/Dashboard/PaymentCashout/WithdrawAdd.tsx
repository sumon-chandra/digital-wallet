/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import WithdrawAddUI from "./WithdrawAddUI";
import { useCreateAddMoneyMutation, useCreateWithdrawMoneyMutation } from "@/redux/api/agent.api";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "sonner";

const WithdrawAdd = () => {
	const location = useLocation();

	const isWithdraw = location.pathname.includes("wallet/withdraw");
	const isAddMoney = location.pathname.includes("wallet/add") || location.pathname.includes("add-money-wallet");

	const [createWithdraw, { isLoading: isWithdrawLoading }] = useCreateWithdrawMoneyMutation();
	const [createAddMoney, { isLoading: isAddMoneyLoading }] = useCreateAddMoneyMutation();

	const title = isWithdraw ? "Withdraw" : isAddMoney ? "Add" : "Transfer";

	const handleSubmit = async (body: { userId: string; amount: number }) => {
		try {
			const addMoneyPayload = {
				cashInUserId: body.userId,
				amount: body.amount,
			};
			const withdrawalPayload = {
				cashOutUserId: body.userId,
				amount: body.amount,
			};

			if (isAddMoney) {
				await createAddMoney(addMoneyPayload).unwrap();
				toast.success("Successfully money added.");
			}

			if (isWithdraw) {
				await createWithdraw(withdrawalPayload).unwrap();
				toast.success("Successfully money added.");
			}
		} catch (err: any) {
			handleApiError(err);
		}
	};

	return (
		<>
			<h2 className="text-2xl font-semibold mb-6">{title} Money</h2>
			<WithdrawAddUI action={title} onSubmit={handleSubmit} isLoading={isWithdraw ? isWithdrawLoading : isAddMoneyLoading} />
		</>
	);
};

export default WithdrawAdd;
