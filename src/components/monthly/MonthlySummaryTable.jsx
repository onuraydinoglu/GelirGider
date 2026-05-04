import { formatCurrency } from "../../utils/formatCurrency";

const MonthlySummaryTable = ({ monthlyData, selectedMonth, onSelectMonth }) => {
  if (!monthlyData.length) return null;

  return (
    <div className="glass-card mb-4 overflow-hidden p-3 sm:mb-6 sm:p-6">
      <div className="mb-3 sm:mb-5">
        <h2 className="text-lg font-bold text-white sm:text-2xl">
          Aylık Özet
        </h2>

        <p className="mt-1 text-xs text-slate-400 sm:mt-2 sm:text-sm">
          Bir aya tıklayarak o aya ait tüm işlemleri ve toplam durumu
          görebilirsin.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs dark-table sm:table-md">
          <thead>
            <tr>
              <th>Ay</th>
              <th>Gelir</th>
              <th>Gider</th>
              <th>Yatırım</th>
              <th>Kalan</th>
              <th>İşlem Sayısı</th>
              <th>Detay</th>
            </tr>
          </thead>

          <tbody>
            {monthlyData.map((month) => {
              const isActive = selectedMonth === month.monthKey;

              return (
                <tr
                  key={month.monthKey}
                  className={`cursor-pointer text-xs transition sm:text-sm ${isActive ? "bg-white/[0.04]" : ""
                    }`}
                  onClick={() => onSelectMonth(month.monthKey)}
                >
                  <td className="whitespace-nowrap font-semibold capitalize text-white">
                    {month.monthLabel}
                  </td>

                  <td className="whitespace-nowrap font-semibold text-emerald-400">
                    + {formatCurrency(month.income)}
                  </td>

                  <td className="whitespace-nowrap font-semibold text-rose-400">
                    - {formatCurrency(month.expense)}
                  </td>

                  <td className="whitespace-nowrap font-semibold text-amber-300">
                    - {formatCurrency(month.investment)}
                  </td>

                  <td
                    className={`whitespace-nowrap font-bold ${month.balance >= 0 ? "text-violet-300" : "text-rose-400"
                      }`}
                  >
                    {formatCurrency(month.balance)}
                  </td>

                  <td className="text-slate-300">
                    {month.transactions.length}
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`rounded-lg px-2 py-1 text-[11px] font-semibold sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs ${isActive
                        ? "bg-violet-500 text-white"
                        : "bg-white/5 text-slate-300"
                        }`}
                    >
                      {isActive ? "Seçili" : "Görüntüle"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlySummaryTable;