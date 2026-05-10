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
  {
    id: generateId(),
    type: "investment",
    title: "Altın Alımı",
    amount: 5000,
    note: "Aylık yatırım",
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

const addMonthsToDate = (date, monthCount) => {
  const [year, month, day] = date.split("-").map(Number);

  const targetDate = new Date(year, month - 1 + monthCount, 1);
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();

  const lastDayOfTargetMonth = new Date(
    targetYear,
    targetMonth + 1,
    0,
  ).getDate();

  const safeDay = Math.min(day, lastDayOfTargetMonth);

  const result = new Date(targetYear, targetMonth, safeDay);

  const formattedYear = result.getFullYear();
  const formattedMonth = String(result.getMonth() + 1).padStart(2, "0");
  const formattedDay = String(result.getDate()).padStart(2, "0");

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
};

const createInstallmentTransactions = (payload) => {
  const installmentCount = Number(payload.installmentCount || 1);
  const totalAmount = Number(payload.amount);

  if (payload.type !== "expense" || installmentCount <= 1) {
    return [
      {
        id: generateId(),
        type: payload.type,
        title: payload.title.trim(),
        amount: totalAmount,
        note: payload.note?.trim() || "",
        date: payload.date || getToday(),
      },
    ];
  }

  const installmentGroupId = generateId();
  const startDate = payload.installmentStartDate || payload.date || getToday();

  const baseAmount = Math.floor((totalAmount / installmentCount) * 100) / 100;
  const calculatedTotal = baseAmount * installmentCount;
  const remainingAmount = Number((totalAmount - calculatedTotal).toFixed(2));

  return Array.from({ length: installmentCount }, (_, index) => {
    const isLastInstallment = index === installmentCount - 1;

    return {
      id: generateId(),
      type: "expense",
      title: payload.title.trim(),
      amount: isLastInstallment
        ? Number((baseAmount + remainingAmount).toFixed(2))
        : baseAmount,
      note: payload.note?.trim() || "",
      date: addMonthsToDate(startDate, index),
      installmentGroupId,
      installmentIndex: index + 1,
      installmentCount,
      installmentStartDate: startDate,
      installmentTotalAmount: totalAmount,
    };
  });
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
    const newTransactions = createInstallmentTransactions(payload);

    setTransactions((prev) => [...newTransactions, ...prev]);
    setSelectedMonth(getMonthKey(newTransactions[0].date));
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
      installmentGroupId: item.installmentGroupId || null,
      installmentIndex: item.installmentIndex || null,
      installmentCount: item.installmentCount || null,
      installmentStartDate: item.installmentStartDate || null,
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
    const currentMonthKey = getMonthKey(getToday());

    const currentMonthTransactions = transactions.filter(
      (item) => getMonthKey(item.date) === currentMonthKey,
    );

    const totalIncome = currentMonthTransactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = currentMonthTransactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalInvestment = currentMonthTransactions
      .filter((item) => item.type === "investment")
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      totalIncome,
      totalExpense,
      totalInvestment,
      balance: totalIncome - totalExpense - totalInvestment,
      totalCount: currentMonthTransactions.length,
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
          investment: 0,
          balance: 0,
          transactions: [],
        };
      }

      if (item.type === "income") {
        acc[monthKey].income += item.amount;
      } else if (item.type === "expense") {
        acc[monthKey].expense += item.amount;
      } else if (item.type === "investment") {
        acc[monthKey].investment += item.amount;
      }

      acc[monthKey].transactions.push(item);

      acc[monthKey].balance =
        acc[monthKey].income -
        acc[monthKey].expense -
        acc[monthKey].investment;

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