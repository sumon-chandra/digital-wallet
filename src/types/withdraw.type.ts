// Reusable wallet type
export interface Wallet {
  _id: string;
  user: string;
  balance: number;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
}

// Withdraw response
export interface WithdrawResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    userWallet: Wallet;
    agentWallet: Wallet;
    withdrawMoney: number;
    transactionFee: number;
  };
}

// Add money response
export interface AddMoneyResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    userWallet: Wallet;
    agentWallet: Wallet;
  };
}

// Transfer response
export interface TransferResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    senderWallet: Wallet;
    receiverWallet: Wallet;
    transferMoney: number;
    transactionFee: number;
  };
}
