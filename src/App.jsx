import { useMemo, useState } from "react";
import AppShell from "./components/layout/AppShell";
import Topbar from "./components/header/Topbar";
import BackupPanel from "./components/backup/BackupPanel";
import AlertMessage from "./components/common/AlertMessage";
import SummaryGrid from "./components/summary/SummaryGrid";
import TransactionList from "./components/transactions/TransactionList";
import FinanceModal from "./components/modal/FinanceModal";
import ConfirmModal from "./components/modal/ConfirmModal";
import MonthlySummaryTable from "./components/monthly/MonthlySummaryTable";
import SelectedMonthDetails from "./components/monthly/SelectedMonthDetails";
import { useFinanceManager } from "./hooks/useFinanceManager";
import { useToast } from "./hooks/useToast";

import OptionModal from "./components/modal/OptionModal";
import { useTransactionOptions } from "./hooks/useTransactionOptions";

function App() {
  const {
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
  } = useFinanceManager();

  const { alert, setAlert } = useToast();

  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);

  const currentMonthKey = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  }, []);

  const currentMonthData = useMemo(() => {
    return (
      monthlyData.find((item) => item.monthKey === currentMonthKey) || null
    );
  }, [monthlyData, currentMonthKey]);

  const currentMonthTransactions = currentMonthData?.transactions || [];
  const currentMonthLabel = currentMonthData?.monthLabel || "Bu Ay";

  const currentMonthTotals = useMemo(() => {
    return {
      totalIncome: currentMonthData?.income || 0,
      totalExpense: currentMonthData?.expense || 0,
      totalInvestment: currentMonthData?.investment || 0,
      balance: totals.balance,

      totalCount: currentMonthData?.transactions?.length || 0,
    };
  }, [currentMonthData, totals.balance]);

  const handleAddTransaction = (payload) => {
    addTransaction(payload);

    const messageMap = {
      income: "Gelir kaydı başarıyla eklendi.",
      expense: "Gider kaydı başarıyla eklendi.",
      investment: "Yatırım kaydı başarıyla eklendi.",
    };

    setAlert({
      type: "success",
      message: messageMap[payload.type],
    });
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setEditModalOpen(true);
  };

  const handleUpdateTransaction = (payload) => {
    updateTransaction(payload);
    setEditModalOpen(false);

    setAlert({
      type: "success",
      message: "Kayıt başarıyla güncellendi.",
    });
  };

  const handleAskDelete = (transaction) => {
    setSelectedTransaction(transaction);
    setDeleteModalOpen(true);
  };

  const handleDeleteTransaction = () => {
    if (!selectedTransaction) return;

    deleteTransaction(selectedTransaction.id);
    setSelectedTransaction(null);
    setDeleteModalOpen(false);

    setAlert({
      type: "success",
      message: "Kayıt silindi.",
    });
  };

  const handleClearAll = () => {
    clearTransactions();
    setClearModalOpen(false);

    setAlert({
      type: "success",
      message: "Tüm kayıtlar temizlendi.",
    });
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingTransaction(null);
  };

  const { options, addOption, deleteOption, importOptions } =
    useTransactionOptions();

  const handleImportBackup = (backupData) => {
    const transactionResult = importTransactions(backupData);

    if (!transactionResult.valid) {
      return transactionResult;
    }

    if (backupData.options) {
      importOptions(backupData.options);
    }

    return {
      valid: true,
      message: "Yedek başarıyla geri yüklendi.",
    };
  };

  const handleDeleteOption = (type, value) => {
    const result = deleteOption(type, value);

    setAlert({
      type: result.success ? "success" : "error",
      message: result.message,
    });
  };

  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [optionModalType, setOptionModalType] = useState("income");

  const handleOpenOptionModal = (type) => {
    setOptionModalType(type);
    setOptionModalOpen(true);
  };

  const handleAddOption = (type, value) => {
    const result = addOption(type, value);

    setAlert({
      type: result.success ? "success" : "error",
      message: result.message,
    });

    return result;
  };

  return (
    <AppShell>
      <Topbar
        onOpenIncomeModal={() => setIncomeModalOpen(true)}
        onOpenExpenseModal={() => setExpenseModalOpen(true)}
        onOpenInvestmentModal={() => setInvestmentModalOpen(true)}
      />

      <AlertMessage alert={alert} />

      <BackupPanel
        transactions={transactions}
        options={options}
        onImport={handleImportBackup}
        onAskClearAll={() => setClearModalOpen(true)}
        setAlert={setAlert}
      />

      <SummaryGrid totals={currentMonthTotals} />

      <div className="mb-6">
        <div className="glass-card p-4 sm:p-5 lg:p-6">
          <TransactionList
            transactions={currentMonthTransactions}
            onDelete={handleAskDelete}
            onEdit={handleEditClick}
            monthLabel={currentMonthLabel}
          />
        </div>
      </div>

      <div className="mb-6">
        <MonthlySummaryTable
          monthlyData={monthlyData}
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
        />
      </div>

      <div className="mb-6">
        <SelectedMonthDetails selectedMonthData={selectedMonthData} />
      </div>

      <FinanceModal
        key={`income-create-${incomeModalOpen}`}
        isOpen={incomeModalOpen}
        onClose={() => setIncomeModalOpen(false)}
        onSubmit={handleAddTransaction}
        type="income"
        mode="create"
        options={options}
        onOpenOptionModal={handleOpenOptionModal}
      />

      <FinanceModal
        key={`expense-create-${expenseModalOpen}`}
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        onSubmit={handleAddTransaction}
        type="expense"
        mode="create"
        options={options}
        onOpenOptionModal={handleOpenOptionModal}
      />

      <FinanceModal
        key={`investment-create-${investmentModalOpen}`}
        isOpen={investmentModalOpen}
        onClose={() => setInvestmentModalOpen(false)}
        onSubmit={handleAddTransaction}
        type="investment"
        mode="create"
        options={options}
        onOpenOptionModal={handleOpenOptionModal}
      />

      <FinanceModal
        key={`edit-${editingTransaction?.id || "empty"}-${editModalOpen}`}
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateTransaction}
        type={editingTransaction?.type || "income"}
        mode="edit"
        initialData={editingTransaction}
        options={options}
        onOpenOptionModal={handleOpenOptionModal}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteTransaction}
        title="Bu kayıt silinsin mi?"
        description="Seçilen işlem kalıcı olarak silinecek."
      />

      <ConfirmModal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        onConfirm={handleClearAll}
        title="Tüm kayıtlar temizlensin mi?"
        description="Bu işlem tüm gelir, gider ve yatırım kayıtlarını siler. Önce yedek alman önerilir."
      />

      <OptionModal
        isOpen={optionModalOpen}
        onClose={() => setOptionModalOpen(false)}
        type={optionModalType}
        options={options[optionModalType] || []}
        onSubmit={handleAddOption}
        onDelete={handleDeleteOption}
      />
    </AppShell>
  );
}

export default App;
