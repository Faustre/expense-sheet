const addTransactionButton = document.getElementById("add-expense-btn");
const transactionDialog = document.getElementById("transaction-dialog");
const transactionForm = document.getElementById("transaction-form");
const closeDialogButton = document.getElementById("close-dialog-btn");
const incomeCategory = document.getElementById("income-category");
const expenseCategory = document.getElementById("expense-category");
const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const transactionList = document.getElementById("expense-list");

const transactions = [];

addTransactionButton.addEventListener("click", () => {
	transactionDialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
	transactionDialog.close();
});

transactionForm.addEventListener("change", (event) => {
	if (event.target.name !== "transaction-type") return;

	const isIncome = event.target.value === "income";
	incomeCategory.hidden = !isIncome;
	incomeCategory.previousElementSibling.hidden = !isIncome;
	incomeCategory.disabled = !isIncome;
	expenseCategory.hidden = isIncome;
	expenseCategory.previousElementSibling.hidden = isIncome;
	expenseCategory.disabled = isIncome;
});

transactionForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(transactionForm);
	const type = formData.get("transaction-type");
	const amount = Number(formData.get("amount"));
	const category = formData.get(type === "income" ? "income-category" : "expense-category");

	transactions.push({ type, amount, category });
	renderTransactions();
	transactionForm.reset();
	incomeCategory.hidden = false;
	incomeCategory.previousElementSibling.hidden = false;
	incomeCategory.disabled = false;
	expenseCategory.hidden = true;
	expenseCategory.previousElementSibling.hidden = true;
	expenseCategory.disabled = true;
	transactionDialog.close();
});

function renderTransactions() {
	let incomeTotal = 0;
	let expenseTotal = 0;
	transactionList.replaceChildren();

	transactions.forEach((transaction) => {
		const item = document.createElement("li");
		const description = document.createElement("span");
		const amount = document.createElement("span");

		description.textContent = `${transaction.category} (${transaction.type})`;
		amount.textContent = `${transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}`;
		item.className = `transaction-item ${transaction.type}`;
		item.append(description, amount);
		transactionList.append(item);

		if (transaction.type === "income") {
			incomeTotal += transaction.amount;
		} else {
			expenseTotal += transaction.amount;
		}
	});

	incomeDisplay.textContent = incomeTotal.toFixed(2);
	expenseDisplay.textContent = expenseTotal.toFixed(2);
	balanceDisplay.textContent = (incomeTotal - expenseTotal).toFixed(2);
}