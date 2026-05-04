import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { PiBankFill } from "react-icons/pi";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const TransactionCard = ({ item, onDelete, onEdit }) => {
  const getTypeConfig = (type) => {
    if (type === "income") {
      return {
        icon: <HiOutlineArrowTrendingUp className="text-xl" />,
        wrapper: "bg-emerald-500/15 text-emerald-300",
        badge: "bg-emerald-500/15 text-emerald-300",
        amount: "text-emerald-400",
        label: "Gelir",
        prefix: "+",
      };
    }

    if (type === "expense") {
      return {
        icon: <HiOutlineArrowTrendingDown className="text-xl" />,
        wrapper: "bg-rose-500/15 text-rose-300",
        badge: "bg-rose-500/15 text-rose-300",
        amount: "text-rose-400",
        label: "Gider",
        prefix: "-",
      };
    }

    return {
      icon: <PiBankFill className="text-xl" />,
      wrapper: "bg-amber-500/15 text-amber-300",
      badge: "bg-amber-500/15 text-amber-300",
      amount: "text-amber-300",
      label: "Yatırım",
      prefix: "-",
    };
  };

  const config = getTypeConfig(item.type);

  return (
    <div className="glass-card p-3 sm:p-5">
      <div className="flex items-start justify-between gap-2">

        {/* SOL */}
        <div className="flex min-w-0 items-start gap-2 sm:gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl ${config.wrapper}`}
          >
            {config.icon}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white sm:text-lg">
              {item.title}
            </h3>

            <p className="mt-0.5 text-[11px] text-slate-400 sm:mt-1 sm:text-sm">
              {formatDate(item.date)}
            </p>

            {item.note && (
              <p className="mt-1 line-clamp-1 text-xs text-slate-300 sm:mt-2 sm:text-sm">
                {item.note}
              </p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex shrink-0 gap-1 sm:gap-2">
          <button
            onClick={() => onEdit(item)}
            className="btn btn-xs rounded-lg border-0 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 sm:btn-sm sm:rounded-xl"
          >
            <HiOutlinePencilSquare className="text-sm sm:text-lg" />
          </button>

          <button
            onClick={() => onDelete(item)}
            className="btn btn-xs rounded-lg border-0 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 sm:btn-sm sm:rounded-xl"
          >
            <HiOutlineTrash className="text-sm sm:text-lg" />
          </button>
        </div>
      </div>

      {/* ALT */}
      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 sm:mt-4 sm:pt-4">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:px-3 sm:py-1 sm:text-xs ${config.badge}`}>
          {config.label}
        </span>

        <span className={`text-sm font-bold sm:text-lg ${config.amount}`}>
          {config.prefix} {formatCurrency(item.amount)}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;