const currentBalanceDisplay = document.querySelector("#current-balance");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const calcBtn = document.querySelector("#calculate-button");
const clearHistoryBtn = document.querySelector("#clear-history");
const transactionHistory = document.querySelector(".transactions-history");
const transactionNone = document.querySelector(".no-transactions");
const form = document.getElementsByTagName("form")[0];
const transactionInput = document.querySelector("#transaction-type");
const amountInput = document.querySelector("#amount");
const addBtn = document.querySelector("#add-button");
let balance = 100.69;
const allIncomes = [];
const allExpenses = [];

addBtn.addEventListener("click", addTransaction);
calcBtn.addEventListener("click", calculateSubTotal);
clearHistoryBtn.addEventListener("click", clearTransactionHistory);

function addTransaction(event) {
  event.preventDefault();
  if (transactionInput.value !== "" || amountInput.value !== "") {
    transactionNone.classList.add("no-transactions-style");
    const newTransaction = document.createElement("p");
    const type = document.createElement("span");
    const amt = document.createElement("span");
    type.textContent = transactionInput.value;
    amt.textContent = amountInput.value;
    const amtValue = Number(amountInput.value);
    if (amtValue > 0) {
      allIncomes.push(amtValue);
    } else if (amtValue < 0) {
      allExpenses.push(amtValue);
    }
    newTransaction.classList.add("transaction-history-style");
    newTransaction.appendChild(type);
    newTransaction.appendChild(amt);
    transactionHistory.appendChild(newTransaction);
    form.reset();
  }
}

function calculateSubTotal() {
  const totalIncome = allIncomes.reduce((acc, num) => {
    return acc + num;
  }, 0);
  income.textContent = totalIncome;
  const totalExpense = allExpenses.reduce((acc, num) => {
    return acc + num;
  }, 0);
  expense.textContent = totalExpense;
  const currentBalance = balance + totalExpense + totalIncome;
  currentBalanceDisplay.textContent = currentBalance;
}

function clearTransactionHistory() {
  const transactionHistoryList = document.querySelectorAll(".transaction-history-style");
  for (let i = 0; i < transactionHistoryList.length; i++) {
    transactionHistory.removeChild(transactionHistoryList[i]);
  }
  transactionNone.classList.remove("no-transactions-style");
  allExpenses.length = 0;
  allIncomes.length = 0;
  calculateSubTotal();
}