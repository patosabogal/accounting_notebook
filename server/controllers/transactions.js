let value = 0;
let idsCounter = 0;
const transactions = [];

export const getTransactions = () => {
  return transactions;
};
export const getTransactionById = (id) => {
  return transactions.find((transaction) => transaction.id === id);
};
export const addTransaction = async ({ type, amount }) => {
  if (amount <= 0) {
    throw new Error("invalid amount");
  }
  switch (type) {
    case "credit":
      value = value + amount;
      break;
    case "debit":
      if (value - amount < 0) throw new Error("invalid amount");
      value = value - amount;
      break;
    default:
      throw new Error("invalid type");
  }
  const transaction = {
    id: idsCounter.toString(),
    type,
    amount,
    effectiveDate: Date.now(),
  };
  transactions.push(transaction);
  idsCounter++;
  return transaction;
};
