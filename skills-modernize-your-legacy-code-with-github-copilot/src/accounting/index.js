#!/usr/bin/env node
const readline = require("readline");

const dataModule = {
  storageBalance: 1000.0,
  read() {
    return this.storageBalance;
  },
  write(balance) {
    this.storageBalance = balance;
  },
};

const operationsModule = {
  totalBalance() {
    return dataModule.read();
  },

  credit(amount) {
    const currentBalance = dataModule.read();
    const updatedBalance = currentBalance + amount;
    dataModule.write(updatedBalance);
    return updatedBalance;
  },

  debit(amount) {
    const currentBalance = dataModule.read();
    if (currentBalance >= amount) {
      const updatedBalance = currentBalance - amount;
      dataModule.write(updatedBalance);
      return { success: true, balance: updatedBalance };
    }
    return { success: false, balance: currentBalance };
  },
};

let rl;

function formatAmount(value) {
  return Number(value).toFixed(2);
}

function parseAmount(input) {
  const normalized = input.trim();
  if (!/^[0-9]{1,6}(?:\.[0-9]{1,2})?$/.test(normalized)) {
    return null;
  }

  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount < 0 || amount > 999999.99) {
    return null;
  }

  return amount;
}

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function showMenu() {
  console.log("--------------------------------");
  console.log("Account Management System");
  console.log("1. View Balance");
  console.log("2. Credit Account");
  console.log("3. Debit Account");
  console.log("4. Exit");
  console.log("--------------------------------");
}

async function handleViewBalance() {
  const balance = operationsModule.totalBalance();
  console.log(`Current balance: ${formatAmount(balance)}`);
}

async function handleCredit() {
  const input = await prompt("Enter credit amount: ");
  const amount = parseAmount(input);

  if (amount === null) {
    console.log(
      "Invalid amount. Please enter a positive numeric value up to 999999.99.",
    );
    return;
  }

  const updatedBalance = operationsModule.credit(amount);
  console.log(`Amount credited. New balance: ${formatAmount(updatedBalance)}`);
}

async function handleDebit() {
  const input = await prompt("Enter debit amount: ");
  const amount = parseAmount(input);

  if (amount === null) {
    console.log(
      "Invalid amount. Please enter a positive numeric value up to 999999.99.",
    );
    return;
  }

  const result = operationsModule.debit(amount);
  if (result.success) {
    console.log(`Amount debited. New balance: ${formatAmount(result.balance)}`);
  } else {
    console.log("Insufficient funds for this debit.");
  }
}

async function runApp() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    await showMenu();
    const choice = (await prompt("Enter your choice (1-4): ")).trim();

    switch (choice) {
      case "1":
        await handleViewBalance();
        break;
      case "2":
        await handleCredit();
        break;
      case "3":
        await handleDebit();
        break;
      case "4":
        console.log("Exiting the program. Goodbye!");
        rl.close();
        return;
      default:
        console.log("Invalid choice, please select 1-4.");
    }
  }
}

if (require.main === module) {
  runApp().catch((error) => {
    console.error("An unexpected error occurred:", error);
    rl.close();
    process.exit(1);
  });
}

module.exports = {
  dataModule,
  operationsModule,
  parseAmount,
  formatAmount,
  runApp,
};
