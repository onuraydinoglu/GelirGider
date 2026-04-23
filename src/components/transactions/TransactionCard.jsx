import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const TransactionCard = ({ item, onDelete, onEdit }) => {
  const isIncome = item.type === "income";

  return (
    <div className="glass-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isIncome
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-rose-500/15 text-rose-300"
              }`}
          >
            {isIncome ? (
              <HiOutlineArrowTrendingUp className="text-xl" />
            ) : (
              <HiOutlineArrowTrendingDown className="text-xl" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-white sm:text-lg">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{formatDate(item.date)}</p>

            {item.note && (
              <p className="mt-2 text-sm text-slate-300">{item.note}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="btn btn-sm rounded-xl border-0 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25"
          >
            <HiOutlinePencilSquare className="text-lg" />
          </button>

          <button
            onClick={() => onDelete(item)}
            className="btn btn-sm rounded-xl border-0 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25"
          >
            <HiOutlineTrash className="text-lg" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${isIncome
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-rose-500/15 text-rose-300"
            }`}
        >
          {isIncome ? "Gelir" : "Gider"}
        </span>

        <span
          className={`text-lg font-bold ${isIncome ? "text-emerald-400" : "text-rose-400"
            }`}
        >
          {isIncome ? "+" : "-"} {formatCurrency(item.amount)}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;