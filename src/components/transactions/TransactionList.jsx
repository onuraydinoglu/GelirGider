import EmptyState from "./EmptyState";
import TransactionCard from "./TransactionCard";
import TransactionTable from "./TransactionTable";
import Pagination from "../common/Pagination";
import { usePagination } from "../../hooks/usePagination";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    goPrevious,
    goNext,
  } = usePagination({
    items: transactions,
    mobilePageSize: 5,
    desktopPageSize: 10,
  });

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

      <div className="hidden lg:block">
        <TransactionTable
          transactions={paginatedItems}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {paginatedItems.map((item) => (
          <TransactionCard
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPrevious={goPrevious}
        onNext={goNext}
      />
    </>
  );
};

export default TransactionList;