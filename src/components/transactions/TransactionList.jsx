import EmptyState from "./EmptyState";
import TransactionCard from "./TransactionCard";
import TransactionTable from "./TransactionTable";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  if (!transactions.length) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            İşlem Geçmişi
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Tüm gelir ve gider kayıtların burada listelenir.
          </p>
        </div>
      </div>

      <TransactionTable
        transactions={transactions}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {transactions.map((item) => (
          <TransactionCard
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </>
  );
};

export default TransactionList;