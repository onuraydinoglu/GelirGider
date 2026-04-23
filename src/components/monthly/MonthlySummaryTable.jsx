import { formatCurrency } from "../../utils/formatCurrency";

const MonthlySummaryTable = ({ monthlyData, selectedMonth, onSelectMonth }) => {
  if (!monthlyData.length) return null;

  return (
    <div className="glass-card mb-6 overflow-hidden p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">Aylık Özet</h2>
        <p className="mt-2 text-sm text-slate-400">
          Bir aya tıklayarak o aya ait tüm işlemleri ve toplam durumu görebilirsin.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table dark-table">
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
                  className={`cursor-pointer transition ${isActive ? "bg-white/[0.04]" : ""
                    }`}
                  onClick={() => onSelectMonth(month.monthKey)}
                >
                  <td className="font-semibold capitalize text-white">
                    {month.monthLabel}
                  </td>

                  <td className="font-semibold text-emerald-400">
                    + {formatCurrency(month.income)}
                  </td>

                  <td className="font-semibold text-rose-400">
                    - {formatCurrency(month.expense)}
                  </td>

                  <td className="font-semibold text-amber-300">
                    - {formatCurrency(month.investment)}
                  </td>

                  <td
                    className={`font-bold ${month.balance >= 0 ? "text-violet-300" : "text-rose-400"
                      }`}
                  >
                    {formatCurrency(month.balance)}
                  </td>

                  <td className="text-slate-300">{month.transactions.length}</td>

                  <td>
                    <button
                      type="button"
                      className={`rounded-xl px-3 py-2 text-xs font-semibold ${isActive
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