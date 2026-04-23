import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const TransactionTable = ({ transactions, onDelete, onEdit }) => {
  const getTypeStyles = (type) => {
    if (type === "income") {
      return "bg-emerald-500/15 text-emerald-300";
    }

    if (type === "expense") {
      return "bg-rose-500/15 text-rose-300";
    }

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
    <div className="glass-card hidden overflow-hidden lg:block">
      <div className="overflow-x-auto">
        <table className="table dark-table">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Tür</th>
              <th>Tarih</th>
              <th>Not</th>
              <th className="text-right">Tutar</th>
              <th className="text-right">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
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

                <td className="text-slate-300">{formatDate(item.date)}</td>
                <td className="max-w-[280px] truncate text-slate-400">
                  {item.note || "-"}
                </td>

                <td
                  className={`text-right text-lg font-bold ${getAmountStyles(
                    item.type
                  )}`}
                >
                  {getAmountPrefix(item.type)} {formatCurrency(item.amount)}
                </td>

                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="btn btn-sm rounded-xl border-0 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25"
                    >
                      <HiOutlinePencilSquare />
                    </button>

                    <button
                      onClick={() => onDelete(item)}
                      className="btn btn-sm rounded-xl border-0 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;