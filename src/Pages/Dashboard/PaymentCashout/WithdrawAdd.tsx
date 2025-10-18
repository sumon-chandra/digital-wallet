/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import WithdrawAddUI from "./WithdrawAddUI";
import {
  useCreateWithdrawMutation,
} from "@/redux/api/userApi";
import { useCreateAddMoneyMutation } from "@/redux/api/agent.api";
import { handleApiError } from "@/utils/handleApiError";
import { handleTransactionToast } from "@/utils/handleTransactionToast";

const WithdrawAdd = () => {
  const location = useLocation();

  const isWithdraw = location.pathname.includes("wallet/withdraw");
  const isAddMoney = location.pathname.includes("wallet/add") || location.pathname.includes("add-money-wallet");

  const [createWithdraw, { isLoading: isWithdrawLoading }] =
    useCreateWithdrawMutation();
  const [createAddMoney, { isLoading: isAddMoneyLoading }] =
    useCreateAddMoneyMutation();

  const title = isWithdraw ? "Withdraw" : isAddMoney ? "Add" : "Transfer";

  // Function to call the correct mutation
  const handleSubmit = async (body: any) => {
    try {
      let response;
      if (isWithdraw) response = await createWithdraw(body).unwrap();
      if (isAddMoney) response = await createAddMoney(body).unwrap();

      handleTransactionToast(title as "Withdraw" | "Add", {
        data: response?.data,
        body,
      });
    } catch (err: any) {
      handleApiError(err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">{title} Money</h2>
      <WithdrawAddUI
        action={title}
        onSubmit={handleSubmit}
        isLoading={isWithdraw ? isWithdrawLoading : isAddMoneyLoading}
      />
    </>
  );
};

export default WithdrawAdd;
