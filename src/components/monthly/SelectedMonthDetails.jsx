import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const SelectedMonthDetails = ({ selectedMonthData }) => {
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
    <div className="glass-card overflow-hidden p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold capitalize text-white">
            {selectedMonthData.monthLabel}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="min-w-[150px] rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
            <p className="text-xs text-slate-400">Aylık Gelir</p>
            <p className="mt-1 text-lg font-bold text-emerald-400">
              + {formatCurrency(selectedMonthData.income)}
            </p>
          </div>

          <div className="min-w-[150px] rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
            <p className="text-xs text-slate-400">Aylık Gider</p>
            <p className="mt-1 text-lg font-bold text-rose-400">
              - {formatCurrency(selectedMonthData.expense)}
            </p>
          </div>

          <div className="min-w-[150px] rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
            <p className="text-xs text-slate-400">Yatırım</p>
            <p className="mt-1 text-lg font-bold text-amber-300">
              - {formatCurrency(selectedMonthData.investment)}
            </p>
          </div>

          <div className="min-w-[150px] rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-3">
            <p className="text-xs text-slate-400">Kalan Para</p>
            <p className="mt-1 text-lg font-bold text-violet-300">
              {formatCurrency(selectedMonthData.balance)}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table dark-table">
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
            {selectedMonthData.transactions.map((item) => (
              <tr key={item.id}>
                <td className="text-slate-300">{formatDate(item.date)}</td>

                <td className="font-semibold text-white">{item.title}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeStyles(
                      item.type
                    )}`}
                  >
                    {getTypeLabel(item.type)}
                  </span>
                </td>

                <td className="max-w-[320px] truncate text-slate-400">
                  {item.note || "-"}
                </td>

                <td
                  className={`text-right font-bold ${getAmountStyles(item.type)}`}
                >
                  {getAmountPrefix(item.type)} {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedMonthDetails;