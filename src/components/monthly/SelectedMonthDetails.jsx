import Pagination from "../common/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const SelectedMonthDetails = ({ selectedMonthData }) => {
  const transactions = selectedMonthData?.transactions || [];

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

  if (!selectedMonthData) return null;

  const getTypeStyles = (type) => {
    if (type === "income") return "bg-emerald-500/15 text-emerald-300";
    if (type === "expense") return "bg-rose-500/15 text-rose-300";
    return "bg-amber-500/15 text-amber-300";
  };

  const getTypeLabel = (type) => {
    if (type === "income") return "Gelir";
    if (type === "expense") return "Gider";
    return "Yatırım";
  };

  const getAmountStyles = (type) => {
    if (type === "income") return "text-emerald-400";
    if (type === "expense") return "text-rose-400";
    return "text-amber-300";
  };

  const getAmountPrefix = (type) => {
    return type === "income" ? "+" : "-";
  };

  return (
    <div className="glass-card overflow-hidden p-3 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold capitalize text-white sm:text-3xl">
            {selectedMonthData.monthLabel}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-xs text-slate-400">Aylık Gelir</p>
            <p className="mt-1 text-sm font-bold text-emerald-400 sm:text-lg">
              + {formatCurrency(selectedMonthData.income)}
            </p>
          </div>

          <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-xs text-slate-400">Aylık Gider</p>
            <p className="mt-1 text-sm font-bold text-rose-400 sm:text-lg">
              - {formatCurrency(selectedMonthData.expense)}
            </p>
          </div>

          <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-xs text-slate-400">Yatırım</p>
            <p className="mt-1 text-sm font-bold text-amber-300 sm:text-lg">
              - {formatCurrency(selectedMonthData.investment)}
            </p>
          </div>

          <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-xs text-slate-400">Kalan Para</p>
            <p className="mt-1 text-sm font-bold text-violet-300 sm:text-lg">
              {formatCurrency(selectedMonthData.balance)}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs dark-table sm:table-md">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Başlık</th>
              <th>Tür</th>
              <th>Not</th>
              <th className="text-right">Tutar</th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((item) => {
              const isInstallmentExpense =
                item.type === "expense" && Number(item.installmentCount) > 1;

              return (
                <tr key={item.id}>
                  <td className="text-slate-300">{formatDate(item.date)}</td>

                  <td className="font-semibold text-white">{item.title}</td>

                  <td>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeStyles(
                          item.type,
                        )}`}
                      >
                        {getTypeLabel(item.type)}
                      </span>

                      {isInstallmentExpense && (
                        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-300">
                          {item.installmentIndex}/{item.installmentCount} Taksit
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="max-w-[320px] truncate text-slate-400">
                    {item.note || "-"}
                  </td>

                  <td
                    className={`text-right font-bold ${getAmountStyles(
                      item.type,
                    )}`}
                  >
                    {getAmountPrefix(item.type)} {formatCurrency(item.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPrevious={goPrevious}
        onNext={goNext}
      />
    </div>
  );
};

export default SelectedMonthDetails;