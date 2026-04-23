import { useMemo, useState } from "react";
import { STORAGE_KEYS } from "../constants/storage";
import { useLocalStorage } from "./useLocalStorage";
import { generateId, getToday } from "../utils/helpers";
import { validateBackupFile } from "../utils/backup";

const sampleTransactions = [
  {
    id: generateId(),
    type: "income",
    title: "Maaş",
    amount: 25000,
    note: "Aylık maaş ödemesi",
    date: getToday(),
  },
  {
    id: generateId(),
    type: "expense",
    title: "Market",
    amount: 1400,
    note: "Haftalık alışveriş",
    date: getToday(),
  },
];

const getMonthKey = (date) => {
  const current = new Date(date);
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const getMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return new Intl.DateTimeFormat("tr-TR", {
    month: "long",
    year: "numeric",
  }).format(date);
};

export const useFinanceManager = () => {
  const [transactions, setTransactions] = useLocalStorage(
    STORAGE_KEYS.TRANSACTIONS,
    sampleTransactions,
  );

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(() =>
    getMonthKey(getToday()),
  );

  const addTransaction = (payload) => {
    const newTransaction = {
      id: generateId(),
      type: payload.type,
      title: payload.title.trim(),
      amount: Number(payload.amount),
      note: payload.note?.trim() || "",
      date: payload.date || getToday(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setSelectedMonth(getMonthKey(newTransaction.date));
  };

  const updateTransaction = (payload) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              type: payload.type,
              title: payload.title.trim(),
              amount: Number(payload.amount),
              note: payload.note?.trim() || "",
              date: payload.date || getToday(),
            }
          : item,
      ),
    );

    setSelectedMonth(getMonthKey(payload.date));
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const importTransactions = (backupData) => {
    const result = validateBackupFile(backupData);

    if (!result.valid) {
      return result;
    }

    const normalizedTransactions = backupData.transactions.map((item) => ({
      id: item.id || generateId(),
      type: item.type,
      title: item.title || "",
      amount: Number(item.amount || 0),
      note: item.note || "",
      date: item.date || getToday(),
    }));

    setTransactions(normalizedTransactions);

    if (normalizedTransactions.length > 0) {
      setSelectedMonth(getMonthKey(normalizedTransactions[0].date));
    }

    return {
      valid: true,
      message: "Yedek başarıyla geri yüklendi.",
    };
  };

  const totals = useMemo(() => {
    const totalIncome = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      totalCount: transactions.length,
    };
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const grouped = transactions.reduce((acc, item) => {
      const monthKey = getMonthKey(item.date);

      if (!acc[monthKey]) {
        acc[monthKey] = {
          monthKey,
          monthLabel: getMonthLabel(monthKey),
          income: 0,
          expense: 0,
          balance: 0,
          transactions: [],
        };
      }

      if (item.type === "income") {
        acc[monthKey].income += item.amount;
      } else {
        acc[monthKey].expense += item.amount;
      }

      acc[monthKey].transactions.push(item);
      acc[monthKey].balance = acc[monthKey].income - acc[monthKey].expense;

      return acc;
    }, {});

    return Object.values(grouped)
      .map((month) => ({
        ...month,
        transactions: [...month.transactions].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        ),
      }))
      .sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  }, [transactions]);

  const selectedMonthData = useMemo(() => {
    if (!monthlyData.length) return null;
    return (
      monthlyData.find((item) => item.monthKey === selectedMonth) ||
      monthlyData[0]
    );
  }, [monthlyData, selectedMonth]);

  return {
    transactions,
    totals,
    selectedTransaction,
    setSelectedTransaction,
    editingTransaction,
    setEditingTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    clearTransactions,
    importTransactions,
    monthlyData,
    selectedMonth,
    setSelectedMonth,
    selectedMonthData,
  };
};
